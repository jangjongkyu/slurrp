<template>
  <div v-bind:id="`main_todayinsta_wrap`">

    <div class="main_todayinsta_wrap" v-if="feeds && feeds.length > 0">
      <!-- 비로그인 -->
      <h4 class="title_main inner hot">
        @niceclaupkorea
        <a href="https://www.instagram.com/niceclaupkorea/" class="bt_arr2 w0 mgt5">
        더보기
        </a>

        <br />
        <span>나이스클랍의 최신 소식을 인스타그램에서 만나보세요</span>
      </h4> 

      <div class="main_insta">
          <ul style="margin-left: 10px; width: calc(100% - 20px);">
              <li
                v-for="(content, i) in feeds"
                :key="`img-${i}`"
                @click="goPage(content.permalink)"
                ref="insta_video"
                :style="{background: 'url(' + content.media_url +') no-repeat center', 'background-size': 'cover'}"
              >
                  <video 
                    style="width: 100%; height: 100%; object-fit: cover;" 
                    muted 
                    loop
                    v-if="content.media_type === 'VIDEO'">
                    <source :src="content.media_url" type="video/mp4">
                  </video>

              </li>
          </ul>
      </div>

    </div>

  </div>
</template>

<script>
import Desktop from '@/components/main/desktop/Instagram';

export default {
  extends: Desktop,

  data(){
    return {
      componentScrollY : undefined
    }
  },

  async fetch() {
    //await this.fetchGoodsList();
    //this.feeds = this.feeds.slice(0, 9);
  },

  async activated() {
    //this.feeds = this.feeds.filter(x => x.media_type != 'VIDEO');
    //this.feeds = this.feeds.slice(0, 9);

    if(!this.isCalledFeed){
      this.$nextTick(function() {

        try{
          if(typeof window != 'undefined') {
            var target = document.getElementById("main_todayinsta_wrap");
            var targetTop = target.getBoundingClientRect().top;
            var componentScrollY = window.pageYOffset + targetTop;
            this.componentScrollY = componentScrollY; 
          }

        } catch (e) {}

      });
      
      if(typeof window != 'undefined') {
        window.addEventListener("scroll", this.onInstagramScrollListener, { passive: true });
      }
    }

  },

  async deactivated() {
    if(typeof window != 'undefined') {
      window.removeEventListener("scroll", this.onInstagramScrollListener);
    }
  },

  props: {
    category: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    goPage(url) {
      try {
        if(typeof window != 'undefined') {
          window.location = url;
        }
      } catch (e) {}
    },

    onInstagramScrollListener() {

      try {
        if(this.feeds.length > 0){
          return;
        }
        if(this.isCalledFeed){
          return;
        }

        if(typeof window != 'undefined' && this.componentScrollY) {
          let distanceCurrentComponent = this.componentScrollY - window.scrollY;
          if(distanceCurrentComponent < 500) {
            this.fetchGoodsList();
          }
        }
      } catch (e) {}

    },

  },
};

</script>
