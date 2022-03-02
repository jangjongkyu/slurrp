import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2, {
  confirmButtonText: "확인",
  cancelButtonText: "취소",
});
