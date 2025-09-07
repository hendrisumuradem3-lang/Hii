import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Tidak ada file." }, { status: 400 });
    }

    // Validate size (<= 5MB) and type (image/*)
    const max = 5 * 1024 * 1024;
    if (file.size <= 0) {
      return NextResponse.json({ ok: false, error: "File kosong." }, { status: 400 });
    }
    if (file.size > max) {
      return NextResponse.json({ ok: false, error: "Ukuran maksimal 5MB." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ ok: false, error: "File harus gambar." }, { status: 400 });
    }

    const extGuess = file.name.split(".").pop() || "jpg";
    const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
    const rand = Math.random().toString(16).slice(2, 8);
    const pathname = `uploads/${stamp}_${rand}.${extGuess}`;

    // Upload to Vercel Blob as public
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const { url } = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
      token,
    });

    return NextResponse.json({ ok: true, url, name: pathname });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Upload gagal." }, { status: 500 });
  }
}
