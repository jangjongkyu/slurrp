export default class InquiryService {
  constructor($axios) {
    this.$axios = $axios;
  }

  find(params) {
    return this.$axios.$get('/api/my-page/goods/inquiry', {
      params,
    })
  }

  convertStatus(status) {
    return INQUIRY_STATUS[status];
  }
}


const INQUIRY_STATUS = {
  '10': '대기중',
  '20': '답변완료',
}


