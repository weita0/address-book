"use server";
import fs from "fs/promises";
import path from 'path';

export async function injectAction() {
  const content = await fs.readFile(path.resolve(__dirname, "./inject.html"), 'utf-8');
  return { content };
}
