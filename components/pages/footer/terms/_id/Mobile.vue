<template>
  <div id="wrap">
    <!-- Container -->
    <main class="contents">
      <!-- Header -->
      <header class="header_wrap">
        <nav class="header_pop">
          <h2><span>NICE CLAUP 서비스 이용약관</span></h2>
          <!--          <a href class="bt_closeall">닫기</a>-->
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
import Desktop from '@/components/pages/footer/terms/Desktop';

export default {
  extends: Desktop
};
</script>

<style></style>
