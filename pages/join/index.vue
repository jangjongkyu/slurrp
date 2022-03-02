<template>
  <section>
    <!-- 가입방식 -->
    <div class="box"><!-- NICECLAUP 회원가입 -->
      <div class="mar_set bline" :class="{'w500':!$device.isMobile}">
        <h4 class="title_1st">NICE CLAUP(롯데 GFR) 회원가입</h4>
        <span class="txt_center_desc">NICE CLAUP(롯데 GFR) 회원으로 가입합니다.</span>
        <div class="bt_2nd mgb30">
          <button
            type="button"
            class="bt_black"
            @click.stop="$router.push({path: '/join/form', query: $route.query})"
          >
            NICE CLAUP(롯데 GFR) 회원가입
          </button>
        </div>
      </div>
    </div>
    <div class="box shadow pd"> <!-- 간편 회원가입 -->
      <div class="mar_set" :class="{'w500':!$device.isMobile}">
        <h4 class="title_1st">간편 회원가입</h4>
        <span class="txt_center_desc">사용중인 SNS 계정으로<br />간편하게 가입하실 수 있습니다.</span>
        <div class="login_sns mgt30"> <!-- 간편 로그인 -->
          <ul>
            <li>
              <button type="button" class="bt_naver" @click.stop="doNaverLogin()">
                네이버 로그인
              </button>
            </li>
            <li>
              <button type="button" class="bt_kakao" @click.stop="doKakaoLogin()">
                카카오 로그인
              </button>
            </li>
            <li>
              <button id="appleid-signin" type="button" class="bt_apple">
                애플 로그인
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--// 가입방식 -->

    <!-- 회원혜택 => 하드코딩!! -->
    <div class="box gray">
      <div class="mar_set" :class="{'w500':!$device.isMobile}">
        <h4 class="title_2nd">NICE CLAUP(롯데 GFR) 회원 혜택</h4>
        <ul class="subj_detail_ul">
          <li>
            <i>
              <img src="/web/images/icon_join_main_benefit_01.png"/>
            </i>
            <span>
              <b>가입축하 쿠폰</b>
              NICE CLAUP(롯데 GFR) 회원으로 신규 가입시 가입축하 쿠폰을 지급합니다.
            </span>
          </li>
          <!-- <li>
            <i>
              <img src="/web/images/icon_join_main_benefit_02.png"/>
            </i>
            <span>
              <b>회원등급에 따른 혜택</b>
              회원등급에 따라 포인트 차등 적립과 등급 달성 시 할인쿠폰 발급 혜택을 드립니다.
            </span>
          </li>

          <li>
            <i>
              <img src="/web/images/icon_join_main_benefit_03.png"/>
            </i>
            <span>
              <b>구매 포인트 혜택</b>
              회원등급에 따라 상품 구매시 결제금액의 최대 4% 적립
            </span>
          </li> -->
          <li>
            <i>
              <img src="/web/images/icon_join_main_benefit_04.png"/>
            </i>
            <span>
              <b>리뷰작성 혜택</b>
              구매 후 리뷰 작성하시면 최대 2,000 포인트가 적립 됩니다.
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!--// 회원혜택 -->
  </section>
</template>

<script>
import SimpleLogin from "@/assets/mixins/simple-login";

export default {
  head: {
    title: "회원가입"
  },

  middleware: ["anonymous-only"],

  mixins: [SimpleLogin],

  fetch({store}) {
    store.commit("layout/setMobileHeader", {
      headerComponentName: "page",
      routeName: "회원 가입",
      hasFooter: true
    });
  }
}
</script>
