<template>
  <form
    ref="root"
    @submit.prevent="onSubmit()"
    novalidate
    autocomplete="off"
  >
    <!-- NICECLAUP 회원가입 시 -->
    <div class="box">
      <div class="mar_set" :class="{'w800':!$device.isMobile}">
        <h4 class="title_1st">회원가입</h4>
        <article>
          <ul>
            <li>
              <div class="input_common">
                <label class="tit">이름</label>
                <input
                  ref="name"
                  placeholder="이름"
                  type="text"
                  v-model="form.name"
                  :disabled="form.hasName"
                  required
                />
              </div>
            </li>
            <li>
              <div class="input_common">
                <label class="tit">휴대폰 번호</label>
                 <div class="dp_flex">
                  <number-input
                    ref="mobile"
                    placeholder="휴대폰 번호('-' 없이 숫자만 입력)"
                    v-model="form.mobile"
                    :disabled="form.hasMobile"
                    required
                    @input="validateMobileNumber()"
                  />
                   <button
                     type="button"
                     class="bt_white_s"
                     v-if="mobileDuplicationChecked"
                   >
                     본인인증완료
                   </button>
                   <button
                     type="button"
                     class="bt_white_s"
                     @click.stop="openCertModal(form.name)"
                     v-else
                   >
                     본인인증하기
                   </button>
                </div>
              </div>
              <div class="input_common">
                <label class="tit">이메일</label>
                <div class="dp_flex">
                  <input
                    ref="email"
                    placeholder="이메일(아이디)"
                    type="email"
                    v-model="form.email"
                    :disabled="form.hasEmail"
                    required
                  />
                  <button
                    type="button"
                    class="bt_white_s"
                    @click.stop="validateEmailDuplication()"
                    :disabled="isEmailEmpty"
                  >
                    중복확인
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </div>
    <!--// NICECLAUP 회원가입 시 -->
    <!-- 약관동의 -->
    <div class="box">
      <div class="mar_set" :class="{ 'w800' : !$device.isMobile }">
        <div class="clear_box">
          <h4 class="title_2nd fl">약관동의</h4>
          <label class="checkbox_square_wrap fr">
            <input type="checkbox" :checked="isAllChecked" @click.stop="toggleAll()" />
            <i class="check_icon"></i> 전체선택
          </label>
        </div>
        <div class="subj_detail_ul">
          <ul>
            <li
              v-for="(o, i) in essentialsChecklist"
              :key="i"
            >
              <label class="checkbox_square_wrap">
                <input
                  :ref="`essCheck${i}`"
                  type="checkbox"
                  v-model="o.value"
                />
                <i class="check_icon"></i>
                [필수] {{ o.label }}
              </label>
              <button type="button" class="bt_arr" @click.stop="openAgreementModal(o.label, o.contents)">더보기</button>
            </li>

            <!-- 마케팅 정보 수신 동의 -->
            <li>
              <label class="checkbox_square_wrap">
                <input
                  type="checkbox"
                  :checked="provideMarketingInfo"
                  @click.stop="toggleMarketingInfo()"
                />
                <i class="check_icon"></i>
                [선택] 마케팅 정보 수신 동의
              </label>
              <button type="button" class="bt_arr" @click.stop="openMarketingAgreeModal()">더보기</button>
            </li>
            <li>
              <label class="checkbox_square_wrap mgr20">
                <input
                  type="checkbox"
                  v-model="form.doReceiveSms"
                />
                <i class="check_icon"></i>
                문자(SMS)/알림톡 수신
              </label>
              <label class="checkbox_square_wrap">
                <input
                  type="checkbox"
                  v-model="form.doReceiveEmail"
                />
                <i class="check_icon"></i>
                이메일 수신
              </label>
            </li>
            <!-- //마케팅 정보 수신 동의 -->
          </ul>
        </div>
        <div class="text_info gray">
          <ul>
            <li><span>마케팅(광고성) 정보 수신에 모두 동의하시면 ‘가입축하 쿠폰’을 드립니다.</span></li>
            <li>중요 안내 사항 및 주문/배송에 대한 정보는 위 수신여부와 관계없이 발송됩니다.(아이디로 입력하신 이메일 주소로 발송)</li>
            <li>광고성 정보 수신에 하나라도 동의하실경우 마케팅 정보 수신동의에 체크됩니다.</li>
          </ul>
        </div>
        <div class="bt_2nd">
          <button
            type="button"
            class="bt_white"
            @click.stop="checkAll(true)"
          >
            모두 동의하기
          </button>
        </div>
        <div class="txt_s_b mgt20">
          NICE CLAUP(롯데 GFR) 이용약관, 개인정보 수집/이용 동의 내용을 확인하였으며 위 내용에 동의합니다.<br/>
          만, 14세 미만 아동은 회원가입이 제한됩니다.
        </div>
        <div class="bt_last pd0" v-if="!$device.isMobile">
          <button
            type="submit"
            class="bt_black"
          >
            가입하기
          </button>
        </div>
      </div>
      <div class="bt_last" v-if="$device.isMobile">
        <button
          type="submit"
          class="bt_black"
        >
          가입하기
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import _ from "@/assets/libs/lodash";
import {isEmailPattern, isEmptyString, isMobilePattern} from "@/assets/libs/validate";
import Login from "@/assets/mixins/login";
import Join from "@/assets/mixins/join";
import NumberInput from '@/components/commons/input/NumberInput';
import AgreementModal from '@/components/commons/modal/join/AgreementModal';

export default {
  components: {NumberInput},
  head: {
    title: "간편회원가입"
  },

  mixins: [Login, Join],

  middleware: ["anonymous-only"],

  fetch({store, redirect}) {
    let form = store.state["simple-join"].details;
    if (form === undefined) {
      return redirect("/login");
    }

    store.commit("layout/setMobileHeader", {
      headerComponentName: "page",
      routeName: "간편 회원 가입",
      hasFooter: true,
      referrer: {path: "/login"}
    });
  },

  data: () => (
    {
      form: {
        siteId: undefined,
        type: undefined,
        name: undefined,
        email: undefined,
        mobile: undefined,
        doReceiveEmail: false,
        doReceiveSms: false
      },
      refreshToken: undefined,
      chkBtn: 'N'
    }
  ),

  computed: {
    isEmailEmpty() {
      return isEmptyString((this.form || {}).email);
    },
  },

  created() {
    let form = _.merge({
      siteId: this.$env.siteNo,
      type: undefined,
      name: undefined,
      email: undefined,
      mobile: undefined,
      doReceiveEmail: false,
      doReceiveSms: false,
      storeCode: 'O0046'
    }, this.$store.state["simple-join"].details || {});

    form.hasName = !isEmptyString(form.name);
    form.hasEmail = !isEmptyString(form.email);
    form.hasMobile = !isEmptyString(form.mobile);

    this.form = form;
    this.refreshToken = this.$store.state["simple-join"].refreshToken;

    this.$store.commit("simple-join/clear");
  },

  mounted() {
    if (!this.form.hasName) {
      this.$refs.name.focus();
    } else if (!this.form.hasMobile) {
      this.$refs.mobile.focus();
    } else if (!this.form.hasEmail) {
      this.$refs.email.focus();
    }
  },

  methods: {
    async onSubmit() {
      await this.validateEssentialsChecklist()
      await this.validateForm()

      if(this.chkBtn == 'N'){
        this.chkBtn = 'Y';
      }else{
        return;
      }

      try {
        await this.$axios.$post("/api/member/simple-join", this.form);

        //마케팅정보 수신동의 알림 추가 START
        /*
        let now = this.formatDate(new Date(), "YYYY년 MM월 DD일");;
        let submitMessage = "[나이스클랍]<br/><br/>";
        
        if(this.form.doReceiveSms) {
          submitMessage += "문자(SMS)/알림톡 마케팅(정보성) 광고 수신을 동의하셨습니다.<br/>";
          submitMessage += "(" + now + ")<br/><br/>";
        }

        if(this.form.doReceiveEmail) {
          submitMessage += "이메일 마케팅(정보성) 광고 수신을 동의하셨습니다.";
          submitMessage += "(" + now + ")<br/><br/>";
        }
        submitMessage += "가입되었습니다!";
        */
        //마케팅정보 수신동의 알림 추가 END
        this.chkBtn = 'N';
        return this.$modal.success("가입이 완료되었습니다.")
          .then(() => {
            //this.doOAuthLoginChain(this.form.type, this.refreshToken)
            let params = {
              doReceiveEmail: this.form.doReceiveEmail,
              doReceiveSms: this.form.doReceiveSms,
              //둘다 동의일경우 쿠폰수신 ok
              coupon: (this.form.doReceiveEmail && this.form.doReceiveSms),
              paramCheck: true,
            }
            this.$router.push({ name: "join-welcome", params: params });
          });
      } catch (e) {
        this.chkBtn = 'N';
        let status = e.response.status;
        let data = e.response.data;

        if (data.message) {
          this.$modal.error(data.message);
        } else {
          this.$nuxt.error({ message: "시스템 오류가 발생하였습니다." });
        }

        if (status === 409) {
          // let message = "";
          // if (data.errorCode === "ERR_MEM_MOBILE") {
          //   message = "입력하신 전화번호로 등록된 계정이 있습니다.";
          // } else if (data.errorCode === "ERR_MEM_EMAIL") {
          //   message = "입력하신 이메일주소로 등록된 계정이 있습니다.";
          // } else {
          //   message = data.message || data.error;
          // }
          //
          // if (message !== "") {
          //   this.$modal.error(message);
          // }

          // if (data.errorCode === "ERR_MEM_MOBILE") {
          //   message = "입력하신 전화번호로 등록된 계정이 있습니다.<br/>해당 계정과 연결하시겠습니까?";
          // } else if (data.errorCode === "ERR_MEM_EMAIL") {
          //   message = "입력하신 이메일주소로 등록된 계정이 있습니다.<br/>해당 계정과 연결하시겠습니까?";
          // }
          // if (message !== "") {
          //   this.$modal.error({
          //     html: message,
          //     icon: "warning",
          //     showCancelButton: true
          //   })
          //     .then(async ({isConfirmed}) => {
          //       if (isConfirmed) {
          //         try {
          //           await this.$axios.$post("/api/member/simple-join/link", _.merge({
          //             doReceiveEmail: this.form.doReceiveEmail,
          //             doReceiveSms: this.form.doReceiveSms
          //           }, data));
          //
          //           this.$modal.success("계정이 연결되었습니다.")
          //             .then(() => this.doOAuthLoginChain(this.form.type, this.refreshToken));
          //         } catch (e) {
          //           this.$modal.error("연결에 실패하였습니다.");
          //         }
          //       }
          //     });
          // }
        }
      }
    },

    validateForm() {
      return new Promise(async (resolve, reject) => {
        if (!this.mobileDuplicationChecked) {
          await this.$modal.error("본인인증을 진행해주세요.");
          this.$refs.email.focus();
          return reject();
        }

        if (isEmptyString(this.form.name)) {
          await this.$modal.error("이름을 반드시 입력해 주세요.");
          this.$refs.name.focus();
          return reject();
        }

        if (!isMobilePattern(this.form.mobile)) {
          await this.$modal.error("휴대폰를 반드시 입력해 주세요.");
          this.$refs.mobile.focus();
          return reject();
        }

        if (isEmptyString(this.form.email)) {
          await this.$modal.error("이메일주소를 반드시 입력해 주세요.");
          this.$refs.email.focus();
          return reject();
        }

        if (!isEmailPattern(this.form.email)) {
          await this.$modal.error("올바른 이메일주소 형식이 아닙니다.");
          this.$refs.email.focus();
          return reject();
        }

        if (!this.emailDuplicationChecked) {
          await this.$modal.error("이메일주소 중복체크를 해주세요.");
          this.$refs.email.focus();
          return reject();
        }

        return resolve();
      });
    },

    openAgreementModal(title, contents) {
      this.$modal.show(AgreementModal, {
        title,
        contents
      }, {
        width: this.$device.isMobile ? "100%" : "400px",
        height: "auto"
      })
    },

    openMarketingAgreeModal() {
      this.openAgreementModal(
        "마케팅 정보 수신 동의 (선택)", `
        회사는 다음 목적을 위하여 귀하의 개인정보를 수집/이용합니다.
        <table class="pop_table mgt20">
    <colgroup>
              <col width=""><col width="30%"><col width="30%">
            </colgroup>
            <tr>
              <th>수집 목적</th>
                <th>수집 항목</th>
                <th>보유기간</th>
            </tr>
            <tr>
              <td><strong style="font-weight: bold; font-size: 18px;">개인 맞춤형 광고, 타깃 마케팅, 서비스 홍보, 이벤트 홍보</strong></td>
                <td>이메일 주소<br />휴대전화번호</td>
                <td><strong style="font-weight: bold; font-size: 18px;">회원 탈퇴 시 까지</strong></td>
            </tr>
        </table>
        <br />
        ※ 귀하는 위와 같은 개인정보 수집/이용에 동의를 거부할 수 있습니다. 거부하더라도 서비스 이용에 어려움은 없으나, 맞춤형 광고 및 이벤트 홍보 등 제공이 제한될 수 있습니다.
        <br /><br />
        마케팅 목적으로 개인정보를 수집/이용하는 것에 동의합니다(선택).
      `);
    },

  }

}
</script>
