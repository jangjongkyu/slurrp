<template>
  <video
    width="100%"
    height="360"
    controls
    preload="metadata"
    ref="videoPlayer"
  >
    <source :src="getUrl(videoUrl)" type="video/mp4" ref="videoSource" />
  </video>
</template>

<script>
import formatter from "assets/mixins/formatter";

export default {
  name: "AdFilmVideoPlayer",
  mixins: [formatter],
  props: {
    videoUrl: String,
  },
  watch: {
    videoUrl(nv) {
      this.$refs.videoPlayer.pause();
      this.$refs.videoSource.setAttribute("src", nv);
      this.$refs.videoPlayer.load();
    }
  }
};
</script>
