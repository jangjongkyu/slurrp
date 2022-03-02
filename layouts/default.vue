<template>
  <div>
    <!-- 하단 앱다운로드 팝업 -->
    <!--div class="app_down" v-if="showAppDownloadPopup">
      <div class="bt_wclose" @click.prevent="closeAppDownloadPopup()"></div>
      <div class="">
        <p>앱을 설치하고 더 많은 혜택과<br />퍼스널라이징 쇼핑을 경험해 보세요.</p>
        <p>앱 설치시 3천원 할인 쿠폰 증정</p>
        <a :href="appDownloadURL"><div class="bt_rwhite w100">앱으로 보기</div></a>
        <button class="bt_app_next" @click.prevent="closeAppDownloadPopup()">다음에 설치할게요</button>
      </div>
    </div-->
    <!-- //하단 앱다운로드 팝업 -->
    <component :is="component"/>
  </div>
</template>

<script>
import Desktop from "@/components/layouts/device/Desktop.vue";
import Mobile from "@/components/layouts/device/Mobile.vue";
import Blank from "@/components/layouts/device/Blank.vue";

const isLive = process.env.IS_LIVE == "true";

export default {
  components: {Desktop, Mobile, Blank},

  //middleware: ["user-info", "category"],

  head() {
    return {
      meta: [
        {
          hid: "viewport",
          name: "viewport",
          content: `${this.viewport}`
        }
      ]
    }
  },

  computed: {
    component() {
      if(this.$route.path == '/criteo'){
        return "blank"
      }
      return this.$device.isMobile ? "mobile" : "desktop";
    },

    viewport() {
      if (this.$device.isTablet) {
        //console.log("is Tablet");
        return "width=1440";
      } else {
        //console.log("is Web or Mobile");
        return "user-scalable=no,viewport-fit=auto,initial-scale=1,minimum-scale=1,maximum-scale=1,width=device-width,target-densitydpi=device-dpi";
      }
    },

  },

  async fetch({ $axios, store }) {
    //let site = await $axios.$get("/api/site");
    //store.commit("session/updateSiteInfo", site);
  },

  data() {
    return {
      showAppDownloadPopup: false,
      lastPage: "",
      lastFromPage: "",
      beforeLastPage: "",
    };
  },

  async created() {
    try {
      if (this.$store.state.session.isEmpty) {
        //let profile = await this.$axios.$get("/api/user/me");
        //this.$store.commit("session/set", profile);
      }
    } catch (e) {
      //console.error(e);
    }

    //this.$store.commit("session/updateSiteInfo", await this.$axios.$get("/api/site"));
  },

  mounted() {

    this.$router.afterEach((to, from) => {
      
    });

  },

  methods: {

  }
};
</script>
