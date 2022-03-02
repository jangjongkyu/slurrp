export default {
  methods: {
    async afterLoginHandler() {

      try {
        let mbrNoEnc = await this.$axios.$get("/api/member/enc");
        if(mbrNoEnc && mbrNoEnc != "") {
          let param = {
            custId : mbrNoEnc
            , userInfo : {}
          }

          if(this.$device.isMobile){
            //모바일일경우
            if (window.skyDroid) {
              //Android
              var paramStr = JSON.stringify(param);
              window.skyDroid.pmsDeviceCert(paramStr);
            } else {
              //iOS
              window.webkit.messageHandlers.pmsDeviceCert.postMessage(param);
            }

          }

        }
      } catch (e) {}

      try {
        /*
          회원별 초기접근 referrer 저장
          */
          // default.vue 에서 저장해뒀던 referrer를 갖고옴
          let referrer = window.sessionStorage.getItem("REFERRER");
          if(referrer) {
            this.$axios.$post("/api/member/referrer", {referrer : referrer});
            window.sessionStorage.removeItem("REFERRER");
          }
      } catch (e) { alert(e.message); }

      // 로그인시 앱일경우 APP_MBR_INFO 에 mbr_no 셋해주기
      try{
        if(this.$device.isMobile){
          //모바일일경우
          if (window.skyDroid) {
            //Android
            let appNo = window.skyDroid.getAppNo(); 
            await this.$axios.$post("/api/app-mbrno", {appNo : appNo});
          } else {
            //iOS
            window.webkit.messageHandlers.getAppNo.postMessage("");
            await this.$axios.$post("/api/app-mbrno", {appNo : appNo});
          }

        }
      } catch (e) {}

      // 장바구니 Merge 및 Get
      await this.$cart.get();
      // 장바구니 ID를 날리자 -> 회원으로 전환되면서...
      this.$cart.clear();
      this.$store.commit("session/clear");

      await this.$_wish.get();
      if (this.$route.query.referrer === "order") {
        return this.$router.push("/order");
      } else if(this.$route.query.referrer === "gift"){
        return this.$router.push("/gift");
      }else {
        let path = this.$cookies.get("LOGIN_REDIRECT");
        return this.$router.push({ path: path || "/" });
      }
    },

    /**
     * OAuth 로그인
     * @param id
     * @param token
     * @returns {Promise<Route>}
     */
    async doOAuthLoginChain(type, token) {
      let form = [`type=${type}`, `token=${token}`].join("&");
      try {
        await this.$axios.$post("/api/oauth/login", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-App-No": this.$store.state.layout.appNo,
            "X-App-YN": this.$store.state.layout.isApp ? "Y" : "N"
          },
        });
        return this.afterLoginHandler();
      } catch (e) {
        if (((e || {}).response || {}).status === 404) {
          let data = ((e || {}).response || {}).data || {};
          this.$store.commit("simple-join/set", {
            details: data.details,
            refreshToken: token,
          });
          return this.$router.push({ path: "/join/simple-form" });
        } else {
          return this.handleLoginError(e);
        }
      }
    },

    async handleLoginError(e) {
      let state = ((e || {}).response || {}).status;
      let data = ((e || {}).response || {}).data;
      let code = (data || {}).code || '';
      let message = data.message;

      if (state === 504) message = "서버에 접속할 수 없습니다.";
      else if (code === 'ERR_HIBERNATE_USER') {
        let cache = JSON.stringify(data);
        cache = encodeURI(cache);
        this.$cookies.set(process.env.DORMANT_INFO_KEY, btoa(cache), {
          path: '/',
          maxAge: 60 * 5
        });
        return this.$router.push({path: '/member/active'});
      }
      else if (state === 403) {
        return;
      }
      return this.$modal.error(message);
    },
  },
};
