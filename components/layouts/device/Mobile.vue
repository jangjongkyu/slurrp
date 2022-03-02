<template>
  <div id="wrap">
    <template>
      <header-main v-if="header === 'header-main'"/>
      <header-page v-else-if="header === 'header-page'"/>
      <header-category v-else-if="header === 'header-category'"/>

      <main class="contents">
        <nuxt 
          keep-alive 
          :nuxtChildKey="$pageUtil.getKey($route)"
          :exclude="['/main/today','/cart']"
          :keep-alive-props="{ max: 5 }"
          />
          
        <!-- :exclude="$pageUtil.getKeepAliveExcludePageRegex()" -->
        <!-- :include="$pageUtil.getKeepAliveIncludeRegEx()" -->
        <!-- :include="$pageUtil.getNoReloadingPages()" -->
        <!--nuxt :key="componentKey"/-->
      </main>

      <!--top-button/-->

      <!--mobile-footer v-if="$store.state.layout.hasFooter"/-->
    </template>
    
  </div>
</template>

<script>
import HeaderMain from "@/components/commons/mobile/headers/HeaderMain";
import HeaderPage from "@/components/commons/mobile/headers/HeaderPage";
import HeaderCategory from "@/components/commons/mobile/headers/HeaderCategory";
import MobileFooter from "@/components/commons/mobile/MobileFooter";
import TopButton from "@/components/commons/TopButton";

export default {
  head: () => ({
    link: [
      {
        rel: "stylesheet",
        href: "/mobile/css/common.css",
      },
    ],
    script: [
      
    ],
  }),

  components: {
    HeaderMain,
    HeaderPage,
    HeaderCategory,
    MobileFooter,
    TopButton,
  },

  data: () => ({
    mobileIntro: undefined,
    onIntroRun: false,
  }),

  computed: {
    header() {
      return (
        "header-" + String(this.$store.state.layout.headerComponentName || "").toLocaleLowerCase()
      );
    },
  },

  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.intro {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  opacity: 1;
  background-position:center;
  background-size: cover;

  &.fadeout {
    opacity: 0;
    transition: visibility 0s 500ms, opacity 500ms linear;
  }

  img {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
}
</style>
