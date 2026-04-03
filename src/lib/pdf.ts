import * as pdfjs from "pdf-parse";
import fs from "fs/promises";

export async function extractText(filePath: string): Promise<string> {
  const dataBuffer = await fs.readFile(filePath);
  const data = await (pdfjs as any)(dataBuffer);
  return data.text;
}
