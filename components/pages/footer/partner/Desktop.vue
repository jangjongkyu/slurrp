<template>
  <section>
    <!-- 타이틀 -->
    <div class="box">
      <div class="mar_set">
        <h4 class="title_1st">제휴문의</h4>
        <div class="foot_line_title"></div>
      </div>
    </div>
    <!--// 타이틀 -->

    <form @submit.prevent="onSubmit()" novalidate>
      <div class="box">
        <div class="mar_set w800">
          <div class="input_common">
            <label class="tit">업체명</label>
            <input placeholder="한,영문 100자 이내" type="text" v-model="form.ttl" required />
          </div>

          <div class="input_common mgt30">
            <label class="tit">담당자명</label>
            <input placeholder="한,영문 100자 이내" type="text" v-model="form.usrDfn1Val" required />
          </div>

          <div class="input_common mgt30">
            <label class="tit">연락처</label>
            <input placeholder="숫자만 입력 하세요" type="text" v-model="form.usrDfn2Val" required @input="checkNumberInput()" />
          </div>

          <div class="input_common mgt30">
            <label class="tit">E-mail</label>
            <input placeholder="담당자 이메일 주소를 정확히 입력 바랍니다." type="email" v-model="form.usrDfn3Val" required />
          </div>

          <div class="input_common mgt30">
            <label class="tit">문의내용</label>
            <textarea
              class="textarea_common h300"
              placeholder="한,영문 1,000자 이내 내용을 입력해 주세요"
              v-model="form.content"
              required
              @input="contentKeyup()"
            >
            </textarea>
            <div class="fr"><b class="txt_pink">{{ form.content ? form.content.length : 0 }}</b>/1000</div>
          </div>
        </div>
      </div>

      <!-- 개인정보 수집 이용에 대한 동의 -->
      <div class="box">
        <div class="mar_set w800">
          <div class="partner_terms">
            <div class="foot_line_title">
              <div class="fl">
                <h4>개인정보 수집 이용에 대한 동의</h4>
              </div>
              <div class="fr">
                <div class="fl txt_s">
                  개인정보 수집 이용에 대한 동의를 하셔야 제휴문의가 가능합니다.
                </div>
                <div class="fr mgl15">
                  <label class="checkbox_square_wrap">
                    <input type="checkbox" v-model="form.infoCd" />
                    <i class="check_icon"></i>
                    동의합니다.
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- 안내문구 -->
          <div class="text_info gray">
            <p>1. 제휴문의를 위한 개인정보 수집/이용 목적</p>
            <p class="mgl15">
              회사는 원활한 제휴문의를 위하여 아래와 같은 개인정보를 수집하고
              있습니다.
            </p>
            <p class="mgt30">2. 수집하는 개인정보 항목 및 수집방법</p>
            <p class="mgl15">(1) 수집 항목</p>
            <p class="mgl30">- 성명, 연락처, 이메일</p>
            <p class="mgl15">(2) 수집 방법</p>
            <p class="mgl30">- 온라인 홈페이지</p>
            <p class="mgt30">3. 개인정보의 처리 및 보유기간</p>
            <p class="mgl15">
              회사는 법령에 따른 개인정보 보유 이용기간 또는 제휴문의 신청자로부터
              개인정보를 수집할때 동의받은 개인정보 보유 이용기간 내에서
              개인정보를 처리 및 보유합니다.
            </p>
            <p class="mgl30">(1) 제휴문의 접수 후 36개월 보관 후 파기</p>
          </div>
          <!-- //안내문구 -->

          <div class="bt_2nd mgt30">
            <button type="button" class="bt_white" @click.stop="submitCancel()">취소</button>
            <button type="submit" class="bt_black mgl15">확인</button>
          </div>
        </div>
      </div>
      <!-- //개인정보 수집 이용에 대한 동의 -->
    </form>
  </section>
</template>

<script>
import {
  isEmptyString,
  isPhonePattern,
  isEmailPattern
} from "@/assets/libs/validate.js";

export default {

  data: () => ({
    form: {
      ttl: undefined,
      usrDfn1Val: undefined,
      usrDfn2Val: undefined,
      usrDfn3Val: undefined,
      content: '',
      infoCd: false,
      usrDfn5Val: undefined
    },
  }),

  /*async mounted() {
    await this.$recaptcha.init();
  },*/

  methods: {
    async onSubmit() {
      await this.validate();
      /*try{
        this.form.token = await this.$recaptcha.execute('login');
        if(!this.form.token) return false;

        await this.$axios.$post('/api/recaptcha/partnership', this.form);
        await this.$modal.success("문의등록이 완료 되었습니다.");
        window.location.reload();
      }catch(error){
        this.$modal.error("제휴문의 등록에 실패하였습니다.");
      }*/
      return this.registerPartner();
    },

    async registerPartner() {
      // console.log('this.form >>>', this.form);
      try {
        await this.$axios.$post('/api/partnership', this.form);
        await this.$modal.success("문의등록이 완료 되었습니다.");
        window.location.reload();
      } catch (e) {
        this.$modal.error("제휴문의 등록에 실패하였습니다.");
      }
    },

    validate() {
      return new Promise((resolve, reject) => {
        if (!this.form.infoCd) {
          this.$modal.error("개인정보 수집 이용에 대한 동의를 체크바랍니다.");
          return reject();
        }

        if (isEmptyString(this.form.ttl)) {
          this.$modal.error("업체명을 입력해주세요.");
          return reject();
        }

        if (this.form.ttl.length > 100) {
          this.$modal.error("업체명은 100자를 넘을 수 없습니다.");
          return reject();
        }

        if (isEmptyString(this.form.usrDfn1Val)) {
          this.$modal.error("담당자명을 입력해주세요.");
          return reject();
        }

        if (this.form.usrDfn1Val.length > 100) {
          this.$modal.error("담당자명은 100자를 넘을 수 없습니다.");
          return reject();
        }

        if (isEmptyString(this.form.usrDfn2Val)) {
          this.$modal.error("연락처를 입력해주세요.");
          return reject();
        }

        if (!isPhonePattern(this.form.usrDfn2Val)) {
          this.$modal.error("올바른 연락처 형식이 아닙니다.");
          return reject();
        }

        if (isEmptyString(this.form.usrDfn3Val)) {
          this.$modal.error("이메일을 입력해주세요.");
          return reject();
        }

        if (!isEmailPattern(this.form.usrDfn3Val)) {
          this.$modal.error("올바른 이메일 형식이 아닙니다.");
          return reject();
        }

        if (isEmptyString(this.form.content)) {
          this.$modal.error("문의내용을 입력해주세요.");
          return reject();
        }

        if (this.form.content.length > 1000) {
          this.$modal.error("문의내용은 1000자를 넘을 수 없습니다.");
          return reject();
        }

        return resolve();
      });
    },

    checkNumberInput() {
      let val = String(this.form.usrDfn2Val || "");
      this.form.usrDfn2Val = val.replace(/\D/g, "");
    },

    contentKeyup() {
      if (String(this.form.content || "").length > 1000) {
        this.form.content = String(this.form.content || "").slice(0, 1000);
      }
    },

    submitCancel() {
      this.form.ttl = undefined;
      this.form.usrDfn1Val = undefined;
      this.form.usrDfn2Val = undefined;
      this.form.usrDfn3Val = undefined;
      this.form.content = '';
      this.form.infoCd = false;
    }
  }
};
</script>
