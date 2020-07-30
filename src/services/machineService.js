import http from "./httpService";

const apiEndPoint = "/machines";

export function getMachines() {
  return http.get(apiEndPoint);
}

export function getMachine(id) {
  return http.get(`${apiEndPoint}/${id}`);
}

export function createMachine(data) {
  let imageArray = [];
  data.images.forEach((image) => imageArray.push(image.response));

  const newData = {
    title: data.title,
    description: data.description,
    manufucturer: data.manufucturer,
    minimumQuantity: data.minimumQuantity,
    options: data.options,
    category: data.category,
    link: data.link,
    images: imageArray,
  };
  console.log(newData);
  return http.post(apiEndPoint, newData);
}

export function saveMachine(data, id) {
  return http.put(`${apiEndPoint}/${id}`, data);
}

export function deleteMachine(id) {
  return http.delete(`${apiEndPoint}/${id}`);
}

export default {
  getMachines,
  getMachine,
  createMachine,
  saveMachine,
  deleteMachine,
};
