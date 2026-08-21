import {
  ENDPOINTS,
  getData,
  postData,
  patchData,
  deleteData,
} from "../../api";

// GET /posts
export const getPosts = async (params = {}) => {
  const res = await getData(ENDPOINTS.community.posts.list(params)) // api.get("/posts", { params });
  return res.data;
};

// POST /posts
export const createPost = async (data) => {
  const res = await postData(ENDPOINTS.community.posts.create(), data) // api.post("/posts", data);
  return res.data;
};

// GET /posts/{post}
export const getPost = async (postId) => {
  const res = await getData(ENDPOINTS.community.posts.details(postId)) // api.get(`/posts/${postId}`);
  return res.data;
};

// PATCH /posts/{post}
export const updatePost = async (postId, data) => {
  const res = await patchData(ENDPOINTS.community.posts.update(postId), data) // api.patch(`/posts/${postId}`, data);
  return res.data;
};

// DELETE /posts/{post}
export const deletePost = async (postId) => {
  const res = await deleteData(ENDPOINTS.community.posts.delete(postId)) // api.delete(`/posts/${postId}`);
  return res.data;
};

// GET /posts/{post}/comments
export const getPostComments = async (postId) => {
  const res = await getData(ENDPOINTS.community.posts.comments.list(postId)) // api.get(`/posts/${postId}/comments`);
  return res.data;
};

// POST /posts/{post}/comments
export const createComment = async (postId, content) => {
  const res = await postData(ENDPOINTS.community.posts.comments.create(postId), { content }) // api.post(`/posts/${postId}/comments`, { content });
  return res.data;
};

// PATCH /comments/{comment}
export const updateComment = async (commentId, content) => {
  const res = await patchData(ENDPOINTS.community.comments.update(commentId), { content }) // api.patch(`/comments/${commentId}`, { content });
  return res.data;
};

// DELETE /comments/{comment}
export const deleteComment = async (commentId) => {
  const res = await deleteData(ENDPOINTS.community.comments.delete(commentId)) // api.delete(`/comments/${commentId}`);
  return res.data;
};