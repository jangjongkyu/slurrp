<template>
  <div>
      <component
        :is="component"
      />

  </div>
</template>

<script>
import Page from "@/assets/mixins/page";
import Desktop from "@/components/pages/main/today/Desktop";
import Mobile from "@/components/pages/main/today/Mobile";

export default {
    components: {Desktop, Mobile},
    mixins: [Page],

    data() {
      return {
        categories: [],
        mobileIntro: undefined,
        popupList: [],
        modalIndex: -1,
        moPopWidth: 300,
        moPopHeight: 430,
        onLoading: false,
      };
    },

    fetch({store}) {
      store.commit("layout/setMobileHeader", {
        headerComponentName: "main",
        routeName: "나이스클랍",
        hasFooter: true,
      });
    },
    /*
    beforeRouteEnter: (to, from, next) => {
      console.log("beforeRouteEnter1");
      if (from.name) {
        to.meta.initialSlide = 1;
      }
      //next();
      console.log("beforeRouteEnter2");
    },
    */
    mounted() {
    },

    activated() {
    },

    methods: {
    }
  
};
</script>