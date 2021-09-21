import fs from "fs-extra"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const productsJSONPath = join(dataFolderPath, "products.json")

const photoFolderPath = join(process.cwd(), "/public/img")

export const savePhoto = (name, contentAsBuffer) => writeFile(join(photoFolderPath, name), contentAsBuffer)
export const getProducts = () => readJSON(productsJSONPath)
export const writeProducts = content => writeJSON(productsJSONPath, content) 