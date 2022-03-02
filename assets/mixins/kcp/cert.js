import moment from "moment";

/**
 * KCP 본인 인증
 */
export default {
  data: () => ({
    form: {
      mobile: undefined,
      dnHash: undefined,
      ordrIdxx: undefined,
      certNo: undefined,
      encCertData2: undefined
    },
    mobileDuplicationChecked: false,
    templateCookie: undefined
  }),

  mounted() {
    window.auth_data = this.kcpCertification;

    let el = document.createElement("form");
    el.setAttribute("name", "form_auth");

    el.innerHTML = `
      <input type="hidden" name="veri_up_hash" />
    `;

    this.$refs.root.appendChild(el);
  },

  beforeDestroy() {
    window.auth_data = undefined;
  },

  methods: {
    openCertModal(name) {
      this.mobileDuplicationChecked = false;
      name = __get_val(name);

      let auth_form = document.form_auth;
      // auth_form.user_name.value = name;

      if ((navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("iPhone") > -1) == false) {
        // 스마트폰이 아닌경우
        let width = 410;
        let height = 500;

        let leftpos = screen.width / 2 - width / 2;
        let toppos = screen.height / 2 - height / 2;

        let winopts = "width=" + width + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
        let position = ",left=" + leftpos + ", top=" + toppos;
        let AUTH_POP = window.open("", "auth_popup", winopts + position);
      }

      auth_form.target = "auth_popup";
      auth_form.action = "/kcp/cert";

      auth_form.submit();
    },

    async kcpCertification(form) {
      try {
        if ("0000" == form.res_cd.value) {
          await this.kcpCallback(form);
        } else {
          throw "본인 인증 실패";
        }
      } catch (e) {
        // console.log("Error", e);
        _throw.apply(this, [e]);
      }
    },

    async kcpCallback(form) {
      let data = {
        dnHash: form.dn_hash.value,
        ordrIdxx: form.ordr_idxx.value,
        certNo: form.cert_no.value,
        encCertData2: form.enc_cert_data2.value
      };

      // console.log("Form", form);
      // console.log("Cert data", data);

      let result = await this.$axios.$post("/api/member/mobile-cert", data);
      // console.log("Cert result", result);

      if (!result.birthday) result.birthday = moment().format("YYYYMMDD");
      let birthday = moment(result.birthday, "YYYYMMDD");

      // 생년월일 체크해서
      // 만 14세 이상인지 확인
      let today = moment();
      let error = false;

      // console.log("Today   ", today.format("YYYY-MM-DD"));
      // console.log("Birthday", birthday.format("YYYY-MM-DD"));

      if (today.year() - birthday.year() < 14) error = true;
      else if (today.year() - birthday.year() === 14) {
        let t_value = parseInt(today.format("MMDD"));
        let b_value = parseInt(birthday.format("MMDD"));
        if (t_value - b_value < 0) error = true;
      }

      if (error && !this.$env.debug) {
        this.$modal.error("만 14세 미만은 가입할 수 없습니다.")
                   .then(() => this.$router.push("/login"));
        return;
      }

      // console.log("Result data =====");
      // console.log(`mobile       ${result.mobile}`);
      // console.log(`dnHash       ${data.dnHash}`);
      // console.log(`ordrIdxx     ${data.ordrIdxx}`);
      // console.log(`certNo       ${data.certNo}`);
      // console.log(`encCertData2 ${data.encCertData2}`);

      // 성공했으면 데이터 셋팅
      this.form.mobile = result.mobile;
      this.form.dnHash = data.dnHash;
      this.form.ordrIdxx = data.ordrIdxx;
      this.form.certNo = data.certNo;
      this.form.encCertData2 = data.encCertData2;
      this.mobileDuplicationChecked = true;

      return this.$modal.success("본인 인증이 완료되었습니다.");
    },

    validateMobileNumber() {
      this.form.mobile = String(this.form.mobile).replace(/\D/g, "");
    }
  }
};

function __get_val(value) {
  if (value === undefined || value === null) value = "";
  return value.trim();
}

function _throw(e) {
  try {
    let code = e.response.data.message;
    if (code === "ERR_MEMBER_0001") {
      this.$modal.error("이미 가입된 회원입니다.");
    } else {
      throw "본인 인증 실패";
    }
  } catch (e) {
    this.$modal.error("[시스템] 본인 인증에 실패하였습니다.");
  }
}
