import http from "../http-common";

const getAll = () => {
  //return http.get("/car-position");
  return http.get("/all-files");
};

const getFile = (name) => {
  return http.get(`/markdown/${name}`);
};


const get = id => {
  return http.get(`/tutorials/${id}`);
};

const DataService = {
  getAll,
  getFile,
  get,
};

export default DataService;