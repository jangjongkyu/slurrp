import CouponService from '@/plugins/coupon/service';

export default (context, inject) => {
  const couponService = new CouponService(context.$axios);
  context.$couponService = couponService;
  inject('couponService', couponService);
};
