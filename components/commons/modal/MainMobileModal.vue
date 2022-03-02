<template>
  <!--<div class="popup_layer main">
    <div class="popup_header">
      <button type="button" class="bt_closepop" @click.stop="$emit('close')">닫기</button>
    </div>
    <div class="popup_contents">
      <div class="main_html" v-html-custom="html">
      </div>
    </div>
    <div class="btn">
      <button type="button" class="bt_white_xs" @click.stop="closeAndDisablePopup()">오늘 하루 보지 않기</button>
    </div>
  </div>-->

<div class="lyrBg_dim" id="lyrBg_dim_lyr_notice" style="z-index: 1050;">
<div class="layer_dim is-layer" style="display: block; height: 430px; top: 191px; z-index: 1100;">	
	<div class="layer_box noticeBn">
    	<div>
			<div class="bnr" id="noticeBn">
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
            <div class="ntcBtn">
                <a href="#" @click.stop="closeAndDisablePopup()" class="nomore">오늘 하루 보지 않기</a>
		            <a href="#" @click.stop="$emit('close')" class="close">닫기</a>
            </div>
		</div>
	</div>
</div>
</div>
</template>

<script>
export default {
  props: {
    html: String,
    popupList: Array
  },

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
  }),

  methods: {
    closeAndDisablePopup() {
      this.$attrs.disablePopup();
      this.$emit("close");
    }
  }
}
</script>
<style lang="scss" scoped>
/*.popup_layer {
  width: inherit;
  .popup_contents {
    padding: 0 20px 20px;
    max-height: 500px;
    overflow-y: auto;

    /deep/ img {
      max-width: 100%;
    }
  }
  .btn {
    padding: 0 20px 20px;
  }
  img {
    max-width: 100%;
  }
}*/
.noticeBn{width: inherit; height:390px;}
.noticeBn .bnr{overflow:hidden;position:relative;height:390px;}
.noticeBn .bnr a{display:block;}
.noticeBn .bnr img{width:100%;height:390px;vertical-align:top;}
.noticeBn .bnr {
  &::v-deep img {
    width:100%;height:390px;vertical-align:top;
  }
}
.noticeBn .swiperCtr a{display:block;position:absolute;top:185px;width:11px;height:21px;border:none;padding:0;overflow:hidden;background:transparent;text-indent:100%;z-index:10;}
.noticeBn .swiperCtr a:after{content:"";display:block;position:absolute;width:30px;height:30px;-webkit-transform:rotate(45deg);transform:rotate(45deg);border:1px solid #a5a9b4;}
.noticeBn .swiperPg{position:absolute;bottom:0;width:100%;height:6px;padding-bottom:15px;text-align:center;}
.noticeBn .swiperPg span{display:inline-block;overflow:hidden;height:6px;vertical-align:top;}
.noticeBn .swiperPg a{display:block;float:left;margin:0 3px;width:6px;height:6px;border:none;padding:0;border-radius:50% 50%;background-color:#fff;text-indent:100%;vertical-align:top;opacity:.5;overflow:hidden;}
.noticeBn .swiperPg .swiper-active-switch{opacity:1;}
.noticeBn .ntcBtn{overflow:hidden;}
.noticeBn .ntcBtn a{display:block;float:left;width:50%;height:40px;font-size:13px;line-height:40px;color:#fff;text-align:center;}
.noticeBn .ntcBtn .nomore{background:#333;}
.noticeBn .ntcBtn .close{background:#000;}
</style>
