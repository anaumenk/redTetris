import { localStorageKeys, localStorageService } from "../store";
import { configAxios } from "../axios";
import { API, METHODS } from "../constants";

export const auth = {
  isAuthenticated: !!localStorageService.readItem(localStorageKeys.TOKEN),
  async checkToken() {
    const token = localStorageService.readItem(localStorageKeys.TOKEN);
    const response = await configAxios(METHODS.POST, API.CHECK_TOKEN, { token });
    auth.isAuthenticated = response.data.player;
  },
  authenticate(token) {
    localStorageService.createOrUpdateItem(localStorageKeys.TOKEN, token);
    auth.isAuthenticated = !!token;
  },
  signout() {
    localStorageService.deleteItem(localStorageKeys.TOKEN);
    auth.isAuthenticated = false;
  }
};
