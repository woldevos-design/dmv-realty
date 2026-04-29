import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export function readJSON<T>(file: string): T {
  const filePath = path.join(dataDir, file);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export function writeJSON(file: string, data: unknown): void {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
