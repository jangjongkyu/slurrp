<template>
  <component :is="component" />
</template>

<script>
import Desktop from "@/components/pages/main/Desktop";
import Mobile from "@/components/pages/main/Mobile";

export default {
  components: { Desktop, Mobile },

  middleware: [
    ({ route, redirect }) => {
      if (route.path === "/main") {
        return redirect("/main/today");
      }
    }
  ],

  fetch({ store }) {
    store.commit("layout/setMobileHeader", {
      headerComponentName: "main",
      routeName: "메인",
      hasFooter: true,
    });
  },

  computed: {
    component() {
      return this.$device.isMobile ? "mobile" : "desktop";
    },
  }
};
</script>
