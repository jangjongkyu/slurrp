import qs from "qs";

export default ({ $axios, $device, redirect, $cookies, app: { router, $modal } }) => {
  let path = undefined;

  $axios.defaults.paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  };

  $axios.interceptors.request.use(
    (config) => {
      if ($device.isMobile) {
        config.headers["X-Device"] = "20";
      } else {
        config.headers["X-Device"] = "10";
      }
      return config;
    },
    (config) => {
      return Promise.reject(config);
    }
  );

  $axios.onError((error) => {
    if (error.response.status === 401) {
      return redirect("/");
    } else if (error.response.status === 403) {
      
      if (path == "/login") {
        return;
      } else if( error.response.data.code == 'USER_NOT_AUTHORIZED' ) {
        $cookies.set("LOGIN_REDIRECT", path);
        return redirect("/login");
      }
      
    }
  });

  router.beforeEach((to, from, next) => {
    try {
      if (to.fullPath !== "/login") {
        path = to.fullPath;
      }
    } catch (e) {
      // Error occurred
    }
    next();
  });
};
