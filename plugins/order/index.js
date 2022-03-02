import OrderService from '@/plugins/order/service';

export default (context, inject) => {
  const orderService = new OrderService(context.$axios);
  context.$orderService = orderService;
  inject('orderService', orderService);
};
