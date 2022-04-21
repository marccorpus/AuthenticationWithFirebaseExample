import axios from "axios";

const url = "https://identitytoolkit.googleapis.com/v1/accounts";

const key = "AIzaSyDzG40Fs2L7BVBwDhHlKx_Wml2FhUsaD2M";

const authenticate = async (mode, { email, password }) => {
  const response = await axios.post(`${url}:${mode}?key=${key}`, {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data.idToken;
};

export const login = async ({ email, password }) => {
  const token = await authenticate("signInWithPassword", { email, password });

  return token;
};

export const signup = async ({ email, password }) => {
  const token = await authenticate("signUp", { email, password });

  return token;
};
