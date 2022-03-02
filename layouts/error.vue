<template>
  <section>
    <header-main v-if="$device.isMobile"/>
    <div class="mar_set error" :class="{ false: 'w800' }[$device.isMobile]">
      <!-- 오류 메시지 -->
      <div class="error_status">
        <p class="fail" :class="{ true: 'mobile' }[$device.isMobile]">
          {{ error.title }}
        </p>
        <span class="detail_bdr error" v-html-custom="errorMessage"> </span>
        <!-- 안내문구 -->
        <div class="text_info mgb0 ta_c">
          <ul>
            <li class="tc">
              사용자 문의는 <br />
              010-xxxx-xxxx 로 연락해 주세요.
            </li>
          </ul>
        </div>
        <!--// 안내문구 -->
      </div>
      <!--// 오류 메시지 -->
    </div>
    <div class="bt_last" :style="{ true: 'margin:0 auto;width:800px;' }[$device.isDesktop]">
      <button
        type="button"
        class="bt_white"
        @click.stop="$router.go(-1)"
        v-if="showPrev"
      >
        이전 화면으로
      </button>
      <button
        type="button"
        class="bt_black"
        @click.stop="$router.push({ path: '/' })"
        v-if="showHome"
      >
        홈으로
      </button>
    </div>
  </section>
</template>

<script>
import Default from "./default";
import HeaderMain from '@/components/commons/mobile/headers/HeaderMain';

const ERROR_MESSAGE_MAP = {
  404: '페이지를 찾을 수 없습니다.',
}

export default {
  components: {HeaderMain},
  props: ["error"],
  extends: Default,
  computed: {
    showPrev() {
      if (this.error.showPrev === undefined) {
        return true;
      } else {
        return this.error.showPrev;
      }
    },
    showHome() {
      if (this.error.showHome === undefined) {
        return true;
      } else {
        return this.error.showHome;
      }
    },
    errorMessage() {
      return ERROR_MESSAGE_MAP[this.error.statusCode] || this.error.message
    },
  }
};
</script>

<style>
.error_status {
  background: #fafafa;
  overflow: hidden;
  padding: 30px 0 40px;
  margin: auto auto 50px;
}

.error_status p {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding-top: 50px;
  margin: 15px auto;
  width: 500px;
}

.error_status p.fail {
  background: url("/images/icon_fail.png") no-repeat center top;
  background-size: 40px;
}

.error_status p.fail.mobile {
  width: auto;
}

.error .bt_last button {
  margin-right: 0.5rem;
}

.error .bt_last button:last-child {
  margin-right: 0;
}

.error_status .text_info li::before {
  display: none;
}
</style>
