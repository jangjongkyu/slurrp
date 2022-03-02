<template>
  <div id="wrap">
    <!-- Header -->
    <header class="header_wrap">
      <nav class="header_pop">
        <h2><span>필터</span></h2>
        <button type="button" class="bt_closeall" @click.stop="$emit('close')">닫기</button>
      </nav>
    </header>
    <!--// Header -->
    <!-- Container -->
    <main class="contents">
      <section class="pdb55">
        <div class="board_list_wrap filter">
          <BulmaAccordion
            :dropdown="true"
            :icon="'custom'"
            :slide="{duration: '.3s',timerFunc: 'ease'}"
          >
            <ul class="board_list bdtn">
              <!-- 카테고리 -->
              <li v-if="categories.length > 0">
                <BulmaAccordionItem>
                  <div class="board_header" slot="title">
                    <div class="tit">카테고리 <span>(<em>{{ formatCnt(categories.length) }}</em>)</span></div>
                  </div>
                  <div class="board_detail" slot="content">
                    <div class="filter_category">
                      <ul>
                        <li
                          v-for="c1 in $store.state.category.categories.filter(clsf => clsf.dispLvl === 1)"
                          :key="`${c1.dispClsfNo}`"
                          v-if="isCategoryEnabled(c1.dispClsfNo)"
                        >
                          <div class="input_common mgt0">
                            <label class="checkbox_square_wrap">
                              <input
                                type="checkbox"
                                :class="{ 'checked': isCategoryChecked(c1.dispClsfNo) }"
                                @click.prevent="toggleCategoryFilter(c1)"
                              >
                              <i class="check_icon"></i>
                              {{ c1.dispClsfNm }}
                            </label>
                          </div>
                          <!-- 재킷 하위 -->
                          <div class="filter_3depth" v-if="c1.subDispCateList">
                            <template v-for="c2 in c1.subDispCateList" v-if="isCategoryEnabled(c2.dispClsfNo)">
                              <div
                                class="input_common"
                                :key="`${c1.dispClsfNo},${c2.dispClsfNo}`"
                              >
                                <label class="checkbox_square_wrap">
                                  <input
                                    type="checkbox"
                                    :class="{ 'checked': isCategoryChecked(c2.dispClsfNo) }"
                                    @click.prevent="toggleCategoryFilter(c2)"
                                  />
                                  <i class="check_icon"></i>
                                  {{ c2.dispClsfNm }}
                                </label>
                              </div>

                              <div class="filter_3depth" v-if="c2.subDispCateList">
                                <div
                                  class="input_common"
                                  v-for="c3 in c2.subDispCateList"
                                  :key="`${c1.dispClsfNo},${c2.dispClsfNo},${c3.dispClsfNo}`"
                                  v-if="isCategoryEnabled(c3.dispClsfNo)"
                                >
                                  <label class="checkbox_square_wrap">
                                    <input
                                      type="checkbox"
                                      :class="{ 'checked': isCategoryChecked(c3.dispClsfNo) }"
                                      @click.prevent="toggleCategoryFilter(c3)"
                                    />
                                    <i class="check_icon"></i>
                                    {{ c3.dispClsfNm }}
                                  </label>
                                </div>
                              </div>
                            </template>
                          </div>
                          <!--// 재킷 하위 -->
                        </li>
                      </ul>
                    </div>
                  </div>
                </BulmaAccordionItem>
              </li>

              <!-- 가격 -->
              <li>
                <BulmaAccordionItem>
                  <div class="board_header" slot="title">
                    <div class="tit">
                      가격
                      <!-- <span>(<em>30,000 ~ 40,000</em>)</span> -->
                    </div>
                  </div>
                  <div class="board_detail" slot="content">
                    <div class="filter_num">
                      <div class="input_fromto">
                        <span>
                          <input
                            type="number"
                            placeholder="직접입력"
                            min="0"
                            max="999999"
                            v-model="filter.minAmt"
                            @click="onAmtInput()"
                          />
                          <em>원</em>
                        </span>
                        <span class="wave">~</span>
                        <span>
                          <input
                            type="number"
                            placeholder="직접입력"
                            min="0"
                            max="999999"
                            v-model="filter.maxAmt"
                            @click="onAmtInput()"
                          />
                          <em>원</em>
                        </span>
                      </div>
                      <div>
                        <div class="filter_num_box">
                          <label
                            v-for="(amt, i) in searchAmt"
                            :class="{ 'checked': filter.amt === amt.dtlCd }"
                            :key="`amt_${i}`"
                            class="radio_option"
                          ><!-- 체크 시 checked 클래스 추가 -->
                            <input
                              type="radio"
                              v-model="filter.amt"
                              :value="amt.dtlCd"
                              @change="onAmtChanged()"
                            >
                            <span class="pallet">{{ amt.dtlShtNm }}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </BulmaAccordionItem>
              </li>

              <!-- 색상 -->
              <li v-if="colors.length > 0">
                <BulmaAccordionItem>
                  <div class="board_header" slot="title">
                    <div class="tit">색상 <span>(<em>{{ formatCnt(colors.length) }}</em>)</span></div>
                  </div>
                  <div class="board_detail" slot="content">
                    <div class="filter_color">
                      <!-- 활성화시 label 태그에 checked 클래스 추가 -->
                      <label
                        class="radio_option_color"
                        v-for="(color, i) in goodsRgb"
                        :key="`color-${i}`"
                        :class="{ 'checked': filter.color.indexOf(color.attrVal) >= 0 }"
                        v-if="isColorEnabled(color.attrVal)"
                        :style="`background-color:${color.rgbVal}`"
                      >
                        {{ filter.color.indexOf(color.attrVal) }}
                        <input type="checkbox" v-model="filter.color" :value="color.attrVal" />
                        <span class="pallet">{{ color.attrVal }}</span></label>
                    </div>
                  </div>
                </BulmaAccordionItem>
              </li>

              <!-- 사이즈 -->
              <li v-if="sizes.length > 0">
                <BulmaAccordionItem>
                  <div class="board_header" slot="title">
                    <div class="tit">사이즈 <span>(<em>{{ formatCnt(sizes.length) }}</em>)</span></div>
                  </div>
                  <div class="board_detail" slot="content">
                    <div class="filter_size">
                      <div
                        v-for="(size, i) in sizeFilterGroup"
                        :key="`size-${i}`"
                        v-if="getValidSizeList(size.dtlCd).length > 0"
                        class="filter_size_inner"
                      >
                        <h5 class="title">{{ size.dtlNm }}</h5>
                        <div class="filter_size_box">
                          <label
                            v-for="(sizeTxt, i) in getValidSizeList(size.dtlCd)"
                            :class="{ 'checked': sizeChecked.indexOf(`${size.dtlCd}@@${sizeTxt}`) >= 0 }"
                            :key="`sizeTxt-${i}`"
                            class="radio_option"
                          >
                            <input
                              type="checkbox"
                              v-model="sizeChecked"
                              :value="`${size.dtlCd}@@${sizeTxt}`"
                              @change="toggleSize(size.dtlCd, sizeTxt)"
                            />
                            <span class="pallet">{{ sizeTxt }}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </BulmaAccordionItem>
              </li>

              <!-- 소재 -->
              <li v-if="materials.length > 0">
                <BulmaAccordionItem>
                  <div class="board_header" slot="title">
                    <div class="tit">소재 <span>(<em>{{ formatCnt(materials.length) }}</em>)</span></div>
                  </div>
                  <div class="board_detail" slot="content">
                    <div class="filter_material">
                      <label
                        v-for="(material, i) in materials"
                        :class="{ 'checked': filter.material.indexOf(material) >= 0 }"
                        :key="`material-${i}`"
                        class="radio_option"
                      >
                        <input type="checkbox" v-model="filter.material" :value="material"/>
                        <span class="pallet">{{ material }}</span>
                      </label>
                    </div>
                  </div>
                </BulmaAccordionItem>
              </li>

              <!-- 할인율 -->
              <li>
                <BulmaAccordionItem>
                  <div class="board_header" slot="title">
                    <div class="tit">
                      할인율
                    </div>
                  </div>
                  <div class="board_detail" slot="content">
                    <div class="filter_num">
                      <div class="input_fromto">
                        <span>
                          <input
                            type="number"
                            placeholder="직접입력"
                            min="0"
                            max="100"
                            v-model="filter.minDcRate"
                            @input="onDcRateInput()"
                          />
                          <em>%</em>
                        </span>
                        <span class="wave">~</span>
                        <span>
                          <input
                            type="number"
                            placeholder="직접입력"
                            min="0"
                            max="100"
                            v-model="filter.maxDcRate"
                            @input="onDcRateInput()"
                          />
                          <em>%</em>
                        </span>
                      </div>
                      <div>
                        <div class="filter_num_box">
                          <label
                            v-for="(discount, i) in searchDc"
                            :class="{ 'checked': filter.dcRate === discount.dtlCd }"
                            :key="`discount_${i}`"
                            class="radio_option"
                          ><!-- 체크 시 checked 클래스 추가 -->
                            <input
                              type="radio"
                              name="discount-item"
                              v-model="filter.dcRate"
                              :value="discount.dtlCd"
                              @change="onDcRateChanged()"
                            />
                            <span class="pallet">{{ discount.dtlShtNm }}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </BulmaAccordionItem>
              </li>
            </ul>
          </BulmaAccordion>
        </div>

        <!-- 버튼 -->
        <div class="bt_2nd b_fixed">
          <button type="button" class="bt_white" @click.stop="clearAndApplyFilter()">초기화</button>
          <button type="button" class="bt_black" @click.stop="applyFilter()">적용</button>
        </div>
        <!--// 버튼 -->
      </section>
    </main>
  </div>
</template>

<script>
import _ from "@/assets/libs/lodash";
import SearchFilter from "@/components/commons/SearchFilter";

export default {
  extends: SearchFilter,

  methods: {
    clearAndApplyFilter() {
      this.clearFilter();
      this.applyFilter();
    },

    applyFilter() {
      this.$attrs.applyFilter(this.filter);
      this.$emit("close");
    }
  }
}
</script>
