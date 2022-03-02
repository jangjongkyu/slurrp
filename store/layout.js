import _ from "@/assets/libs/lodash";

const ANDROID = "gfr-android";
const IOS = "gfr-ios";

export default {
  state: () => ({
    component: "desktop",
    headerComponentName: undefined,
    routeName: undefined,
    hasFooter: true,
    referrer: undefined,
    isAndroid: false,
    isApple: false,
    isApp: false,
    appNo: undefined
  }),

  mutations: {
    /**
     * @deprecated
     * 컴포넌트 상태 변경
     *
     * @param {State} state
     * @param {string} value
     */
    change(state, value) {
      state.component = value || "desktop";
    },

    /**
     * 모바일 헤더 셋팅
     *
     * @param {State} state
     * @param {object} object
     */
    setMobileHeader(state, object) {
      object = _.merge(
        {
          headerComponentName: undefined,
          routeName: undefined,
          hasFooter: true,
          referrer: undefined
        },
        object || {}
      );

      state.headerComponentName = object.headerComponentName;
      state.routeName = object.routeName || state.routeName;
      state.hasFooter = object.hasFooter;
      state.referrer = object.referrer;
    },

    changeRouterName(state, value) {
      state.routeName = value || "";
    },

    setMobileDevice(state, value) {
      state.isAndroid = false;
      state.isApple = false;
      state.isApp = false;

      try {
        if (value.indexOf(ANDROID) >= 0) {
          state.isAndroid = true;
          state.isApp = true;
        } else if (value.indexOf(IOS) >= 0) {
          state.isApple = true;
          state.isApp = true;
        }
      } catch (e) {}
    },

    setAppNo(state, value) {
      state.isAndroid = (value || {}).isAndroid || false;
      state.isApple = (value || {}).isApple || false;
      state.appNo = (value || {}).appNo;
      state.isApp = state.isAndroid || state.isApple;
    },
  }
};
