<template>
  <section>
    <div class="sel_common promotion">
      <select required v-model="adFilmGroup">
        <option v-if="adFilmGroups.length === 0">등록된 AD FILM이 없습니다.</option>
        <option v-for="item in adFilmGroups" :value="item">{{ item.seasonNm }}</option>
      </select>
    </div>
    <div class="mar_set" v-if="adFilmGroups.length > 0">
      <ul>
        <li v-for="film in adFilmGroup.adFilms">
          <h4 class="title_2nd">{{ film.adFilmTitle }}</h4>
          <div class="video_wrap">
            <ad-film-video-player :video-url="film.videoUrl"/>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Desktop from '@/components/pages/footer/adfilm/Desktop';

export default {
  extends: Desktop
};
</script>
