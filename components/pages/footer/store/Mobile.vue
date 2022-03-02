<template>
  <section>
    <div class="sel_common promotion dp_flex">
      <select class="mgr10" v-model="strAreaCd" @change="storeSearch()">
        <option value="all">지역</option>
        <option v-for="(item, index) in storeCode" :key="index" :value="item.dtlCd">{{item.dtlNm}}</option>
      </select>
      <select v-model="strGbCd" @change="storeSearch()">
        <option value="all">매장</option>
          <option v-for="(item, index) in typeCode" :key="index" :value="item.dtlCd">{{item.dtlShtNm}}</option>
      </select>
    </div>
    <div class="result_wrap mgt0">
      <!-- 검색결과 건수 -->
      <span>매장 검색 결과 총 <span>{{page.totalItems}}</span>건</span>
    </div>
    <div class="mar_set">
      <!-- 매장리스트 -->
      <div class="store_list_wrap">
        <!-- 배열 -->
        <div v-for="(store, i) in list" :key="`store-${i}`" class="store_list">
          <div class="store_list_con fl">
            <div class="title">{{ store.name }}</div>
            <div class="call">
              <a href="tel:000-000-000">{{ telFomatter(store.tel) }}</a>
            </div>
            <div>{{ store.address }} {{ store.addressDetail }}</div>
            <div class="store_btn">
              <button type="button" class="bt_white_xs" @click="openMapModal(store)">매장위치</button>
            </div>
          </div>
        </div>
        <!--// 배열 -->
      </div>
      <!-- //매장리스트 -->
    </div>
    <div class="tc" v-if="pagination.page < page.totalPages">
      <button type="button" class="bt_more" @click.stop="listMore()">
        더보기
      </button>
    </div>
  </section>
</template>

<script>
  import Desktop from "./Desktop";

  export default {
    extends: Desktop,

    data: () => ({
      list: [],
    }),

    methods: {
      async getStoreList() {
        let page = await this.$axios.$get("/api/store", {
          params: {
            page: this.pagination.page || 1,
            areaCd: this.strAreaCd === 'all' ? undefined : this.strAreaCd,
            typeCd: this.strGbCd === 'all' ? undefined : this.strGbCd
          }
        });

        this.page = page;
        this.list = this.list.concat(page.contents);
      },

      async listMore() {
        let page = this.pagination.page;
        page++;
        if (page <= this.page.totalPages) {
          this.pagination.page = page;
          await this.getStoreList();
        }
      },

      async storeSearch() {
        this.pagination.page = 1;
        this.list = [];
        return this.getStoreList();
      },
    }
  };
</script>
