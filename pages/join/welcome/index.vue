<template>
  <section>
    
    <!-- 회원가입완료 화면 마케팅수신동의-->
    <template v-if="paramCheck">
    <div class="box" v-if="coupon"><!-- NICECLAUP 회원가입 -->
      <div class="mar_set bline" :class="{'w500':!$device.isMobile}">
        <h4 class="title_1st">나이스클랍(롯데GFR)<br />회원가입이 완료 되었습니다.</h4>
        <div class="join_coupon_img"><img src="/web/images/img_join_coupon.png"/></div>
        <span class="f14 tc dp_block">회원 가입 축하 20% 쿠폰이 지급되었습니다.</span>

        <div class="box gray">
          <div class="mar_set" :class="{'w500':!$device.isMobile}">
            <div class="txt_s">※ 발급된 쿠폰은 마이페이지 > 쿠폰 내역에서 확인해 주세요.</div>
            <div class="txt_s" v-if="doReceiveSms">※ SMS 마케팅 정보 수신 동의 ({{now}})</div>
            <div class="txt_s" v-if="doReceiveEmail">※ 이메일 마케팅 정보 수신 동의 ({{now}})</div>
          </div>
        </div>

        <div class="bt_2nd mgb30">
          <button
            type="button"
            class="bt_black"
            @click.stop="$router.push({path: '/login'})"
          >
            로그인 하기
          </button>
        </div>
      </div>
    </div>
    <!-- //회원가입완료 화면 마케팅수신동의-->

    <!-- 회원가입완료 화면 마케팅수신 미동의-->
    <div class="box" v-else><!-- NICECLAUP 회원가입 -->
      <div class="mar_set bline" :class="{'w500':!$device.isMobile}">
        <h4 class="title_1st mgb40">나이스클랍(롯데GFR)<br />회원가입이 완료 되었습니다.</h4>
        
        <span class="f14 tc dp_block">마케팅 수신동의 완료시 20% 쿠폰이 지급됩니다.</span>

        <div class="box gray">
          <div class="mar_set" :class="{'w500':!$device.isMobile}">
            <div class="txt_s" v-if="doReceiveSms">※ SMS 마케팅 정보 수신 동의 ({{now}})</div>
            <div class="txt_s" v-if="doReceiveEmail">※ 이메일 마케팅 정보 수신 동의 ({{now}})</div>
          </div>
        </div>

        <div class="bt_2nd mgt30">
          <button
            type="button"
            class="bt_black"
            @click.stop="$router.push({path: '/my-page/user/edit'})"
          >
            회원정보수정 하기
          </button>
        </div>

        <div class="bt_2nd mgb30">
          <button
            type="button"
            class="bt_white"
            @click.stop="$router.push({path: '/login'})"
          >
            로그인 하기
          </button>
        </div>
      </div>
    </div>
    </template>
    <!-- //회원가입완료 화면 마케팅수신 미동의-->

  </section>
</template>

<script>
import Formatter from "@/assets/mixins/formatter";

export default {
  head: {
    title: "회원가입"
  },

  middleware: ["anonymous-only"],

  mixins: [Formatter],

  data() {
    return {
      doReceiveEmail : false,
      doReceiveSms : false,
      coupon : false,
      now: {},
      paramCheck: false,
    }
  },

  fetch({store}) {
    store.commit("layout/setMobileHeader", {
      headerComponentName: "page",
      routeName: "회원 가입",
      hasFooter: true
    });
  },

  async mounted() {
    if(!this.paramCheck) {
      this.$router.push({path : "/main/today"});
    }
  },

  created() {
    this.doReceiveEmail = this.$route.params.doReceiveEmail;
    this.doReceiveSms = this.$route.params.doReceiveSms;
    this.coupon = this.$route.params.coupon;
    this.paramCheck = this.$route.params.paramCheck;
    this.now = this.formatDate(new Date(), "YYYY년 MM월 DD일");
  },

}
</script>
