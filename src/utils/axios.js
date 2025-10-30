// import axios from 'axios';
// // config
// import { HOST_API } from 'src/config-global';

// // ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: HOST_API });

// // const axiosInstance = axios.create({
// //   baseURL: HOST_API,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

// export default axiosInstance;

// // ----------------------------------------------------------------------

// export const fetcher = async (args) => {
//   const [url, config] = Array.isArray(args) ? args : [args];

//   const res = await axiosInstance.get(url, { ...config });

//   return res.data;
// };

// // ----------------------------------------------------------------------

// export const endpoints = {
//   chat: '/api/chat',
//   kanban: '/api/kanban',
//   calendar: '/api/calendar',
//   auth: {
//     me: '/me',
//     login: '/login',
//     register: '/register',
//   },
//   mail: {
//     list: '/api/mail/list',
//     details: '/api/mail/details',
//     labels: '/api/mail/labels',
//   },
//   post: {
//     list: '/api/post/list',
//     details: '/api/post/details',
//     latest: '/api/post/latest',
//     search: '/api/post/search',
//   },
  
//   product: {
//     list: '/api/product/list',
//     details: '/api/product/details',
//     search: '/api/product/search',
//   },
// };



import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });
// const axiosInstance = axiosInstance.create({ baseURL: HOST_API });

// const axiosInstance = axios.create({
//   baseURL: HOST_API,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};
// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  posts: '/post/',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/me',
    login: '/login',
    register: '/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/blogs',
    details: '/blogs/slug/',
    latest: '/api/post/latest',
    search: '/api/post/search',
    categories: '/categories',
    byFilters: (filterString) => `/blogs?filter=${filterString}`,
    byCategoryFilters: (filterString, categoryId) =>
      `/blogs?filter=${filterString}&categoryId=${categoryId}`,
  },
  comments: {
    list: (blogId) => `/comments/${blogId}`,
    replies: (commentId) => `/comment-replies/${commentId}`,
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};