<template>
  <form id="wrap" @submit.prevent="doSearch()" novalidate>
    <!-- 레이어 닫기 -->
    <div class="layer_close">
      <button type="button" @click.stop="$emit('close')">
        <img src="/web/images/bt_close.png" alt="닫기"/>
      </button>
    </div>
    <!-- //레이어 닫기 -->

    <!-- Container -->
    <main class="contents">
      <section>
        <div class="box">
          <div class="mar_set w800 mgt50" style="margin:0 auto;">

            <!-- 검색시 연관검색어 노출 팝업 -->
            <div class="search_same_wrap" style="display: none">
              <div class="search_same">
                <ul>
                  <li>다운점퍼</li>
                  <li>패딩</li>
                  <li>코트</li>
                  <li>후드</li>
                  <li>스니커즈</li>
                  <li>양말</li>
                  <li>맨투맨</li>
                </ul>
              </div>
            </div>
            <!-- //검색시 연관검색어 노출 팝업 -->

            <h4 class="title_1st">무엇을 찾으시나요?</h4>

            <!-- 검색어 입력 -->
            <div class="input_box search mgt30">
              <input
                placeholder="검색어를 입력해주세요"
                type="text"
                v-model="query"
                required="required"
                autofocus
                ref="searchField"
              />
              <button type="submit" class="bt_search">검색</button>
            </div>
            <!-- //검색어 입력 -->

            <!-- 추천 검색어 노출 -->
            <!-- //추천 검색어 노출 -->

            <div class="box mgt50">
              <div class="fl">
                <!-- 최근검색어 -->
                <div class="search_recently">
                  <h5>
                    최근 검색어
                    <span v-if="$_rk.recentKeywords.length > 0">
                      <button type="button" class="bt_white_m" @click.stop="clearKeywords()">검색어 전체 삭제</button>
                    </span>
                  </h5>

                  <template v-if="$_rk.recentKeywords.length > 0">
                    <dl
                      v-for="(recent, recentIndex) in $_rk.recentKeywords"
                      :key="`recent_${recentIndex}`"
                    >
                      <dt><a href="" @click.prevent="doSearch(recent.keyword)">{{ recent.keyword }}</a></dt>
                      <dd>
                        {{ formatDate(recent.timestamp, "MM.DD") }}
                        <button type="button" @click.stop="removeKeyword(recent.keyword)">
                          <img src="/web/images/bt_close_xs.png"/>
                        </button>
                      </dd>
                    </dl>
                  </template>

                  <div class="recently_no" v-else>최근 검색어가 없습니다.</div>
                </div>
                <!-- //최근검색어 -->
              </div>

              <div class="fr">
                <!-- 인기검색어 -->
                <div class="search_recently best">
                  <h5>인기 검색어</h5>
                  <dl
                    v-for="(p, popularIndex) in popular"
                    :key="`popular-${popularIndex}`"
                  >
                    <dt>{{ p.ranking }}.</dt>
                    <dt><a href="" @click.prevent="doSearch(p.keyword)">{{ p.keyword }}</a></dt>
                    <dd>
                      <span :class="getRankingClass(p)">
                        {{ getRankingText(p) }}
                      </span>
                    </dd>
                  </dl>
                </div>
                <!-- //인기검색어 -->
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- //Container -->
  </form>
</template>

<script>
import {isEmptyString} from "@/assets/libs/validate";

export default {
  props: {
    popular: Array
  },

  data: () => ({
    query: undefined
  }),

  mounted() {
    // console.log('mounted search field');
    // this.$refs.searchField.focus();
  },

  methods: {
    async removeKeyword(keyword) {
      await this.$_rk.remove(keyword);
      this.$forceUpdate();
    },

    async clearKeywords() {
      await this.$_rk.clear();
      this.$forceUpdate();
    },

    async doSearch(keyword) {
      if (!isEmptyString(keyword)) {
        this.query = keyword;
      }

      if (isEmptyString(this.query)) {
        this.$modal.error("검색어를 입력해주세요.");
        this.$refs.query.focus();
      }
      await this.$_rk.add(this.query);
      this.$emit("close");

      return this.$router.push({ path: "/search", query: { query: this.query } });
    },

    getRankingClass(value) {
      let diff = value.ranking - value.prevRank;
      if (diff > 0) {
        return "down";
      } else if (diff < 0) {
        return "up";
      } else {
        return "nochange";
      }
    },

    getRankingText(value) {
      let diff = value.ranking - value.prevRank;
      if (diff > 0) {
        return "↓";
      } else if (diff < 0) {
        return "↑";
      } else {
        return "-";
      }
    }
  }
};
</script>
