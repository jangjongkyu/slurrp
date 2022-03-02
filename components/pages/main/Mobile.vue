<template>
  <section>
    <tab-menu />
    <nuxt-child />
  </section>
</template>

<script>
import TabMenu from "@/components/main/mobile/TabMenu";

export default {
  components: { TabMenu },
};
</script>
