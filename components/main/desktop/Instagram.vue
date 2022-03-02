<template>
  <div class="main_st" v-if="feeds && feeds.length > 0">
    <h4 class="main_st_title">
        
        @niceclaupkorea <span class="fa_l">나이스클랍의 최신 소식을 인스타그램에서 만나보세요</span>

        <a href="https://www.instagram.com/niceclaupkorea/" class="bt_arr3">
        더보기
        </a>
      
    </h4>
    <!--goods-list :goods-list="goodsList"/-->

    <client-only>
      <swiper :options="instaSwiperOptions" class="item_list n5  main_insta">
          <swiper-slide
            v-for="(content, i) in feeds"
            :key="`img-${i}`"
          >

            <a class="insta_link" :href="content.permalink" target="_blank" ref="insta_video">
              <video 
                style="width: 100%; height: 100%; object-fit: cover;" 
                muted 
                loop 
                @mouseover="startVideo(i)"
                @mouseleave="stopVideo(i)"
                v-if="content.media_type === 'VIDEO'">
                <source :src="content.media_url" type="video/mp4">
              </video>
              <div style="width: 100%; height: 100%" :style="{background: 'url(' + content.media_url +') no-repeat center', 'background-size': 'cover'}" v-else></div>
            </a>

          </swiper-slide>
      </swiper>
    </client-only>
    <div class="swiper-button-next insta">
        <img src="/web/images/icon_arr_right.png" alt="다음">
    </div>
    <div class="swiper-button-prev insta">
      <img src="/web/images/icon_arr_left.png" alt="이전">
    </div>
    
    <!--div class="swiper main_insta">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="background:url('https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/262253515_851485245547776_9093132752367319771_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=veuj2giTivQAX9S4vHl&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=9ef388291d34754e566d18211891acd6&oe=61AEEFFF') no-repeat center;background-size:cover"></div>
        <div class="swiper-slide" style="background:url('https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/262738239_1040317906823213_8975985648161199869_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=vLWVFyEfkDMAX8DWP5S&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=61d08578308a9b7a413b5376fe640eb7&oe=61AEFB78') no-repeat center;background-size:cover"></div>
        <div class="swiper-slide" style="background:url('https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/263073015_620232285689239_4571470629547350801_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=RTIrK7GVHIgAX9z6skV&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=d490d38915a3d362ed59461a57558ce9&oe=61AF0E2C') no-repeat center;background-size:cover"></div>
        <div class="swiper-slide" style="background:url('https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/262232528_903228683888454_7517516249406686782_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=p3EM4O5VOUsAX985Vhx&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=47102099b2f626f4cf99bfea028d9757&oe=61AE4387') no-repeat center;background-size:cover"></div>
        <div class="swiper-slide" style="background:url('https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/262548159_695493358079201_923900042392241759_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=-PgQbh18iNIAX9FvLjE&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=c0d35b62225e7fcf4cfe4562b280b0c9&oe=61AD8E09') no-repeat center;background-size:cover"></div>
        <div class="swiper-slide" style="background:url('https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/261756407_3114264485520086_8506507444661925486_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=pnsZqu2APLIAX-LZ1Ws&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=e79a43a95125804b1ee5cb9a90cf3c63&oe=61AE8C2D') no-repeat center;background-size:cover"></div>
      </div>
    
      <div class="swiper-pagination"></div>
    </div>
    <div class="swiper-button-next insta"></div>
    <div class="swiper-button-prev insta"></div-->
    <!-- Swiper JS -->
    <!--script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script-->


  </div>
</template>

<script>
export default {
  async fetch() {
    //await this.fetchGoodsList();
  },
  props: {
    category: {
      type: Object,
      default: () => []
    },

  },
  data() {
    return{
      instagramContents: {},

      instaSwiperOptions : {
        slidesPerView: 4,
        spaceBetween: 4,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        /*
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        */
        navigation: {
          nextEl: ".swiper-button-next.insta",
          prevEl: ".swiper-button-prev.insta",
        },
      },

      latestImage: {},
      feeds: [],
      paging: {},
      isCalledFeed: false,

    }
  },

  async mounted() {
    if(!this.$device.isMobile) {
      await this.fetchGoodsList();
    }
  },

  methods: {
    async fetchGoodsList() {
      //alert("etchGoodsList()");
      try { 
        if(this.feeds.length > 0){
          return;
        }
        if(this.isCalledFeed){
          return;
        }
        this.isCalledFeed = true;
      } catch (e) {}

      let retryCnt = 0;
      let contents;
      try {
        if (!this.$env.instaAccessToken) {
          return;
        }
        
      } catch (e) {
        return;
      }
      while (retryCnt < 1 && !contents) {
        try {
          /*
          let {id} = await this.$axios.$get('/graph-instagram/me', {
            params: {
              access_token: this.$env.instaAccessToken,
              fields: ['id'],
            },
          });
          */
          let id = this.$env.INSTA_ACCESS_ID
          contents = await this.$axios.$get(`https://graph.instagram.com/${id}/media`, {
            params: {
              access_token: this.$env.instaAccessToken,
              fields: 'id,username,timestamp,media_url,media_type,permalink,caption',
            },
          });
        } catch (e) {
          retryCnt++;
          //alert("catch!");
          //alert(e.message);

        }
      }
      //alert("retryCnt : " + retryCnt);
      //alert(contents);
      if(contents && this.feeds.length == 0) {
        this.instagramContents = contents;
        if(contents.data && contents.data.length > 0){
          for(var i = 0 ; i < contents.data.length ; i++){
            if(this.$device.isMobile && i >= 9) break;
            
            this.feeds.push(contents.data[i]);
          }
        }
        this.paging = contents.paging;
        this.latestImage = this.instagramContents.data[0] || {};
      }
    },

    startVideo(index) {
      try {
        let videos = this.$refs.insta_video[index].getElementsByTagName("video");
        videos[0].play();
      } catch (e) {
      }
    },

    stopVideo(index) {
      try {
        let videos = this.$refs.insta_video[index].getElementsByTagName('video');
        videos[0].pause();
      } catch (e) {
      }
    },

  },

};
</script>


<style lang="scss" scoped>
.cm_insta_title .cm_insta_title_img video {
  width: 100%;
  min-height: 400px;
  object-fit: cover;
}
.cm_insta_list {
  li {
    &::after {
      display: table;
      content: " ";
      clear: both;
    }

    .insta_link {
      display: block;
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;

      img, video {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
        width: 100%;
        height: 345px;
      }
    }
  }
}
</style>