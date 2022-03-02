<template>
  <transition name="fade">
    <template v-if="$device.isMobile">
      <div class="gotop_wrap" v-if="scrollDown">
        <button
          type="button"
          class="gotop"
          @click.stop="moveTop()"
        >
          맨 위로 이동
        </button>
      </div>
    </template>

    <template v-else>
      <div class="gotop" v-if="scrollDown">
        <button 
          type="button"
          @click.stop="moveTop()"
        >
          <img src="/web/images/bt_top.gif" alt="맨 위로 이동" />
        </button>
      </div>
    </template>
  </transition>
</template>

<script>
export default {
  name: "TopButton",
  data() {
    return {
      scrollDown: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if ((window.scrollY || window.pageYOffset) > 200) {
        this.scrollDown = true;
      } else {
        this.scrollDown = false;
      }
    });
  },
  methods: {
    moveTop() {
      window.scrollTo(0, 0);
      this.scrollDown = false;
    },
  },
};
</script>
