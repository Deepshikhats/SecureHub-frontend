export const getStorageItem = (key: string): string => {
  return localStorage.getItem(key) ?? "";
};
export const setStorageItem = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};
