export default {
  computed: {
    component() {
      console.log("pages.this.$device.isMobile : " , this.$device.isMobile);
      return this.$device.isMobile ? "mobile" : "desktop";
    },
  },

  beforeCreate() {
    //const currentRoute =
    //  this.$route.matched.find((route) => route.name === this.$route.name) || this.$route;
    //const path = currentRoute.path.replace(":", "_").replace("?", "");
    //this.$options.components.Mobile = require(`@/components/pages${path}/Mobile`).default;
    //this.$options.components.Desktop = require(`@/components/pages${path}/Desktop`).default;
    //this.$options.components.Mobile = () => import(`@/components/pages${path}/Mobile`);
    //this.$options.components.Desktop = () => import(`@/components/pages${path}/Desktop`);
  },
};
