import { ENDPOINTS, getData, postData } from "../../api";

// POST /user-areas
export const suggestArea = async (data) => {
  const res = await postData(ENDPOINTS.userAreas.suggest(), data); // api.post("/user-areas", data);
  return res.data;
};

// GET /user-areas
export const getUserAreas = async () => {
  const res = await getData(ENDPOINTS.userAreas.list()); // api.get("/user-areas");
  return res.data;
};
