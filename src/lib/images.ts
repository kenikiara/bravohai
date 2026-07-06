"use client";

export interface PreparedImage {
  data: string; // base64 without data: prefix
  mediaType: string;
  previewUrl: string;
  name: string;
}

const MAX_DIMENSION = 1568; // Claude vision sweet spot; larger wastes tokens

export async function prepareImage(file: File): Promise<PreparedImage> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
  return {
    data: dataUrl.slice(dataUrl.indexOf(",") + 1),
    mediaType: "image/jpeg",
    previewUrl: dataUrl,
    name: file.name || "pasted-image",
  };
}

export async function makeThumbnail(previewUrl: string, width = 220): Promise<string> {
  const img = new Image();
  img.src = previewUrl;
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = rej;
  });
  const scale = width / img.width;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.6);
}
