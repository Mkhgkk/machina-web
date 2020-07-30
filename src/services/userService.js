import http from "./httpService";

const apiEndPoint = "/users";

export function register(user) {
  const data = {
    email: user.email,
    password: user.password,
    name: user.name,
  };
  return http.post(apiEndPoint, data);
}

export function getUserDetail() {
  return http.get(apiEndPoint + "/me");
}

export default { register, getUserDetail };
