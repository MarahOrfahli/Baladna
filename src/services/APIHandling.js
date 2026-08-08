import api from "./api/axiosClients";

export const getData = async (endpointAPI) => {
  const response = await api.get(endpointAPI);
  return response.data;
};

export const getDataById = async (endpointAPI, id) => {
  const response = await api.get(endpointAPI(id));
  return response.data;
};

export const postData = async (endpointAPI, data) => {
  const response = await api.post(endpointAPI, data);
  return response.data;
};

export const putData = async (endpointAPI, data) => {
  const response = await api.put(endpointAPI, data);
  return response.data;
};

export const patchData = async (endpointAPI, data) => {
  const response = await api.patch(endpointAPI, data);
  return response.data;
};
export const deleteData = async (endpointAPI, id) => {
  const response = await api.delete(endpointAPI(id));
  return response.data;
};