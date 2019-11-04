export const localStorageService = {
  createOrUpdateItem(key, value) {
    localStorage.setItem(key, value);
  },
  readItem(key) {
    return localStorage.getItem(key);
  },
  deleteItem(key) {
    localStorage.setItem(key, "");
  },
  clear() {
    localStorage.clear();
  },
};

export const localStorageKeys = {
  TOKEN: "token"
};
