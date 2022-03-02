import Vue from 'vue';
import moment from 'moment';
import numeral from 'numeral';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

Vue.filter('dayOfWeek', (date) => {
  return weekDays[moment(date).day()];
});

Vue.filter('dayOfMonthWithWeekDay', (date, withTime, addDays) => {
  addDays = addDays || 0;
  const dateMoment = moment(date).add(addDays, 'days');
  return dateMoment.format(`MM/DD(${weekDays[dateMoment.day()]})${withTime ? ' HH:mm' : ''}`);
});

Vue.filter('dateFormat', (date, format) => {
  format = format || 'YYYY-MM-DD';
  return moment(date).format(format);
})


Vue.filter('number', (value) => {
  return numeral(value).format("0,0");
});

/**
 * 할인율 필터
 * amounts: array
 * amounts[0]: 원 판매가
 * amounts[1]: 할인 금액
 */
Vue.filter('discountRate', (amounts) => {
  return `${numeral((amounts[1]) / amounts[0] * 100).format('0,0')}%`;
  // return `${numeral((amounts[0] - amounts[1]) / amounts[0] * 100).format('0,0.[00]')}%`;
});


Vue.filter('blur', (value, places) => {
  places = places || 3;
  if (!value) {
    return '*****';
  }
  return value.substring(0, places) + '*****';
});

Vue.filter('tel', (num) => {
  if (!num) return '';
  if (num.length === 11) {
    return num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (num.length === 8) {
    return num.replace(/(\d{4})(\d{4})/, "$1-$2");
  } else if (num.length === 9) {
    return num.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
  } else {
    if (num.indexOf("02") === 0) {
      return num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    } else {
      return num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
  }
});
