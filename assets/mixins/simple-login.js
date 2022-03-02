import Login from "./login";

export default {
  extends: Login,

  data: () => ({
    naver: undefined
  }),

  beforeMount() {
    try {
      let options = {
        clientId: this.$env.naverClientId,
        callbackUrl: `${this.$env.siteUrl}/login/naver`,
        isPopup: false
      };

      let naverLogin = new this.$naverLogin.LoginWithNaverId(options);
      naverLogin.init();
      this.naver = naverLogin;
    } catch (e) {
    }
  },

  mounted() {
    this.$loadScript("https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js")
      .then(() => {
        try {
          let config = {
            clientId: this.$env.APPLE_CLIENT_ID || "",
            scope: "name email",
            redirectURI: this.getUrl(`${this.$env.siteUrl}/login/apple`),
            usePopup: true
          };

          window.AppleID.auth.init(config);

          document.addEventListener("AppleIDSignInOnSuccess", this.onAppleIDSignInOnSuccess);
          document.addEventListener("AppleIDSignInOnFailure", this.onAppleIDSignInOnFailure);

          try {
            let el = document.getElementById("appleid-signin");
            el.innerHTML = "애플 로그인";
          } catch (e) {
            // Element not found
          }
        } catch (e) {
          // console.error(e);
        }
      });
  },

  beforeDestroy() {
    document.removeEventListener("AppleIDSignInOnSuccess", this.onAppleIDSignInOnSuccess);
    document.removeEventListener("AppleIDSignInOnFailure", this.onAppleIDSignInOnFailure);
  },

  methods: {
    /**
     * 네이버 로그인
     */
    doNaverLogin() {
      if (this.naver !== undefined) {
        if (this.$store.state.layout.isApp) {
          this.naver.authorize();
          window.doNaverLoginResult = undefined;
        } else {
          let t = this.naver.generateAuthorizeUrl();
          window.open(t, "naver_login", "height=800,width=600", false);
          window.doNaverLoginResult = (accessToken) => {
            return this.doOAuthLoginChain("NAVER", accessToken);
          };
        }
      }
    },

    /**
     * 카카오 로그인
     */
    doKakaoLogin() {
      Kakao.Auth.login({
        success: (object) => {
          return this.doOAuthLoginChain("KAKAO", object.refresh_token);
        },
        fail: (err) => {},
      });
    },

    onAppleIDSignInOnSuccess({ detail }) {
      let form = document.createElement("form");
      form.setAttribute("action", this.getUrl(`${this.$env.siteUrl}/login/apple`));
      form.setAttribute("method", "POST");

      form.innerHTML = `
        <input type="hidden" name="code" value="${detail.authorization.code}" />
        <input type="hidden" name="id_token" value="${detail.authorization.id_token}" />
      `;

      document.body.appendChild(form);
      form.submit();
    },

    onAppleIDSignInOnFailure(e) {
      // console.error(e);
      if (e.error != "popup_closed_by_user") {
        this.$modal.error("애플 로그인에 실패하였습니다.");
      }
    }
  }
};
