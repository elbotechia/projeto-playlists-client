export const handle2Home = (navigate)=>{
    navigate('/');
}

export const handle2Users = (navigate) => {
  const token = localStorage.getItem("api_key");

  if (token && token.length < 10) {
    navigate("/users");
  } else {
    navigate("/manager");
  }
};

export const handle2Tracks = (navigate) => {
  navigate("/tracks");
}

export const handle2Track = (navigate, id) => {
  navigate(`/tracks/${id}`);
}

export const handle2Manager = (navigate) => {
  navigate("/manager");
}

export const handle2Error = (navigate) => {
  navigate("*");
}
export const handle2Logout = (navigate) => {
  const token =localStorage.getItem("api_key");
  if (token && token.length > 10) {
    localStorage.removeItem("token");
    navigate("/");
  } else {
    console.error("No token found in localStorage.");
  }
}