import axios from "axios";

export const signIn = async (email, password) => {
  return await axios.post(
    `${import.meta.env.VITE_LOGIN_URL}${import.meta.env.VITE_API_KEY}`,
    { email: email, password: password, returnSecureToken: true }
  );
};

export const signUp = async (email, password) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SIGNUP_URL}${import.meta.env.VITE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
  console.log(email);
  console.log(password);
};

export const logIn = async () => {};
