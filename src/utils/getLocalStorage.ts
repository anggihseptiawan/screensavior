import { STORAGE_KEY } from "../constants/storage"
import { LocalStorage } from "../types/all"

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as LocalStorage | null
}

export const isBottomWidgetRemoved = () => {
  const storage = getLocalStorage()
  return storage?.holiday && storage.prayTime
}
