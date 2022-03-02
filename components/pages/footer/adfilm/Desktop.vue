<template>
  <section>
    <!-- 타이틀 -->
    <div class="box">
      <div class="mar_set">
        <h4 class="title_1st">AD FILM</h4>
        <div class="foot_line_title">
          <div class="fr">
            <select
              required
              class="input_common bd_1 w300 mgl15"
              v-model="adFilmGroup"
            >
              <option v-if="adFilmGroups.length === 0">등록된 AD FILM이 없습니다.</option>
              <option v-for="item in adFilmGroups" :value="item">
                {{ item.seasonNm }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!--// 타이틀 -->

    <div class="box" v-if="adFilmGroups.length > 0">
      <div class="mar_set">
        <div class="film_list_wrap">
          <div class="film_list" v-for="film in adFilmGroup.adFilms">
            <h5>{{ film.adFilmTitle }}</h5>
            <div class="video_wrap">
              <ad-film-video-player
                width="100%"
                height="360"
                :video-url="film.videoUrl"
              ></ad-film-video-player>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AdFilmVideoPlayer from "@/components/pages/footer/adfilm/AdFilmVideoPlayer";
export default {
  components: { AdFilmVideoPlayer },
  props: {
    adFilmGroups: {
      type: Array
    }
  },
  data() {
    return {
      adFilmGroup: undefined
    };
  },
  created() {
    if (this.adFilmGroups.length > 0) {
      this.adFilmGroup = this.adFilmGroups[0];
    }
  }
};
</script>
