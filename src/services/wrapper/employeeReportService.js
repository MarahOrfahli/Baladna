import {
  ENDPOINTS,
  getData,
  postData,
  patchData,
} from "../../api";

// GET /employee/reports
export const getEmployeeReports = async (params = {}) => {
  const res = await getData(ENDPOINTS.employee.reports.list(params)) // api.get("/employee/reports", { params });
  return res.data;
};

// GET /employee/reports/{report}
export const getEmployeeReport = async (reportId) => {
  const res = await getData(ENDPOINTS.employee.reports.details(reportId)) // api.get(`/employee/reports/${reportId}`);
  return res.data;
};

// PATCH /employee/reports/{report}/status
export const updateReportStatus = async (reportId, data) => {
  const res = await patchData(ENDPOINTS.employee.reports.updateStatus(reportId), data) // api.patch(`/employee/reports/${reportId}/status`, data);
  return res.data;
};

// POST /employee/reports/{report}/public-note
export const addPublicNote = async (reportId, note) => {
  const res = await postData(ENDPOINTS.employee.reports.addPublicNote(reportId), { note }) // api.post(`/employee/reports/${reportId}/public-note`, { note });
  return res.data;
};