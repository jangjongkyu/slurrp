import MemberService from '@/plugins/member/service';

export default (context, inject) => {
  const memberService = new MemberService(context.$axios);
  context.$memberService = memberService;
  inject('memberService', memberService);
};
