<template>
  <div class="gnb_wrap sticky">
    <div class="gnb_tab_area main">
      <div class="gnb_tab clear">
        <div><nuxt-link to="/main/today" active-class="on">Canvas</nuxt-link></div>
        <div><nuxt-link to="/main/best" active-class="on">Best</nuxt-link></div>
        <div><nuxt-link to="/main/event" active-class="on">Event</nuxt-link></div>
        <div><nuxt-link to="/main/community" active-class="on">Community</nuxt-link></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabMenu",
};
</script>
