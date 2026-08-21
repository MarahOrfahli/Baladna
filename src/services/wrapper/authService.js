import { getData, postData, postWithoutData, patchData, ENDPOINTS } from "../../api";

// POST /auth/register
export const register = async (userData) => {
  const res = await postData(ENDPOINTS.auth.register(), userData)
  return res.data;
};

// POST /auth/login
export const login = async (credentials) => {
  const res = await postData(ENDPOINTS.auth.login(), credentials)
  return res.data;
};

// POST /auth/logout
export const logout = async () => {
  const res = await postWithoutData(ENDPOINTS.auth.logout())
  return res.data;
};

// GET /me
export const getMe = async () => {
  const res = await getData(ENDPOINTS.auth.me())
  return res.data;
};

// PATCH /me
export const updateMe = async (data) => {
  const res = await patchData(ENDPOINTS.auth.updateMe(), data)
  return res.data;
};