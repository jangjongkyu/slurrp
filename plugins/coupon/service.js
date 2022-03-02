export default class CouponService {
  constructor($axios) {
    this.$axios = $axios;
  }

  count() {
    return this.$axios.$get('/api/member/coupon/count');
  }

  find(params) {
    return this.$axios.$get('/api/member/coupon', {
      params,
    });
  }

  setAutoCouopon(){
    return this.$axios.$post('/api/member/setAutoCoupon');
  }

  isPercentage(coupon) {
    if(coupon.cpAplCd==='40'){      
      return coupon.cpAplCd === COUPON_APPLY_TYPE_CODE.PERCENTAGES;
    }
    return coupon.cpAplCd === COUPON_APPLY_TYPE_CODE.PERCENTAGE;
  }

  getCouponTargetMessage(coupon) {
    return '';
  }
}


const COUPON_APPLY_TYPE_CODE = {
  PERCENTAGE: '10',
  PERCENTAGES: '40',
  PRICE: '20',
};

const COUPON_TARGET = {
  '10': '전체',
  '20': '상품',
  '30': '전시 카테고리',
  '40': '기획전',
  '50': '업체',
  '60': '브랜드',
};


