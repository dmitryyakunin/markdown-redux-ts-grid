import http from "../http-common";

const getAll = () => {
  return http.get("blog/all-files");
};

const getDirectories = () => {
  return http.get("directory-list");

  //return {data:['home/home_achievements','home/home_doc']};
};

const getFile = (name) => {
  return http.get(`/${name}`);
};

const getBriefly = (folderName) => {
  return http.get(`${folderName}/summary`);
};

const get = id => {
  return http.get(`/tutorials/${id}`);
};

const DataService = {
  getAll,
  getFile,
  getBriefly,
  get,
  getDirectories,
};

export default DataService;