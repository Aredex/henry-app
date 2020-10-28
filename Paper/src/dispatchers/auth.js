import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { authSetError, login, logout } from "../actions/auth";

import { REACT_APP_API_REMOTE, ANDROID_OAUTH_CLIENT } from "@env";
import { finishLoading, startLoading } from "../actions/ui";
import * as Google from "expo-google-app-auth";

const config = {
  androidClientId: ANDROID_OAUTH_CLIENT,
  scopes: ["profile", "email"],
};

export const GoogleInitialize = () => {
  return async (dispatch) => {
    try {
      const { type, user } = await Google.logInAsync(config);

      if (type === "success") {
        const { data } = await Axios.post(
          `${REACT_APP_API_REMOTE}/auth/mobile/google`,
          {
            user,
          }
        );

        const { user, token } = data;
        await AsyncStorage.setItem("token", token);
        dispatch(login(user.id, user, token));
        dispatch(finishLoading());
      }

      console.log("user", user);
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    dispatch(logout());
    await AsyncStorage.removeItem("token");
    dispatch(finishLoading());
  };
};

export const initialize = (localUser) => {
  Axios.defaults.baseURL = REACT_APP_API_REMOTE;

  if (localUser && localUser.token) {
    Axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localUser.token}`;
  } else {
    Axios.defaults.headers.common["Authorization"] = ``;
  }
};

export const signInWithEmail = (username, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await Axios.post(`${REACT_APP_API_REMOTE}/auth/email`, {
        username,
        password,
      });

      if (data) {
        const { user, token } = data;
        await AsyncStorage.setItem("token", token);
        dispatch(login(user.id, user, token));
        dispatch(finishLoading());
      }
    } catch ({ response }) {
      dispatch(signOut());
      dispatch(authSetError(response.data.message));
      dispatch(finishLoading());
    }
  };
};

export const signInWithToken = (token) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await Axios.get(`${REACT_APP_API_REMOTE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        await AsyncStorage.setItem("token", token);
        dispatch(login(data.id, data, token));
        dispatch(finishLoading());
      }
    } catch ({ response }) {
      dispatch(signOut());
      dispatch(authSetError(response.data.message));
      dispatch(finishLoading());
    }
  };
};

export const signInWithGoogle = () => {
  if (window) {
    window.location = `${REACT_APP_API_REMOTE}/auth/google`;
  }
};

export const signInWithGithub = () => {
  if (window) {
    window.location = `${REACT_APP_API_REMOTE}/auth/github`;
  }
};