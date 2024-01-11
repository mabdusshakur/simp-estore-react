let token = localStorage.getItem("token");
let user = JSON.parse(localStorage.getItem("user"));

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem("token", newToken);
};

export const getToken = () => {
  return token;
};

export const setUser = (newUser) => {
  user = newUser;
  localStorage.setItem("user", JSON.stringify(newUser));
};

export const getUser = () => {
  return user;
};

export const isLoggedIn = () => {
  if (token && user) {
    return true;
  }
  return false;
};

export const isAdmin = () => {
  const user = getUser();
  return user.is_admin;
};