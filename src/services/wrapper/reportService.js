import {
  ENDPOINTS,
  getData,
  postData,
  postWithoutData,
  patchData,
  deleteData
} from "../../api";

// POST /reports/anonymous (multipart/form-data)
export const createAnonymousReport = async (formData) => {
  //   const res = await api.post("/reports/anonymous", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  const res = await postData(ENDPOINTS.reports.anonymous(), formData);
  return res.data;
};

// GET /reports (paginated + filters)
export const getReports = async (params = {}) => {
  const res = await getData(ENDPOINTS.reports.list(params)); // api.get("/reports", { params });
  return res.data;
};

// POST /reports (authenticated, multipart/form-data)
export const createReport = async (formData) => {
  //   const res = await api.post("/reports", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  const res = await postData(ENDPOINTS.reports.create(), formData);
  return res.data;
};

// GET /reports/{report}
export const getReport = async (reportId) => {
  const res = await getData(ENDPOINTS.reports.details(reportId)); // api.get(`/reports/${reportId}`);
  return res.data;
};

// PATCH /reports/{report}
export const updateReport = async (reportId, data) => {
  const res = await patchData(ENDPOINTS.reports.details(reportId), data); // api.patch(`/reports/${reportId}`, data);
  return res.data;
};

// POST /reports/{report}/cancel
export const cancelReport = async (reportId) => {
  const res = await postWithoutData(ENDPOINTS.reports.cancel(reportId)); // api.post(`/reports/${reportId}/cancel`);
  return res.data;
};

// GET /my-reports
export const getMyReports = async (params = {}) => {
  const res = await getData(ENDPOINTS.reports.myReports(params)); // api.get("/my-reports", { params });
  return res.data;
};

// POST /reports/{report}/images (multipart/form-data)
export const uploadReportImages = async (reportId, files) => {
  const fd = new FormData();
  files.forEach((file) => fd.append("images[]", file));
  //   const res = await api.post(`/reports/${reportId}/images`, fd, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  const res = await postData(ENDPOINTS.reports.addImages(reportId), files);
  return res.data;
};

// DELETE /reports/{report}/images/{image}
export const deleteReportImage = async (reportId, imageId) => {
  const res = await deleteData(ENDPOINTS.reports.deleteImage(reportId, imageId)) // api.delete(`/reports/${reportId}/images/${imageId}`);
  return res.data;
};

// POST /reports/{report}/confirm
export const confirmReport = async (reportId) => {
  const res = await postWithoutData(ENDPOINTS.reports.confirm(reportId)) // api.post(`/reports/${reportId}/confirm`);
  return res.data;
};

// DELETE /reports/{report}/confirm
export const unconfirmReport = async (reportId) => {
  const res = await deleteData(ENDPOINTS.reports.unconfirm(reportId)) // api.delete(`/reports/${reportId}/confirm`);
  return res.data;
};

// GET /reports/{report}/history
export const getReportHistory = async (reportId) => {
  const res = await getData(ENDPOINTS.reports.history(reportId))  // api.get(`/reports/${reportId}/history`);
  return res.data;
};

// POST /reports/{report}/review
export const submitReview = async (reportId, data) => {
  const res = await postData(ENDPOINTS.reports.review(reportId), data) // api.post(`/reports/${reportId}/review`, data);
  return res.data;
};
