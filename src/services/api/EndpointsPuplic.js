export const API_ENDPOINTS_PUPLIC = {
  Areas: {
    LIST: "/areas",
    DETAILS: (id) => `/areas/${id}`,
    ByParent: (id, parent_id) => `/areas/${id}?parent_id=${parent_id}`
  },
  Agencies: {
    LIST: "/agencies",
    DETAILS: (id) => `/agencies/${id}`,
    ACTIVITY: (id, is_active) => `/agencies/${id}?active=${is_active}`
  },
  Categories: {
    LIST: "/categories",
    DETAILS: (id) => `/categories/${id}`,
    ACTIVITY: (id, is_active) => `/categories/${id}?active=${is_active}`,
    AGENCY: (id, agency_id) => `/categories/${id}?agency_id=${agency_id}`,
    ACTIVITY_AGENCY: (id, agency_id, is_active) => `/categories/${id}?agency_id=${agency_id}?&active=${is_active}`
  },
  Website:{
    STATUS: "/website/stats",
    REPORT: "/website/latest-anonymous-reports",
    REPORT_POST: "/reports/anonymous"
  },
  Login: "/auth/login",
  Logout: "/auth/logout",
  Register: "/auth/register"
};