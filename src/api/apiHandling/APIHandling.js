import { api } from "../client/axiosClients";

export const getData = async (endpointAPI) => {
  const response = await api.get(endpointAPI);
  return response;
};

export const postData = async (endpointAPI, data) => {
  const response = await api.post(endpointAPI, data);
  return response;
};

export const postWithoutData = async (endpointAPI) => {
  const response = await api.post(endpointAPI);
  return response;
};

export const patchData = async (endpointAPI, data) => {
  const response = await api.patch(endpointAPI, data);
  return response;
};

export const patchWithoutData = async (endpointAPI) => {
  const response = await api.patch(endpointAPI);
  return response;
};

export const deleteData = async (endpointAPI) => {
  const response = await api.delete(endpointAPI);
  return response;
};


export const deleteDataByID = async (endpointAPI, id) => {
  const response = await api.delete(endpointAPI(id));
  return response;
};

export const getDataById = async (endpointAPI, id) => {
  const response = await api.get(endpointAPI(id));
  return response;
};

