export default {
  data: () => ({
    naver: undefined
  }),

  beforeMount() {
    try {
      let options = {
        clientId: this.$env.naverClientId,
        callbackUrl: `${this.$env.siteUrl}/link/naver`,
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
            redirectURI: this.getUrl(`${this.$env.siteUrl}/link/apple`),
            usePopup: true
          };

          window.AppleID.auth.init(config);

          document.addEventListener("AppleIDSignInOnSuccess", this.onAppleIDSignInOnSuccess);
          document.addEventListener("AppleIDSignInOnFailure", this.onAppleIDSignInOnFailure);

          try {
            let el = document.getElementById("appleid-signin");
            el.innerHTML = this.$device.isMobile ? "<span>애플</span>" : "애플";
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
    hasSns(type) {
      try {
        return this.loginUser.snsSet.filter(x => x.type === type)[0] !== undefined;
      } catch (e) {
        return false;
      }
    },

    async linkSns(type, token) {
      await this.$axios.$post("/api/sns/link", { type, token });
    },

    linkKakao() {
      Kakao.Auth.login({
        success: async (object) => {
          try {
            await this.linkSns("KAKAO", object.refresh_token);
            await this.$modal.success("카카오 계정 연결에 성공하였습니다.");
          } catch (e) {
            this.$modal.error("카카오 계정 연결에 실패하였습니다.");
          } finally {
            this.$router.go(0);
          }
        },
        fail: (err) => {
          this.$modal.error("카카오 계정 연결에 실패하였습니다.");
        },
      });
    },
    unlinkKakao() {
      this.$modal.confirm("카카오 계정 연결을 해제하시겠습니까?")
        .then(async () => {
          try {
            await this.$axios.$post("/api/sns/unlink", {type: "KAKAO"});
            this.$modal.success("카카오 계정 연결이 해제되었습니다.");
          } catch (e) {
            this.$modal.error("카카오 계정 연결 해제에 실패하였습니다.");
          } finally {
            // this.$emit("updateLoginInfo");
            this.$router.go(0);
          }
        });
    },

    linkNaver() {
      if (this.naver !== undefined) {
        if (this.$store.state.layout.isApp) {
          this.naver.authorize();
          window.doNaverLoginResult = undefined;
        } else {
          let t = this.naver.generateAuthorizeUrl();
          window.open(t, "naver_login", "height=800,width=600", false);
          window.doNaverLoginResult = async (accessToken) => {
            await this.linkSns("NAVER", accessToken);
            this.$router.go(0);
          };
        }
      }
    },
    unlinkNaver() {
      this.$modal.confirm("네이버 계정 연결을 해제하시겠습니까?")
        .then(async () => {
          try {
            await this.$axios.$post("/api/sns/unlink", {type: "NAVER"});
            this.$modal.success("네이버 계정 연결이 해제되었습니다.");
          } catch (e) {
            this.$modal.error("네이버 계정 연결 해제에 실패하였습니다.");
          } finally {
            this.$router.go(0);
          }
        });
    },

    onAppleIDSignInOnSuccess({ detail }) {
      let form = document.createElement("form");
      form.setAttribute("action", this.getUrl(`${this.$env.siteUrl}/link/apple`));
      form.setAttribute("method", "POST");

      form.innerHTML = `
        <input type="hidden" name="code" value="${detail.authorization.code}" />
        <input type="hidden" name="id_token" value="${detail.authorization.id_token}" />
      `;

      document.body.appendChild(form);
      form.submit();
    },

    async unlinkApple() {
      try {
        await this.$axios.$post("/api/sns/unlink", {type: "APPLE"});
      } catch (e) {
        // console.error(e);
      }
      await this.$modal.error(`
        애플 로그인을 해제하여도 애플 서비스에서 연동이 해제되지 않습니다.<br/>
        애플 로그인 연동 해제하는 방법은 <a href="https://support.apple.com/ko-kr/HT210426" target="_blank" style="text-decoration:underline;">여기</a>에서 확인하시기 바랍니다.
      `);
      return this.$router.go(0);
    }
  }
};
