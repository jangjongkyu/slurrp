<template>
  <section>
    <!-- 타이틀 -->
    <div class="box">
      <div class="mar_set">
        <h4 class="title_1st">매장소개</h4>
        <div class="foot_line_title">
          <div class="fl mgt20">매장 검색 결과(총 <b>{{page.totalItems}}</b>건)</div>
          <div class="fr">
            <div class="fl mgt20">지역</div>
            <select required class="input_common bd_1 w300 mgl15 fl" v-model="strAreaCd" @change="getStoreList()">
              <option value="all">전체</option>
              <option v-for="(item, index) in storeCode" :key="index" :value="item.dtlCd">{{item.dtlNm}}</option>
            </select>
            <div class="fl mgl15 mgt20">매장</div>
            <select required class="input_common bd_1 w300 mgl15 fl" v-model="strGbCd" @change="getStoreList()">
              <option value="all">전체</option>
                <option v-for="(item, index) in typeCode" :key="index" :value="item.dtlCd">{{item.dtlNm}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!--// 타이틀 -->

    <div class="box">
      <div class="mar_set">
        <div class="store_list_wrap">
          <div v-for="(store, i) in page.contents" :key="`store-${i}`" class="store_list">
            <div class="store_list_con fl">
              <div class="title">{{ store.name }}</div>
              <div class="tel">{{ telFomatter(store.tel) }}</div>
              <div class="add">
                {{ store.address }} {{ store.addressDetail }}
              </div>
            </div>
            <button type="button" class="bt_white_m fr mgt30" @click="openMapModal(store)">매장위치</button>
          </div>
        </div>
      </div>
    </div>

    <div class="paging mgt20">
      <pagination :total-pages="page.totalPages" v-model="pagination" @input="getStoreList()" />
    </div>
  </section>
</template>

<script>
  import Pagination from "@/components/commons/Pagination";

  export default {
    components: {
      Pagination,
    },

    data: () => ({
      page: {
        page: 1,
        itemsPerPage: 5,
        totalItems: 0,
        totalPages: 1,
        contents: [],
      },
      pagination: {
        page: 1,
      },
      strAreaCd: 'all',
      strGbCd: 'all',

      storeCode: [],
      typeCode: [],
    }),

    async mounted() {
      await this.getStoreList();
      await this.getStoreCode();
      await this.getTypeCode();
    },

    methods: {
      openMapModal(store) {
        this.$modal.markerMap(store);
      },
      async getStoreList() {
        await this.$axios.get("/api/store", {
          params: {
            page: this.pagination.page,
            areaCd: this.strAreaCd === 'all' ? undefined : this.strAreaCd,
            typeCd: this.strGbCd === 'all' ? undefined : this.strGbCd
          }
        }).then((result) => {
          return this.page = result.data;
        });
      },

      async getStoreCode() {
        await this.$axios.get("/api/code", {
          params: {
            grpCd: 'STR_AREA',
          }
        }).then((result) => {
          return this.storeCode = result.data;
        });
      },

      async getTypeCode() {
        await this.$axios.get("/api/code", {
          params: {
            grpCd: 'STR_GB',
          }
        }).then((result) => {
          return this.typeCode = result.data;
        });
      },

      telFomatter(num) {
        if (num != undefined) {
          var formatNum = "";
          if (num.length === 11) {
            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
          } else if (num.length === 8) {
            formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
          } else if (num.length === 9) {
            formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
          } else {
            if (num.indexOf("02") === 0) {
              formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
            } else {
              formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            }
          }
          return formatNum;
        }
      }


    }

  };

</script>
