export const logout = (props) => {
  const setUser = props.setUser;
  const cookies = props.cookies;
  setUser("");
  cookies.remove("jwt_authorization");
};
