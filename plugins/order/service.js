export default class OrderService {
  constructor($axios) {
    this.$axios = $axios;
  }

  find(params) {
    return this.$axios.$get('/api/my-page/order', {
      params,
    });
  }

  get(orderNo) {
    return this.$axios.$get(`/api/order/${orderNo}`);
  }

  getDelivery(orderDeliveryNo) {
    return this.$axios.$get(`/api/order/delivery/${orderDeliveryNo}`);
  }

  getStatusLevel(status) {
    return status ? STATUS_LEVEL[status] : 0;
  }

  translateStatus(status) {
    return STATUSES[STATUS_LEVEL[status]];
  }
}

//   '110': '주문접수', '120': '주문완료', '130': '배송지시', '140': '상품준비중', '150': '배송중', '160': '배송완료', '170': '구매확정',
// 주문 완료 > 결제 완료 | 배송 지시, 상품준비중 > 준비중 | 배송중 > 배송중 | 배송완료, 구매 확정 > 배송완료
// 0: 입금 대기중 , 1: 결제 완료, 2: 준비중, 3: 배송중, 4: 배송완료, 5: 배송완료
const STATUS_LEVEL = {
  '110': 0,
  '120': 1,
  '130': 2,
  '140': 2,
  '150': 3,
  '160': 4,
  '170': 5,
};
const STATUSES = [
  '입금대기중',
  '결제완료',
  '배송준비중',
  '배송중',
  '배송완료',
  '구매확정',
];







