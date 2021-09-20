import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// =
const { readJSON, writeJSON, writeFile } = fs;
// path Posts
const reviewsFolder = join(
  dirname(fileURLToPath(import.meta.url)),
  "./reviews"
);
export const reviewsJson = join(reviewsFolder, "reviewsLib.json");
// Posts
export const getReviews = () => readJSON(reviewsJson);
export const writeReviews = (content) => writeJSON(reviewsJson, content);
