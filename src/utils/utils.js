
export const getToken = (token, setToken) => {
  const tokenStorage = localStorage.getItem("api_token");
  if (tokenStorage=== ""||!tokenStorage|| tokenStorage === null|| tokenStorage=== "null" || tokenStorage === undefined
  ) {
    localStorage.setItem("api_token", null);
    setToken(null);
  } else {
    setToken(tokenStorage);
  }
};
