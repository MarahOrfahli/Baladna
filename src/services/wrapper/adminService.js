import {
  ENDPOINTS,
  getData,
  postData,
  patchData,
  deleteData,
  patchWithoutData
} from "../../api";

// ============ Areas ============

// GET /admin/areas
export const adminGetAreas = async (params = {}) => {
  const res = await getData(ENDPOINTS.admin.areas.list(params)); // api.get("/admin/areas", { params });
  return res.data;
};

// POST /admin/areas
export const adminCreateArea = async (data) => {
  const res = await postData(ENDPOINTS.admin.areas.create(), data); // api.post("/admin/areas", data);
  return res;
};

// GET /admin/areas/{areaId}
export const adminGetArea = async (areaId) => {
  const res = await getData(ENDPOINTS.admin.areas.details(areaId)); // api.get(`/admin/areas/${areaId}`);
  return res.data;
};

// PATCH /admin/areas/${areaId}
export const adminUpdateArea = async (areaId, data) => {
  data.parent_id == null ? (data.parent_id = "") : "";
  const res = await patchData(ENDPOINTS.admin.areas.update(areaId), data); // api.patch(`/admin/areas/${areaId}`, data);
  return res;
};

// DELETE /admin/areas/${areaId}
export const adminDeleteArea = async (areaId) => {
  const res = await deleteData(ENDPOINTS.admin.areas.delete(areaId)); // api.delete(`/admin/areas/${areaId}`);
  return res;
};

// ============ Agencies ============
// GET /admin/agencies
export const adminGetAgencies = async (params = {}) => {
  const res = await getData(ENDPOINTS.admin.agencies.list(params)); // api.get("/admin/agencies", { params });
  return res.data;
};

// POST /admin/agencies
export const adminCreateAgency = async (data) => {
  const res = await postData(ENDPOINTS.admin.agencies.create(), data); // api.post("/admin/agencies", data);
  return res;
};

// GET /admin/agencies/{agencyId}
export const adminGetAgency = async (agencyId) => {
  const res = await getData(ENDPOINTS.admin.agencies.details(agencyId)); // api.get(`/admin/agencies/${agencyId}`);
  return res.data;
};

// PATCH /admin/agencies/{agencyId}
export const adminUpdateAgency = async (agencyId, data) => {
  const res = await patchData(ENDPOINTS.admin.agencies.update(agencyId), data); // api.patch(`/admin/agencies/${agencyId}`, data);
  return res;
};

// DELETE /admin/agencies/{agencyId}
export const adminDeleteAgency = async (agencyId) => {
  const res = await deleteData(ENDPOINTS.admin.agencies.delete(agencyId)); // api.delete(`/admin/agencies/${agencyId}`);
  return res;
};

// ============ Categories ============
// GET /admin/categories
export const adminGetCategories = async (params = {}) => {
  const res = await getData(ENDPOINTS.admin.categories.list(params)); // api.get("/admin/categories", { params });
  return res.data;
};

// POST /admin/categories
export const adminCreateCategory = async (data) => {
  const res = await postData(ENDPOINTS.admin.categories.create(), data); // api.post("/admin/categories", data);
  return res.data;
};

// GET /admin/categories/{categoryId}
export const adminGetCategory = async (categoryId) => {
  const res = await getData(ENDPOINTS.admin.categories.details(categoryId)); // api.get(`/admin/categories/${categoryId}`);
  return res.data;
};

// PATCH /admin/categories/{categoryId}
export const adminUpdateCategory = async (categoryId, data) => {
  const res = await patchData(
    ENDPOINTS.admin.categories.update(categoryId),
    data
  ); // api.patch(`/admin/categories/${categoryId}`, data);
  return res.data;
};

// DELETE /admin/categories/{categoryId}
export const adminDeleteCategory = async (categoryId) => {
  const res = await deleteData(ENDPOINTS.admin.categories.delete(categoryId)); // api.delete(`/admin/categories/${categoryId}`);
  return res.data;
};

// ============ Users ============
// GET /admin/users
export const adminGetUsers = async (params = {}) => {
  const res = await getData(ENDPOINTS.admin.users.list(params)); // api.get("/admin/users", { params });
  return res.data;
};

// POST /admin/users
export const adminCreateUser = async (data) => {
  const res = await postData(ENDPOINTS.admin.users.create(), data); // api.post("/admin/users", data);
  return res.data;
};

// GET /admin/users/{userId}
export const adminGetUser = async (userId) => {
  const res = await getData(ENDPOINTS.admin.users.details(userId)); // api.get(`/admin/users/${userId}`);
  return res.data;
};

// PATCH /admin/users/{userId}
export const adminUpdateUser = async (userId, data) => {
  const res = await patchData(ENDPOINTS.admin.users.update(userId), data); // api.patch(`/admin/users/${userId}`, data);
  return res.data;
};

// DELETE /admin/users/{userId}
export const adminDeleteUser = async (userId) => {
  const res = await deleteData(ENDPOINTS.admin.users.delete(userId)); // api.delete(`/admin/users/${userId}`);
  return res.data;
};

// ============ Assign employee ============
// PATCH  /admin/reports/{reportId}/assign
export const assignReportToEmployee = async (reportId, employeeId) => {
  const res = await patchData(ENDPOINTS.admin.reports.assign(reportId), {
    employee_id: employeeId
  }); // api.patch(`/admin/reports/${reportId}/assign`, { employee_id: employeeId });
  return res.data;
};

// ============ Area Suggestions ============
// GET /admin/area-suggestions
export const adminGetAreaSuggestions = async () => {
  const res = await getData(ENDPOINTS.admin.areaSuggestions.list()); // api.get("/admin/area-suggestions");
  return res.data;
};

// PATCH  /admin/area-suggestions/{areaId}/approve
export const adminApproveAreaSuggestion = async (areaId) => {
  const res = await patchWithoutData(
    ENDPOINTS.admin.areaSuggestions.approve(areaId)
  ); // api.patch(`/admin/area-suggestions/${areaId}/approve`);
  return res.data;
};

// PATCH /admin/area-suggestions/{areaId}/reject
export const adminRejectAreaSuggestion = async (areaId) => {
  const res = await patchWithoutData(
    ENDPOINTS.admin.areaSuggestions.reject(areaId)
  ); // api.patch(`/admin/area-suggestions/${areaId}/reject`);
  return res.data;
};
