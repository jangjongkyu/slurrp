<template>
  <div>
    <div class="item_list_wrap full">
      <ul class="item_list">
        <li
          v-for="(event, eventIndex) in eventList"
          :key="`event-${eventIndex}`"
          class="single"
        >
          <nuxt-link :to="`/event/${event.eventNo}`">
            <figure class="figure">
              <div class="thumnail">
                <img :src="getImageUrl(event.dlgtImgPath)" onerror="this.src='/images/no-img.jpg'" :alt="event.alt" />
              </div>
              <figcaption class="figcaption">
                <div class="promotion_tit">{{ event.ttl }}</div>
                <div class="promotion_date">{{ event.dispStrtDtm | dateFormat }} ~ {{ event.dispEndDtm | dateFormat }}</div>
              </figcaption>
            </figure>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="bt_2nd mar_set">
      <button class="bt_white" @click="$router.push('/event')">전체 이벤트 보기</button>
    </div>
  </div>
</template>

<script>
import formatter from 'assets/mixins/formatter';

export default {
  name: "EventList",
  mixins: [formatter],
  props: {
    eventList: {
      type: Array,
      default: () => []
    },
  },
  mounted() {
    // console.log('eventlist : ', this.eventList);
  }
};
</script>
