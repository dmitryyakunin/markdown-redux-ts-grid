import http from "../http-common";

const getAll = () => {
  return http.get("blog/all-files")
    .then(function (response) { return response; })
    .catch(function (error) { console.log(error); return {data: null}; });
};

const getDirectories = (cur_dir) => {
  return http.get(`directory-list?cur_dir=${cur_dir}`)
    .then(function (response) { return response; })
    .catch(function (error) { console.log(error); return {data: null}; });
};

const getFile = (name) => {
  return http.get(`/${name}`)
    .then(function (response) { return response; })
    .catch(function (error) { console.log(error); return {data: null}; });
};

const getBriefly = (folderName, cur_dir) => {
  return http.get(`${folderName}/summary?cur_dir=${cur_dir}`)
    .then(function (response) { return response; })
    .catch(function (error) { console.log(error); return {data: null}; });
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