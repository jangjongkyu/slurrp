<template>
  <form id="wrap" @submit.prevent="doSearch()" novalidate>
    <!-- Header -->
    <header class="header_wrap">
      <nav class="header_pop">
        <button type="button" class="bt_closeall" @click.stop="$emit('close')">
          닫기
        </button>
      </nav>
    </header>
    <!--// Header -->
    <!-- Container -->
    <main class="contents">
      <section>
        <div class="mar_set">
          <!-- 검색창 -->
          <div class="input_search_wrap main">
            <legend>검색</legend>
            <div class="input_common search">
              <input placeholder="무엇을 찾으시나요?" type="text" v-model="query" required="required" autofocus ref="searchField">
              <button type="button" class="clear" @click.stop="query = undefined">초기화</button>
              <button type="submit" class="bt_srch_tab">검색</button>
            </div>
          </div>

          <!-- 자동완성 -->
          <div class="srch_list_wrap auto" style="display: none;">
            <ul class="srch_list_inner">
              <li>
                <a href="">롱코트</a>
              </li>
              <li>
                <a href="">숏패딩</a>
              </li>
              <li>
                <a href="">스커트</a>
              </li>
            </ul>
          </div>

          <!-- 최근 검색어 -->
          <div class="srch_list_wrap">
            <div class="dp_flex">
              <h4 class="title_3rd mgb05">최근 검색어</h4>
              <a href="" class="bt_arr" v-if="$_rk.recentKeywords.length > 0" @click.prevent="clearKeywords()">
                검색어 전체 삭제
              </a>
            </div>

            <ul class="srch_list_inner" v-if="$_rk.recentKeywords.length > 0">
              <li
                v-for="(recent, recentIndex) in $_rk.recentKeywords"
                :key="`recent-${recentIndex}`"
              >
                <a href="" @click.prevent="doSearch(recent.keyword)">{{ recent.keyword }}</a>
                <span class="srch_date">{{ formatDate(recent.timestamp, "MM.DD") }}</span>
                <button type="button" class="bt_i_del small" @click.stop="removeKeyword(recent.keyword)">삭제</button>
              </li>
            </ul>

            <div class="txt_center_desc mgt20 mgb20" v-else>
              최근 검색어가 없습니다.
            </div>
          </div>

          <!-- 인기 검색어 -->
          <div class="srch_list_wrap">
            <h4 class="title_3rd mgb05">인기 검색어</h4>
            <ul class="srch_list_inner">
              <li
                v-for="(p, popularIndex) in popular"
                :key="`popular-${popularIndex}`"
              >
                <a href="" @click.prevent="doSearch(p.keyword)">
                  <i class="num">{{ p.ranking }}</i>
                  <span>{{ p.keyword }}</span>
                  <span :class="getRankingClass(p)"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </form>
</template>

<script>
import DesktopSearchModal from "@/components/commons/modal/DesktopSearchModal";

export default {
  extends: DesktopSearchModal
};
</script>
