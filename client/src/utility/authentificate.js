import { localStorageKeys, localStorageService } from "../store";
import { configAxios } from "../axios";
import { METHODS, API } from "../constants";

const checkToken = () => {
  const token = localStorageService.readItem(localStorageKeys.TOKEN);
  configAxios(METHODS.POST, API.CHECK_TOKEN, { token }).then((res) => {
    auth.isAuthenticated = res.data;
  })
};

const auth = {
  isAuthenticated: checkToken(),
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
