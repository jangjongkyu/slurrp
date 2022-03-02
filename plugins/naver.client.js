import * as naverLogin from "assets/libs/naveridlogin_js_sdk_2.0.2";

export default ({ app }, inject) => {
  // let options = {
  //   clientId: ctx.env.naverClientId,
  //   callbackUrl: `${ctx.env.siteUrl}/login/naver`,
  //   isPopup: true
  // };
  //
  // let login = new naverLogin.LoginWithNaverId(options);
  // login.init();
  //
  // let n = {login};
  // ctx.app.$naver = n;
  // inject("naver", n);

  app.$naverLogin = naverLogin;
  inject("naverLogin", naverLogin);
};
