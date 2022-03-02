<template>
  <footer class="footer_wrap">
    <div class="footer_menu">
      <ul>
        <li class="font_w"><a href="" @click.prevent="openPrivacypolicyModal()">개인정보처리방침</a></li>
        <li><a href="" @click.prevent="openTermsModal()">이용약관</a></li>
        <li><nuxt-link to="/footer/adfilm">AD FILM</nuxt-link></li>
        <li><nuxt-link to="/footer/catalogue">CATALOGUE</nuxt-link></li>
      </ul>
      <div class="dp_flex">
        <div class="mgt03">
          <nuxt-link to="/footer/store" class="bt_white_gs">매장소개</nuxt-link>
          <!--<nuxt-link to="/footer/partner" class="bt_white_gs">제휴문의</nuxt-link>-->
        </div>
        <div class="sns_wrap tr">
          <a target="_blank" href="https://www.facebook.com/niceclaupkorea" class="sns_box facebook invert">Facebook</a>
          <a target="_blank" href="https://www.instagram.com/niceclaupkorea/" class="sns_box instagram invert">Instagram</a>
        </div>
      </div>
    </div>
    <div class="footer_info">
      <ul>
        <li>{{ footerData.compNm }}</li>
        <li>대표 : {{ footerData.ceoNm }}</li>
        <li>{{ footerData.roadAddr }} {{ footerData.roadDtlAddr }}</li>
        <li>개인정보보호 책임자 : {{ footerData.pipOfcNm }}</li>
        <li>사업자번호 : {{ formatBizRegNo(footerData.bizNo) }}</li>
        <li>통신판매번호 : {{ footerData.mosApprNo }}</li>
      </ul>
      <ul class="mgt20">
        <li>고객센터 : {{ formatPhone(footerData.csTelNo) }}</li>
        <li>입금계좌 : 신한 140-013-410230 롯데지에프알(주)</li>
        <!-- <li class="email">
          E-mail : <a class="txt_s" :href="`mailto:${footerData.dlgtEmail}`">{{ footerData.dlgtEmail }}</a>
        </li> -->
        <li class="copyright">
          COPYRIGHT (C) 2021 BY LOTTE GFR. ALL RIGHTS RESERVED.
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import PrivacypolicyModal from "@/components/pages/footer/privacypolicy/Mobile";
import TermsModal from "@/components/pages/footer/terms/Mobile";

export default {
  name: "MobileFooter",

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
            if (!_nasa) _nasa={};

            if(window.wcs){
              wcs.inflow("www.niceclaup.co.kr");
              wcs_do(_nasa);
            }

          }
    } catch(e) {}
    */
  },

  methods: {
    openPrivacypolicyModal() {
      this.$modal.show(
        PrivacypolicyModal,
        {},
        {
          width: "100%",
          height: "100%",
        }
      );
    },
    openTermsModal() {
      this.$modal.show(
        TermsModal,
        {},
        {
          width: "100%",
          height: "100%",
        }
      );
    },
  },
};
</script>
