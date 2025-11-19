import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "days.json");

export function readDB() {
  const raw = fs.readFileSync(DB_PATH, "utf8");
  return JSON.parse(raw);
}

export function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
