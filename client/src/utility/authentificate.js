import { localStorageKeys, localStorageService } from "../store";
import { configAxios } from "../axios";
import { METHODS, API } from "../constants";

const auth = {
  isAuthenticated: false,
  async checkToken() {
    const token = localStorageService.readItem(localStorageKeys.TOKEN);
    await configAxios(METHODS.POST, API.CHECK_TOKEN, { token }).then((res) => {
      auth.isAuthenticated = !!res.data.data;
    })
    return true
  },
  authenticate(token) {
    localStorageService.createOrUpdateItem(localStorageKeys.TOKEN, token);
    auth.isAuthenticated = !!token;
  },
  logout() {
    window.location.reload();
    localStorageService.clear();
    auth.isAuthenticated = false;
  }
};

export default auth;
