<template>
  <div class="popup_layer sns">
    <!-- sns 공유 -->
    <div class="popup_header">
      <h5 class="title_pop">공유하기</h5>
      <button type="button" class="bt_closepop" @click.stop="$emit('close')">닫기</button>
    </div>
    <div class="popup_contents">
      <div class="sns_wrap">
        <a class="sns_box kakaotalk link" @click.prevent="shareWithKakaoTalk(shareUrl)">Kakao Talk</a>
        <a class="sns_box facebook link" @click.prevent="shareWithFacebook(shareUrl)">Facebook</a>
        <a class="sns_box pinterest link" @click.prevent="shareWithPinterest(shareUrl, shareTitle, shareImageUrl)">Pinterest</a>
        <a class="sns_box twitter link" @click.prevent="shareWithTwitter(shareUrl, shareTitle)">Twitter</a>
        <a class="sns_box url" @click.prevent="copyToClipboard(shareUrl)">URL 복사</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shareUrl: String,
    shareTitle: String,
    shareImageUrl: String
  },

  methods: {
    shareWithKakaoTalk(shareUrl) {
      try {
        Kakao.Link.sendScrap({
          requestUrl: shareUrl
        });
        this.$emit("close");
      } catch (e) {
        this.$modal.error("카카오톡 공유에 실패하였습니다.");
      }
    },
    shareWithFacebook(shareUrl) {
      if (this.$store.state.layout.isApp) {
        try {
          window.skyDroidIF.shareSns({
            type: "FACEBOOK",
            shareUrl: shareUrl,
            shareTitle: null,
            shareImageUrl: null
          });
        } catch (e) {
          this.$modal.error("페이스북 공유에 실패하였습니다.");
        } finally {
          this.$emit("close");
        }
      } else {
        window.open("https://www.facebook.com/sharer/sharer.php" +
          "?u=" + shareUrl);
        this.$emit("close");
      }
    },
    shareWithPinterest(shareUrl, shareTitle, shareImageUrl, retry) {
      this.$loadScript("//assets.pinterest.com/js/pinit.js")
        .then(() => {
          try {
            PinUtils.pinOne({
              url: shareUrl,
              media: this.getImageUrl(shareImageUrl),
              description: shareTitle
            });
          } catch (e) {
            if (retry) {
              this.$modal.error("핀터레스트 공유에 실패하였습니다.");
            } else {
              setTimeout(() => this.shareWithPinterest(shareUrl, shareTitle, shareImageUrl, true), 200);
            }
          } finally {
            this.$emit("close");
          }
        });
    },
    shareWithTwitter(shareUrl, shareTitle) {
      window.open("https://twitter.com/intent/tweet?" +
        "&text=" + encodeURIComponent(shareTitle) +
        "&url=" + encodeURIComponent(shareUrl));
      this.$emit("close");
    },
    copyToClipboard(shareUrl) {
      let t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = shareUrl;
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);

      this.$modal.success("URL이 클립보드에 복사되었습니다.").then(() => this.$emit("close"));
    }
  }
}
</script>
