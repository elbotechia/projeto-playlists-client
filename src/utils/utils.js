
export const getToken = (token, setToken) => {
  const tokenStorage = localStorage.getItem("api_token");
  if (
      tokenStorage === "null" ||
      tokenStorage === "undefined" ||
      tokenStorage === null ||
      tokenStorage === undefined ||
      tokenStorage === "undefined" ||
      tokenStorage === "null" ||
      tokenStorage === "" ||
      tokenStorage === " " ||
      tokenStorage === "  "
  ) {
    localStorage.setItem("api_token", null);
    setToken(null);
  } else {
    setToken(tokenStorage);
  }
};
