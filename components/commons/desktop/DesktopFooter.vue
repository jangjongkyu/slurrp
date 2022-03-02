<template>
  <footer class="footer_wrap">
    <div class="box">
      <div class="footer_menu">
        <ul class="mar_set">
          <li class="font_w"><nuxt-link to="/footer/privacypolicy">개인정보처리방침</nuxt-link></li>
          <li><nuxt-link to="/footer/terms">이용약관</nuxt-link></li>
          <li><nuxt-link to="/customer">고객센터</nuxt-link></li>
        </ul>
      </div>
      <div class="mar_set">
        <div class="footer_info">
          
        </div>

        <div class="footer_bt_sns">
          <ul>
            <li><nuxt-link to="/footer/store" class="bt_w_b">매장소개</nuxt-link></li>
            <!--<li><nuxt-link to="/footer/partner" class="bt_w_b">제휴문의</nuxt-link></li>-->
            <li><a target="_blank" href="https://www.facebook.com/niceclaupkorea" class="bt_sns_f">facebook</a></li>
            <li><a target="_blank" href="https://www.instagram.com/niceclaupkorea/" class="bt_sns_i">instagram</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
var _nasa = null;
export default {
  name: "DesktopFooter",

  computed: {
    footerData() {
      return this.$store.state.session.site;
    }
  },

  mounted() {
    /*
    try{
          if (typeof window !== "undefined") {
            
            if (!wcs_add) var wcs_add={};
            wcs_add["wa"] = "s_2741689f968b";
            if (!_nasa) var _nasa={};

            if(window.wcs){
              wcs.inflow("www.niceclaup.co.kr");
              wcs_do(_nasa);
            }

          }
    } catch(e) {}
    */

  },

};
</script>

<style scoped></style>
