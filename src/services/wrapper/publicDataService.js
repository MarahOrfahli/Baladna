import { getData, ENDPOINTS } from "../../api";

// GET /areas
export const getAreas = async (params = {}) => {
  const res = await getData(ENDPOINTS.areas.list(params));
  // const res = await getDataByParams( ENDPOINTS.areas.list() , { params } ) // api.get("/areas", { params });
  return res.data;
};

// GET /areas/{area}
export const getArea = async (areaId) => {
  const res = await getData(ENDPOINTS.areas.details(areaId)); // api.get(`/areas/${areaId}`);
  return res.data;
};

// GET /agencies
export const getAgencies = async (params = {}) => {
  const res = await getData(ENDPOINTS.agencies.list(params)); // api.get("/agencies", { params });
  return res.data;
};

// GET /agencies/{agency}
export const getAgency = async (agencyId) => {
  const res = await getData(ENDPOINTS.agencies.details(agencyId)); // api.get(`/agencies/${agencyId}`);
  return res.data;
};

// GET /categories
export const getCategories = async (params = {}) => {
  const res = await getData(ENDPOINTS.categories.list(params)); // api.get("/categories", { params });
  return res.data;
};

// GET /categories/{category}
export const getCategory = async (categoryId) => {
  const res = await getData(ENDPOINTS.categories.details(categoryId)); // api.get(`/categories/${categoryId}`);
  return res.data;
};

// GET /website/latest-anonymous-reports
export const getLatestAnonymousReports = async () => {
  const res = await getData(ENDPOINTS.website.latestAnonymousReports()); // api.get("/website/latest-anonymous-reports");
  return res.data;
};

// GET /website/stats
export const getWebsiteStats = async () => {
  const res = await getData(ENDPOINTS.website.stats()); // api.get("/website/stats");
  return res.data;
};
