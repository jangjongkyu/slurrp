<template>
  <div class="noticeBn" id="noticeBtn">
	<div class="bnr" id="noticeBn" style="background: white;">
  <swiper :options="popupList.length == 1 ? swiperOptions2 : swiperOptions">
                <swiper-slide
                  v-for="(popups, index) in popupList"
                  :key="`popups_${index}`"
                >
                    <ul class="swiper-wrapper">
                      <li class="swiper-slide">
                        <p v-html-custom="popups.content"></p>
                      </li>
                    </ul>
                </swiper-slide>
  </swiper>
	</div>
	<div class="btn">
		<a href="#" @click.close="closeAndDisablePopup()" class="nomore">오늘 하루 보지 않기</a>
		<a href="#" @click.close="closePopup()" class="close">닫기</a>
	</div>
</div>
</template>

<script>
export default {
  data: () => ({
    swiperOptions: {
      direction: 'horizontal',
      slidesPerView: 1,
      loop: true,
      speed : 1000,
      autoHeight: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    },
    swiperOptions2: {
      direction: 'horizontal',
      slidesPerView: 1,
      loop: false,
      speed : 1000,
      autoHeight: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    },
    popups: []
  }),

  props: {
    html: String,
    popupList: Array
  },

  methods: {
    closeAndDisablePopup() {
      //this.$attrs.disablePopup();
      this.$emit("disablePopup");
      this.$emit("closePopup");
      //this.$emit("close");
    },
    closePopup(){
      this.$emit("closePopup");
      //this.$emit("close");
    }
  }
}
</script>

<style lang="scss" scoped>
.noticeBn {
  position: fixed;
  width: 350px;
  height: 495px;
  top: 50px;
  left: 50px;
  z-index: 1000
}

.noticeBn .bnr {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}

.noticeBn .bnr a {
  display: block;
}

.noticeBn .bnr img {
  width: 100%;
  height: auto;
}

.noticeBn .bnr .swiperPg {
  display: none;
  position: absolute;
  bottom: 20px;
  left: 0;
  z-index: 2;
  width: 100%;
  text-align: center;
}

.noticeBn .bnr .swiperPg span {
  display: inline-block;
}

//.noticeBn .bnr .swiperPg a{display:block;float:left;width:10px;height:10px;margin: 0 5px;background:url('../images/common/controls.png') no-repeat -86px -73px;opacity:0.5;text-indent:-9999px;}
.noticeBn .bnr .swiperPg .swiper-active-switch {
  opacity: 1;
}

.noticeBn .bnr .swiperCtr {
  display: none;
}

.noticeBn .bnr .swiperCtr a {
  display: block;
  position: absolute;
  z-index: 2;
  top: 50%;
  width: 37px;
  height: 37px;
  margin-top: -19px;
  background: none;
  background-color: #d1d4da;
  opacity: 0;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
}

//.noticeBn .bnr .swiperCtr a:after{content:"";display:block;overflow:hidden;position:absolute;top:10px;width:9px;height:17px;background-image:url('../images/common/spr_btn.png')}
.noticeBn .bnr:hover .swiperCtr a {
  opacity: 1;
}

.noticeBn .btn {
  overflow: hidden;
}

.noticeBn .btn a {
  display: block;
  float: left;
  //width: 175px;
  width: 50%;
  height: 40px;
  font-size: 13px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
}

.noticeBn .btn .nomore {
  background: #333;
}

.noticeBn .btn .close {
  background: #000;
}

.noticeBn .bnr.ready .swiperPg, .noticeBn .bnr.ready .swiperCtr {
  display: block;
}
</style>
