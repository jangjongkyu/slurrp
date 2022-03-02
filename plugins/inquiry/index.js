import InquiryService from '@/plugins/inquiry/service';

export default (context, inject) => {
  const inquiryService = new InquiryService(context.$axios);
  context.$inquiryService = inquiryService;
  inject('inquiryService', inquiryService);
};
