import fs from "fs-extra";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const productsJSONPath = join(dataFolderPath, "products.json");
export const getProducts = () => readJSON(productsJSONPath);
export const writeProducts = (content) => writeJSON(productsJSONPath, content);

export const publicPathFolder = join(process.cwd(), "./public");

