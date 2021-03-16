import Axios from 'axios'

var axios = Axios.create({
    baseURL: 'https://api.key2coin.com'
});
axios.interceptors.request.use(function (config) {
    //config.headers['Authorization'] = localStorage.getItem('token');
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

    // Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if ( error.response.status === 500 ) {
      localStorage.removeItem('token')
      return window.location = '/'
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axios;
