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
// post image
export const publicPath = join(process.cwd(), "/public/img/covers");
export const coverPath = "http://localhost:3003/img/covers/";
export const saveCoverFile = (name, content) => {
  writeFile(join(publicPath, name), content);
};

// Name changer
export const imgName = (name, id) => {
  let type = name.split(".").reverse()[0];
  let thisName = `${id}.${type}`;
  return thisName;
};
