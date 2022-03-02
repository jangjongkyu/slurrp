<template>
  <div class="filter_wrap" :class="{mgt0: pageName && pageName === 'searchResult'}">
    <div class="filter_top">
      <h5>필터 <button type="button" @click.stop="clearFilter()">초기화</button></h5>
    </div>

    <div class="filter_price" v-if="categories.length > 0">
      <div class="filter_title">카테고리</div>
      <ul>
        <li
          v-for="c1 in $store.state.category.categories.filter(clsf => clsf.dispLvl === 1)"
          :key="`${c1.dispClsfNo}`"
          v-if="isCategoryEnabled(c1.dispClsfNo)"
        >
          <div class="input_common">
            <label class="checkbox_square_wrap">
              <input
                type="checkbox"
                :class="{ true: 'checked' }[isCategoryChecked(c1.dispClsfNo)]"
                @click.prevent="toggleCategoryFilter(c1)"
              />
              <i class="check_icon"></i>
              {{ c1.dispClsfNm }}
            </label>
          </div>
          <div class="mgl20" v-if="c1.subDispCateList">
            <div
              class="input_common"
              v-for="c2 in c1.subDispCateList"
              :key="`${c1.dispClsfNo},${c2.dispClsfNo}`"
              v-if="isCategoryEnabled(c2.dispClsfNo)"
            >
              <label class="checkbox_square_wrap">
                <input
                  type="checkbox"
                  :class="{ true: 'checked' }[isCategoryChecked(c2.dispClsfNo)]"
                  @click.prevent="toggleCategoryFilter(c2)"
                />
                <i class="check_icon"></i>
                {{ c2.dispClsfNm }}
              </label>
              <div class="mgl20" v-if="c2.subDispCateList">
                <div
                  class="input_common"
                  v-for="c3 in c2.subDispCateList"
                  :key="`${c1.dispClsfNo},${c2.dispClsfNo},${c3.dispClsfNo}`"
                  v-if="isCategoryEnabled(c3.dispClsfNo)"
                >
                  <label class="checkbox_square_wrap">
                    <input
                      type="checkbox"
                      :class="{ true: 'checked' }[isCategoryChecked(c3.dispClsfNo)]"
                      @click.prevent="toggleCategoryFilter(c3)"
                    />
                    <i class="check_icon"></i>
                    {{ c3.dispClsfNm }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="filter_price">
      <div class="filter_title">
        가격
        <!-- <span class="txt_s">(30,000 ~ 40,0000)</span> -->
      </div>
      <div class="dp_flex">
        <div class="input_common">
          <input
            placeholder="0원"
            type="number"
            class="filter_search"
            min="0"
            max="999999"
            v-model="filter.minAmt"
            @click="onAmtInput()"
          />
        </div>
        <div class="wave">~</div>
        <div class="input_common">
          <input
            placeholder="999,999원"
            type="number"
            class="filter_search"
            min="0"
            max="999999"
            v-model="filter.maxAmt"
            @click="onAmtInput()"
          />
        </div>
      </div>
      <ul>
        <li
          v-for="(amt, i) in searchAmt"
          :key="`amt_${i}`"
        >
          <div class="input_common">
            <label class="checkbox_wrap">
              <input
                type="radio"
                name="price-item"
                v-model="filter.amt"
                :value="amt.dtlCd"
                @change="onAmtChanged()"
              />
              <i class="check_icon"></i>
              {{ amt.dtlShtNm }}
            </label>
          </div>
        </li>
      </ul>
      <div class="ta_c">
        <button
          type="button"
          class="bt_white_m mgt10"
          @click="filter.amt = filter.minAmt = filter.maxAmt = undefined"
        >
          가격대 초기화
        </button>
      </div>
    </div>

    <div class="filter_color" v-if="colors.length > 0">
      <div class="filter_title">색상<span class="txt_s">({{ formatCnt(colors.length) }})</span></div>
      <ul>
        <li
          v-for="(color, i) in goodsRgb"
          :key="`color-${i}`"
          v-if="isColorEnabled(color.attrVal)"
        >
          <label>
            <input type="checkbox" v-model="filter.color" :value="color.attrVal" />
            <div :style="`background-color:${color.rgbVal}`"></div>
          </label>
        </li>
      </ul>
    </div>

    <div class="filter_bagic" v-if="sizes.length > 0">
      <div class="filter_title">사이즈<span class="txt_s">({{ formatCnt(sizes.length) }})</span></div>
      <template v-for="(size, i) in sizeFilterGroup" v-if="getValidSizeList(size.dtlCd).length > 0">
        <!-- 이거 없애고 싶으면 사이즈 필터 수집 부터 데이터 레이어 까지 다 고쳐야함 -->
        <div class="filter_st" :key="`size-tit-${i}`">{{ size.dtlNm }}</div>
        <ul class="filter_input" :key="`size-cont-${i}`">
          <li
            v-for="(sizeTxt, i) in getValidSizeList(size.dtlCd)"
            :key="`size-txt-${i}`"
          >
            <label>
              <input
                type="checkbox"
                v-model="sizeChecked"
                :value="`${size.dtlCd}@@${sizeTxt}`"
                @change="toggleSize(size.dtlCd, sizeTxt)"
              />
              <div>{{ sizeTxt }}</div>
            </label>
          </li>
        </ul>
      </template>
    </div>

    <div class="filter_bagic" v-if="materials.length > 0">
      <div class="filter_title">소재<span class="txt_s">({{ formatCnt(materials.length) }})</span></div>
      <ul class="filter_input">
        <li
          v-for="(material, i) in materials"
          :key="`material-${i}`"
        >
          <label>
            <input
              type="checkbox"
              v-model="filter.material"
              :value="material"
            />
            <div>{{ material }}</div>
          </label>
        </li>
      </ul>
    </div>

    <div class="filter_price">
      <div class="filter_title">
        할인율
      </div>
      <div class="dp_flex">
        <div class="input_common">
          <input
            placeholder="0%"
            type="number"
            class="filter_search"
            min="0"
            max="100"
            v-model="filter.minDcRate"
            @input="onDcRateInput()"
          />
        </div>
        <div class="wave">~</div>
        <div class="input_common">
          <input
            placeholder="0%"
            type="number"
            class="filter_search"
            min="0"
            max="100"
            v-model="filter.maxDcRate"
            @input="onDcRateInput()"
          />
        </div>
      </div>
      <ul>
        <li
          v-for="(discount, i) in searchDc"
          :key="`discount_${i}`"
        >
          <div class="input_common">
            <label class="checkbox_wrap">
              <input
                type="radio"
                name="discount-item"
                v-model="filter.dcRate"
                :value="discount.dtlCd"
                @change="onDcRateChanged()"
              />
              <i class="check_icon"></i>
              {{ discount.dtlShtNm }}
            </label>
          </div>
        </li>
      </ul>
    </div>

    <div class="dp_flex mgt30">
      <button type="button" class="bt_white w100 mgr20" @click.stop="clearAndApplyFilter()">전체초기화</button>
      <button type="button" class="bt_black w100" @click.stop="applyFilter()">적용</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterSet: {
      type: Object,
      default: undefined
    },
    categories: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => []
    },
    sizes: {
      type: Array,
      default: () => []
    },
    materials: {
      type: Array,
      default: () => []
    },
    goodsRgb: {
      type: Array,
      default: () => []
    },
    searchAmt: {
      type: Array,
      default: () => []
    },
    searchDc: {
      type: Array,
      default: () => []
    },
    sizeFilterGroup: {
      type: Array,
      default: () => []
    },
    pageName: {
      type: String,
      default: "",
    }
  },

  data: () => ({
    filter: {
      category: [],
      color: [],
      size: [],
      material: [],
      amt: undefined,
      minAmt: undefined,
      maxAmt: undefined,
      dcRate: undefined,
      minDcRate: undefined,
      maxDcRate: undefined
    },
    sizeMap: {},
    sizeChecked: []
  }),

  methods: {
    isCategoryEnabled(dispClsfNo) {
      try {
        let result = this.categories.filter(item => item.split(",").indexOf(String(dispClsfNo)) >= 0);
        return result.length > 0;
      } catch (e) {
        return false;
      }
    },

    isCategoryChecked(dispClsfNo) {
      try {
        let result = this.filter.category.filter(item => item.split(",").indexOf(String(dispClsfNo)) >= 0);
        return result.length > 0;
      } catch (e) {
        return false;
      }
    },

    toggleCategoryFilter(category) {
      try {
        if (!category.subDispCateList) {
          let hierarchy = [];
          let c = category;
          while (c) {
            hierarchy.unshift(c);
            c = c.parent;
          }
          let base = hierarchy.map(x => x.dispClsfNo).join(",");

          let index = this.filter.category.indexOf(base);
          if (index >= 0) {
            this.filter.category.splice(index, 1);
          } else {
            this.filter.category.push(base);
          }
        } else {
          let selections = _getSubDispClsfNo(category, [], this.isCategoryEnabled);
          let selected = this.filter.category.filter(item => item.split(",").indexOf(String(category.dispClsfNo)) >= 0);
          if (selections.length == selected.length) {
            selected.forEach(s => this.filter.category.splice(this.filter.category.indexOf(s), 1));
          } else {
            this.filter.category.push.apply(this.filter.category, selections);
          }
        }
      } catch (e) {
        // Error
      }
      this.filter.category = this.filter.category.filter((node, index) => this.filter.category.indexOf(node) === index);
      this.$forceUpdate();
    },

    isColorEnabled(value) {
      return this.colors.indexOf(String(value).toUpperCase()) >= 0;
    },

    getValidSizeList(codes) {
      let c = codes.split(",");
      this.sizeMap[codes] = this.sizeMap[codes] || this.sizes.map(x => x.split(">>")).filter(x => c.indexOf(x[0]) >= 0).map(x => x[1]);
      this.sizeMap[codes] = this.sizeMap[codes].filter((value, index) => this.sizeMap[codes].indexOf(value) === index);
      this.sizeMap[codes] = this.sizeMap[codes].sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      // console.log("Valid size map", codes, this.sizeMap[codes]);
      return this.sizeMap[codes];
    },

    toggleSize(codes, value) {
      let dataList = String(codes || "").split(",").map(x => `${x}>>${value}`) || [];
      dataList = dataList.filter(x => this.sizes.indexOf(x) >= 0);
      if (this.sizeChecked.indexOf(`${codes}@@${value}`) >= 0) {
        this.filter.size.push.apply(this.filter.size, dataList);
      } else {
        dataList.forEach(x => this.filter.size.splice(this.filter.size.indexOf(x), 1));
      }
    },

    onAmtInput() {
      this.filter.amt = undefined;
    },

    onAmtChanged() {
      this.filter.minAmt = undefined;
      this.filter.maxAmt = undefined;
    },

    onDcRateInput() {
      this.filter.dcRate = undefined;
    },

    onDcRateChanged() {
      this.filter.minDcRate = undefined;
      this.filter.maxDcRate = undefined;
    },

    clearFilter() {
      this.filter = {
        category: [],
        color: [],
        size: [],
        material: [],
        amt: undefined,
        minAmt: undefined,
        maxAmt: undefined,
        dcRate: undefined,
        minDcRate: undefined,
        maxDcRate: undefined
      };
      this.sizeChecked = [];
    },

    clearAndApplyFilter() {
      this.clearFilter();
      this.$emit("applyFilter", this.filter);
    },

    applyFilter() {
      this.$emit("applyFilter", this.filter);
    }
  },

  watch: {
    "filterSet": {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.filter = _.cloneDeep(value);

          this.sizeMap = {};
          this.sizeChecked = [];

          this.sizeFilterGroup.forEach(size => {
            this.getValidSizeList(size.dtlCd).forEach(sizeTxt => {
              let dataList = String(size.dtlCd || "").split(",").map(x => `${x}>>${sizeTxt}`) || [];
              dataList = dataList
                .filter(x => this.filter.size.indexOf(x) >= 0);
              if (dataList.length > 0) {
                this.sizeChecked.push(`${size.dtlCd}@@${sizeTxt}`);
              }
            });
          });
        }
      }
    }
  }
};

function _getSubDispClsfNo(c, array, isCategoryEnabled) {
  array = array || [];
  if (!c.subDispCateList) {
    let p = c, hierarchy = [];
    while (p) {
      hierarchy.unshift(p);
      p = p.parent;
    }
    array.push(hierarchy.map(x => x.dispClsfNo).join(","));
    return array;
  } else {
    c.subDispCateList.filter(node => isCategoryEnabled(node.dispClsfNo)).forEach(node => array.push.apply(array, _getSubDispClsfNo(node)));
    return array;
  }
}
</script>
