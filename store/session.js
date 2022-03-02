import _ from "@/assets/libs/lodash";

const defaultProfile = {
  // 사용자 아이디
  id: undefined,
  // 사용자 이름
  name: undefined,
  // 사용자 등급
  grade: undefined,
  // 사용자 휴대폰번호
  mobile: undefined,
  // 사용자 이메일
  email: undefined,
  // 회원 잔여 적립금
  points: 0,
  // 회원 잔여 예치금
  deposit: 0,
  // 정책 번호
  policyNumber: undefined,
  // 장바구니 상품 갯수
  cartGoodsCount: 0,
  // 회원 보유 쿠폰 수
  memberOwnCouponCount: 0,
  // 임직원 여부
  employee: false,
  //받은선물 갯수
  giftReceiveCount: 0,
  //보낸선물 갯수
  giftSandCount : 0
};

export default {
  state: () => ({
    // 처음인 경우
    isEmpty: true,

    // 세션 프로필 정보
    profile: Object.assign(defaultProfile),

    // 회원 여부
    isMember: false,

    // 손님 여부
    isGuest: false,

    // 임직원 여부
    isEmployee: false,

    // 최근 본 상품 목록
    recentViewedGoods: [],

    // 위시 리스트
    wishList: [],

    // Get session site
    site: undefined
  }),

  mutations: {
    /**
     * 세션 사용자 정보 설정
     *
     * @param {State} state
     * @param {object} profile
     */
    set(state, profile) {
      state.profile = _.merge({}, defaultProfile, profile || {});
      state.isMember = !!(state.profile.id !== 0);
      state.isGuest = !!(state.profile.id === 0);
      state.isEmployee = !!(state.profile.employee === true);
      // 한 번이라도 해봤으면
      state.isEmpty = false;
    },

    /**
     * 세션 사용자 정보 초기화
     *
     * @param {State} state
     */
    clear(state) {
      state.profile = Object.assign(defaultProfile);
      state.isMember = false;
      state.isGuest = true;
      state.isEmployee = false;
      state.isEmpty = true;
    },

    /**
     * 세션 사용자 장바구니 상품 갯수 업데이트
     *
     * @param {State} state
     * @param {number} value
     */
    updateCartGoodsLength(state, value) {
      state.profile.cartGoodsCount = value || 0;
    },

    /**
     * 최근 본 상품 업데이트
     *
     * @param state
     * @param value
     */
    updateRecentViewedGoods(state, value) {
      state.recentViewedGoods = value || [];
    },

    /**
     * 세션 위시리스트 업데이트
     *
     * @param state
     * @param value
     */
    updateWishList(state, value) {
      state.wishList = value || [];
    },

    /**
     * 사이트 정보 업데이트
     *
     * @param state
     * @param value
     */
    updateSiteInfo(state, value) {
      state.site = value;
    }
  }
};
