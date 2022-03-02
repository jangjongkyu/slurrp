<template>
  <div class="popup_layer" style="max-height: 510px; top: 54% !important">
    <div class="popup_header">
      <button type="button" class="bt_closepop" @click.stop="$emit('close')">
        닫기
      </button>
    </div>
    <div class="popup_contents" style="width: 100%; padding-bottom: 20px">
      <div class="store_list bdn">
        <div class="store_list_con">
          <div class="title">{{ store.name }}</div>
          <div class="call">
            <a :href="`tel:${store.tel}`">{{ store.tel | tel }}</a>
          </div>
          <div>{{ store.address }} {{ store.addressDetail }}</div>
        </div>
      </div>
      <div ref="daum-map" style="width: 100%; height: 340px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DaumMap.vue",
  props: {
    store: {
      type: Object,
    },
  },

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.$env.kakaoApiKey}&libraries=services`;
      document.head.appendChild(script);
    }

    // this.$loadScript(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${this.$env.kakaoApiKey}&libraries=services`).then(() => {
    //   kakao.maps.load();
    // });
  },

  methods: {
    initMap() {
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3,
        draggable: false,
        scrollwheel: false,
        disableDoubleClick: false,
        disableDoubleClickZoom: false,
      };

      // 지도를 생성합니다
      const map = new kakao.maps.Map(this.$refs["daum-map"], mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(this.store.address, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          let marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          let infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${this.store.name}</div>`,
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    }
  }
};
</script>

<style scoped></style>
