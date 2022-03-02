import {isEmailPattern, isEmptyString} from "assets/libs/validate";
import KcpCert from "@/assets/mixins/kcp/cert";

export default {
  extends: KcpCert,

  async asyncData({$memberService}) {
    return {
      essentialsChecklist: await $memberService.getPolicyCheckList()
    }
  },

  data: () => ({
    // 필수 체크 항목 목록
    essentialsChecklist: [
    ],

    // 본인인증
    mobileDuplicationChecked: false,

    // 이메일중복 확인
    emailDuplicationChecked: false
  }),

  computed: {
    provideMarketingInfo() {
      return this.form.doReceiveEmail || this.form.doReceiveSms;
    },

    isAllChecked() {
      let r = true;
      this.essentialsChecklist.forEach((node) => (r &= node.value));
      r &= this.form.doReceiveEmail;
      r &= this.form.doReceiveSms;
      return !!r;
    },
  },

  methods: {
    validateEssentialsChecklist() {
      return new Promise((resolve, reject) => {
        let hasError = false;
        this.essentialsChecklist.forEach((node, i) => {
          if (!node.value) {
            hasError = true;
            this.$modal
              .error(`${node.label}에 동의해주세요.`)
              .then(() => this.$refs[`essCheck${i}`].focus());
            return false;
          }
        });
        return hasError ? reject() : resolve();
      });
    },

    toggleMarketingInfo() {
      let state = this.form.doReceiveSms || this.form.doReceiveEmail;
      this.form.doReceiveEmail = this.form.doReceiveSms = !state;
    },

    checkAll(value) {
      if (value === undefined) value = true;
      this.essentialsChecklist.forEach((node) => (node.value = value));
      this.form.doReceiveEmail = this.form.doReceiveSms = value;
      // console.log("isAllChecked", this.isAllChecked);
    },

    toggleAll() {
      if (this.isAllChecked) {
        this.checkAll(false);
      } else {
        this.checkAll(true);
      }
    },

    async validateEmailDuplication() {
      let email = this.form.email;
      if (isEmptyString(email)) {
        this.$modal.warning("이메일주소를 입력해주세요.");
        return;
      } else if (!isEmailPattern(email)) {
        this.$modal.error("올바른 이메일주소 형식이 아닙니다.");
        this.form.email = undefined;
        return;
      } else {
        try {
          await this.$axios.$put("/api/member/check-email", email);
          this.emailDuplicationChecked = true;
          return this.$modal.success(`${email}은(는) 사용할 수 있습니다.`);
        } catch (e) {
          let state = ((e || {}).response || {}).status;
          let data = ((e || {}).response || {}).data;

          if (state === 409) {
            this.emailDuplicationChecked = false;
            this.$modal.error(data.message).then(() => {
              this.form.email = undefined;
              this.$refs.email.focus();
            });
          }
        }
      }
    }
  }
};
