const buildQuery = (params) => {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.append(key, value);
    }
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};


export const ENDPOINTS = {
  // ===================== AUTHENTICATION =====================
  auth: {
    register: () => "/auth/register",
    login: () => "/auth/login",
    logout: () => "/auth/logout",
    me: () => "/me",
    updateMe: () => "/me",
  },

  // ===================== PUBLIC REFERENCE DATA =====================
  areas: {
    list: (params) => `/areas${buildQuery(params)}`, // params: parent_id, active?
    details: (id) => `/areas/${id}`,
  },
  agencies: {
    list: (params) => `/agencies${buildQuery(params)}`, // params: active
    details: (id) => `/agencies/${id}`,
  },
  categories: {
    list: (params) => `/categories${buildQuery(params)}`, // params: agency_id, active
    details: (id) => `/categories/${id}`,
  },

  // ===================== WEBSITE LANDING (PUBLIC) =====================
  website: {
    latestAnonymousReports: () => "/website/latest-anonymous-reports",
    stats: () => "/website/stats",
  },

  // ===================== CITIZEN REPORTS =====================
  reports: {
    // Anonymous (public)
    anonymous: () => "/reports/anonymous",

    // Authenticated
    list: (params) => `/reports${buildQuery(params)}`, // params: page, per_page, status, category_id, area_id, agency_id, search, sort
    create: () => "/reports",
    details: (id) => `/reports/${id}`,
    update: (id) => `/reports/${id}`,
    cancel: (id) => `/reports/${id}/cancel`,
    myReports: (params) => `/my-reports${buildQuery(params)}`,
    addImages: (id) => `/reports/${id}/images`,
    deleteImage: (reportId, imageId) => `/reports/${reportId}/images/${imageId}`,
    confirm: (id) => `/reports/${id}/confirm`,
    unconfirm: (id) => `/reports/${id}/confirm`,
    history: (id) => `/reports/${id}/history`,
    review: (id) => `/reports/${id}/review`,
  },

  // ===================== EMPLOYEE REPORTS =====================
  employee: {
    reports: {
      list: (params) => `/employee/reports${buildQuery(params)}`,
      details: (id) => `/employee/reports/${id}`,
      updateStatus: (id) => `/employee/reports/${id}/status`,
      addPublicNote: (id) => `/employee/reports/${id}/public-note`,
    },
  },

  // ===================== ADMIN CRUD =====================
  admin: {
    areas: {
      list: (params) => `/admin/areas${buildQuery(params)}`,
      create: () => "/admin/areas",
      details: (id) => `/admin/areas/${id}`,
      update: (id) => `/admin/areas/${id}`,
      delete: (id) => `/admin/areas/${id}`,
    },
    agencies: {
      list: (params) => `/admin/agencies${buildQuery(params)}`,
      create: () => "/admin/agencies",
      details: (id) => `/admin/agencies/${id}`,
      update: (id) => `/admin/agencies/${id}`,
      delete: (id) => `/admin/agencies/${id}`,
    },
    categories: {
      list: (params) => `/admin/categories${buildQuery(params)}`,
      create: () => "/admin/categories",
      details: (id) => `/admin/categories/${id}`,
      update: (id) => `/admin/categories/${id}`,
      delete: (id) => `/admin/categories/${id}`,
    },
    users: {
      list: (params) => `/admin/users${buildQuery(params)}`,
      create: () => "/admin/users",
      details: (id) => `/admin/users/${id}`,
      update: (id) => `/admin/users/${id}`,
      delete: (id) => `/admin/users/${id}`,
    },
    reports: {
      assign: (reportId) => `/admin/reports/${reportId}/assign`,
    },
    areaSuggestions: {
      list: () => `/admin/area-suggestions`,
      approve: (areaId) => `/admin/area-suggestions/${areaId}/approve`,
      reject: (areaId) => `/admin/area-suggestions/${areaId}/reject`,
    },
  },

  // ===================== COMMUNITY (POSTS & COMMENTS) =====================
  community: {
    posts: {
      list: (params) => `/posts${buildQuery(params)}`,
      create: () => "/posts",
      details: (id) => `/posts/${id}`,
      update: (id) => `/posts/${id}`,
      delete: (id) => `/posts/${id}`,
      comments: {
        list: (postId) => `/posts/${postId}/comments`,
        create: (postId) => `/posts/${postId}/comments`,
      },
    },
    comments: {
      update: (commentId) => `/comments/${commentId}`,
      delete: (commentId) => `/comments/${commentId}`,
    },
  },

  // ===================== USER-AREA SUGGESTIONS =====================
  userAreas: {
    suggest: () => "/user-areas",
    list: () => `/user-areas`,
  },
};