<template>
  <div id="wrap">
    <!-- header -->
    <desktop-header />
    <!-- //header -->

    <!-- Container -->
    <main class="contents">
      <nuxt :key="$pageUtil.getKey()"/>
    </main>
    <!-- Container -->

    <!--top-button /-->

    <!-- footer -->
    <desktop-footer/>
    <!-- //footer -->
  </div>
</template>

<script>
import DesktopFooter from '@/components/commons/desktop/DesktopFooter';
import DesktopHeader from '@/components/commons/desktop/DesktopHeader';
import TopButton from "@/components/commons/TopButton";

export default {
  components: {
    DesktopHeader,
    DesktopFooter,
    TopButton,
  },

  head: () => ({
    link: [
      {
        rel: 'stylesheet',
        href: '/web/css/common.css',
      },
    ],
  }),

  mounted() {
  }

};
</script>
