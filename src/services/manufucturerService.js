import http from "./httpService";

const apiEndPoint = "/manufucturers";

export function getManufucturerSelector() {
  return http.get(apiEndPoint + "/selector/");
}

export function getManufucturers() {
  return http.get(apiEndPoint);
}

export function getManufucturer(id) {
  return http.get(`${apiEndPoint}/${id}`);
}

export function createManufucturer(data) {
  return http.post(apiEndPoint, data);
}

export function saveManufucturer(data, id) {
  return http.put(`${apiEndPoint}/${id}`, data);
}

export function deleteManufucturer(id) {
  return http.delete(`${apiEndPoint}/${id}`);
}

export default {
  getManufucturerSelector,
  getManufucturers,
  getManufucturer,
  createManufucturer,
  saveManufucturer,
  deleteManufucturer,
};
