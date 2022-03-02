export default class ReviewService {
  constructor($axios) {
    this.$axios = $axios;
  }

  findWriteableGoods(params) {
    return this.$axios.$get('/api/my-page/review/writeable-goods', {
      params
    });
  }

  findReviews(params) {
    return this.$axios.$get('/api/my-page/review', {
      params
    });
  }

  getReview(id) {
    return this.$axios.$get(`/api/my-page/review/${id}`);
  }

  getReviewGoods(orderNo, seq) {
    return this.$axios.$get(`/api/my-page/review/writeable-goods/${orderNo}/${seq}`);
  }

  save(review, orderNo, seq) {
    return this.$axios.$post(`/api/my-page/review/${orderNo}/${seq}`, review);
  }

  update(review) {
    return this.$axios.$post('/api/my-page/review', review)
                        .catch(e => {
                          alert("해당 리뷰를 수정할 수 없습니다.");
                        });
  }

  validate(target, fields) {
    fields = fields || Object.keys(VALIDATION_MAP);
    const field = fields.find(key => !target[key]);
    if (field) {
      return VALIDATION_MAP[field];
    } else {
      return null;
    }
  }

  delete(id) {
    return this.$axios.$delete(`/api/my-page/review/${id}`);
  }

  colorReview(code) {
    const COLOR_REVIEW_MAP = {
      '10': '화면과 같아요',
      '20': '화면과 비슷해요',
      '30': '화면과 달라요'
    };
    return COLOR_REVIEW_MAP[code] || '미평가';
  }
  sizeReview(code) {
    const SIZE_REVIEW_MAP = {
      '10': '잘맞아요',
      '20': '조금 커요',
      '30': '조금 작아요'
    };
    return SIZE_REVIEW_MAP[code] || '미평가';
  }
  fitReview(code) {
    const COLOR_REVIEW_MAP = {
      '10': '잘 맞아요',
      '20': '슬림핏',
      '30': '오버핏'
    };
    return COLOR_REVIEW_MAP[code] || '미평가';
  }

  deliveryReview(code) {
    const DELIVERY_REVIEW_MAP = {
      '10': '빨라요',
      '20': '보통',
      '30': '느려요'
    };
    return DELIVERY_REVIEW_MAP[code] || '미평가';
  }
}

const VALIDATION_MAP = {
  score: '별점은 필수 입니다.',
  content: '리뷰는 필수 입니다.',
};
