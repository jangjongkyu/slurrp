import MileageService from '@/plugins/mileage/service';

export default (context, inject) => {
  const mileageService = new MileageService(context.$axios);
  context.$mileageService = mileageService;
  inject('mileageService', mileageService);
};
