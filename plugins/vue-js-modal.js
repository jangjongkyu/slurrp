import _ from "@/assets/libs/lodash";
import Vue from "vue";
import VModal from "vue-js-modal/dist/ssr.index";
import DaumPostcode from "./modal/DaumPostcode";
import AlertModal from "./modal/AlertModal";

import "vue-js-modal/dist/styles.css";
import DaumMap from '@/plugins/modal/DaumMap';
import PhotoModal from '@/components/commons/PhotoModal';

Vue.use(VModal, {
  dialog: true,
  dynamic: true,
  injectModalsContainer: true,
});

export default (ctx, inject) => {
  let modal = Vue.prototype.$modal;

  ctx.app.router.afterEach((to, from) => {
    try {
      let el = document.getElementById("modals-container");
      if (el) {
        el.clear();
      }
    } catch (e) {}
  });

  /**
   * 얼럿창
   * @param title
   * @param text
   * @returns {Promise<unknown>}
   */
  modal.alert = function (text) {
    return new Promise((resolve, reject) => {
      this.show(AlertModal, {
        text,
        resolve,
        reject
      }, {
        width: "300px",
        height: "auto"
      });
    });
  };

  /**
   * 성공
   * @param text {string}
   * @returns {Promise<unknown>}
   */
  modal.success = function (text) {
    return this.alert(text);
  };

  /**
   * 알림
   * @param text {string}
   * @returns {Promise<unknown>}
   */
  modal.info = function (text) {
    return this.alert(text);
  };

  /**
   * 경고
   * @param text {string}
   * @returns {Promise<unknown>}
   */
  modal.warning = function (text) {
    return this.alert(text);
  };

  /**
   * 오류
   * @param text {string}
   * @returns {Promise<unknown>}
   */
  modal.error = function (text) {
    return this.alert(text);
  };

  /**
   * 확인
   * @param text {string}
   * @returns {Promise<unknown>}
   */
  modal.confirm = function (text) {
    return new Promise((resolve, reject) => {
      this.show(AlertModal, {
        text,
        showCancelButton: true,
        resolve,
        reject
      }, {
        width: "300px",
        height: "auto"
      });
    });
  };

  modal.postcode = function () {
    let params = {
      clickToClose: false,
      width: ctx.$device.isMobile ? "100%" : "400px",
      height: ctx.$device.isMobile ? "100%" : "auto",
    };

    if (ctx.$device.isMobile) {
      _.merge(params, {
        width: "100%",
        height: "100%",
        classes: "v--modal top-0",
      });
    }

    return new Promise((resolve) => {
      let value = {};
      modal.show(
        DaumPostcode,
        {
          update: (data) => (value = data),
        },
        params,
        {
          "before-close": (event) => {
            resolve(value);
          },
        }
      );
    });
  };

  modal.markerMap = (store) => {
    let params = {
      clickToClose: false,
      width: ctx.$device.isMobile ? "100%" : "400px",
      height: ctx.$device.isMobile ? "100%" : "auto",
    };
    modal.show(
      DaumMap,
      {
        store
      },
      params
    )
  }

  modal.photoSwiperModal = (image) => {
    const params = {
      clickToClose: true,
      wid1th: ctx.$device.isMobile ? "300px" : "600px",
      height: "auto",
    };
    modal.show(
      PhotoModal,
      {
        image
      },
      params
    )
  };

  ctx.app.$modal = modal;
  inject("modal", modal);
};
