<template>
    <!-- Container -->
    <main class="contents">
      <nuxt :key="$pageUtil.getKey()"/>
    </main>
    <!-- Container -->
</template>

<script>

export default {
  head: () => ({
    link: [
      {
        rel: 'stylesheet',
        href: '/web/css/common.css',
      },
    ],
    script: [
      {
        type: 'text/javascript',
        src: process.env.KCP_JS_URL,
      },
      /*
      {
        type: 'text/javascript',
        src: '//t1.daumcdn.net/adfit/static/kp.js'
      }
      */
    ],
  }),

};
</script>
