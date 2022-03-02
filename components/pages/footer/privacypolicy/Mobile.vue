<template>
  <div id="wrap">
    <!-- Container -->
    <main class="contents">
      <!-- Header -->
      <header class="header_wrap">
        <nav class="header_pop">
          <h2><span>개인정보처리방침</span></h2>
          <button class="bt_closeall" @click.prevent="$emit('close')">닫기</button>
        </nav>
      </header>
      <!--// Header -->
      <div class="sel_common promotion">
        <select v-model="selectedPolicy">
          <option v-for="policy in policies" :value="policy">v{{ policy.versionInfo }} (개정일자 : {{ policy.sysRegDtm | dateFormat}})</option>
        </select>
      </div>
      <div class="txt_box_gray">
        <div class="txt_info">
          <p>공고일자 :&nbsp;<span>{{ selectedPolicy.sysRegDtm | dateFormat }}</span></p>
          <p>시행일자 :&nbsp;<span>{{ selectedPolicy.sysRegDtm | dateFormat }}</span></p>
        </div>
        <pre v-html-custom="selectedPolicy.content">

        </pre>
      </div>
    </main>
  </div>
</template>

<script>
import Desktop from '@/components/pages/footer/privacypolicy/Desktop';

export default {
  extends: Desktop
};
</script>

<style lang="scss" scoped>
  /deep/ table {
    width: 100% !important;
  }
</style>
