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
        <select>
          <option>v1.0 (개정일자 : 2021.01.31)</option>
        </select>
      </div>
      <div class="txt_box_gray">
        <div class="txt_info">
          <p>공고일자 : <span>2020-11-06</span></p>
          <p>시행일자 : <span>2020-11-06</span></p>
        </div>
        <pre>
          개인정보처리방침 내용
        </pre>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>
