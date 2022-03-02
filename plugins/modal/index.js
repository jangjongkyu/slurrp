import { v4 } from "uuid";

export default (ctx, inject) => {};

// import Vue from "vue";
// import {v4} from "uuid";
// import AlertModal from "./components/AlertModalComponent";
// import DaumPostcodeModal from "./components/DaumPostcodeModalComponent";

// import "./modal.scss";

// export default (ctx, inject) => {
//   let modal = new Modal();
//   ctx.app.$modal = modal;
//   inject("modal", modal);
// }

// const defaultOptions = {
//   backdrop: true,
//   size: "md",
//   parent: undefined,
//   component: undefined,
//   props: {}
// };

// class Modal {

//   constructor() {
//   }

//   /**
//    * 모달창 열기
//    * @param options 옵션 @see defaultOptions
//    * @returns {Promise<*>}
//    */
//   open(options) {
//     const id = v4();
//     let o = {...defaultOptions, ...options};

//     console.assert(options.parent !== undefined, "Parent cannot be undefined");
//     console.assert(options.component !== undefined, "Component cannot be undefined");

//     let html = `
//       <div id="modal_dialog_${id}" class="modal-dialog modal-${o.size || 'md'}">
//         <div id="modal_component_${id}"></div>
//       </div>
//     `;

//     let body = document.body;
//     let div = document.createElement("div");
//     div.id = `modal_${id}`;
//     div.classList.add("modal");

//     div.innerHTML = html;
//     body.append(div);

//     return new Promise((resolve, reject) => {
//       let dom = document.getElementById(`modal_component_${id}`);
//       let Component = Vue.extend(options.component);
//       let component = new Component({
//         propsData: options.props || {},
//         parent: options.parent,
//         mixins: [
//           {
//             data: () => ({id}),
//             methods: {
//               $close: (...args) => {
//                 _closeModal();
//                 console.log("onClose", args);
//                 return resolve.apply(o.parent, args);
//               },
//               $dismiss: (...args) => {
//                 _closeModal();
//                 console.log("onDismiss", args);
//                 return reject.apply(o.parent, args);
//               }
//             }
//           }
//         ]
//       }).$mount(dom);

//       if (o.backdrop) {
//         div.addEventListener("click", e => {
//           if (!component.$el.contains(e.target)) {
//             _closeModal();
//             reject.apply(o.parent);
//           }
//         });
//       }

//       function _closeModal() {
//         component.$destroy();
//         let modal = document.getElementById(`modal_${id}`);
//         modal.remove();
//       }
//     }).then(result => result).catch(error => error);
//   }

//   /**
//    * 성공 메시지
//    * @param _this Parent instance
//    * @param message 메시지
//    * @returns {Promise<*>}
//    */
//   success(_this, message) {
//     return this.open({
//       parent: _this,
//       component: AlertModal,
//       size: "sm",
//       props: {
//         title: "성공",
//         message,
//         icon: "ti-check",
//         classes: "modal-success"
//       }
//     });
//   }

//   /**
//    * 알림 모달창
//    * @param _this Parent instance
//    * @param message 메시지
//    * @returns {Promise<*>}
//    */
//   info(_this, message) {
//     return this.open({
//       parent: _this,
//       component: AlertModal,
//       size: "sm",
//       props: {
//         title: "알림",
//         message,
//         classes: "modal-info"
//       }
//     });
//   }

//   /**
//    * 확인 모달창
//    * @param _this Parent instance
//    * @param message 메시지
//    * @returns {Promise<*>}
//    */
//   question(_this, message) {
//     return this.open({
//       parent: _this,
//       component: AlertModal,
//       size: "sm",
//       props: {
//         title: "확인",
//         message,
//         classes: "modal-info",
//         showDismissButton: false,
//         showCancelButton: true
//       }
//     });
//   }

//   /**
//    * 경고 모달창
//    * @param _this Parent instance
//    * @param message 메시지
//    * @returns {Promise<*>}
//    */
//   warning(_this, message) {
//     return this.open({
//       parent: _this,
//       component: AlertModal,
//       size: "sm",
//       props: {
//         title: "경고",
//         message,
//         classes: "modal-warning"
//       }
//     });
//   }

//   /**
//    * 오류 모달창
//    * @param _this Parent instance
//    * @param message 메시지
//    * @returns {Promise<*>}
//    */
//   error(_this, message) {
//     console.log(message)
//     return this.open({
//       parent: _this,
//       component: AlertModal,
//       size: "sm",
//       props: {
//         title: "오류",
//         message,
//         classes: "modal-danger"
//       }
//     });
//   }

//   /**
//    * Daum 주소 검색 API 모달창 띄우기
//    * @param _this Parent instance
//    * @param size 모달창 사이즈
//    * @returns {Promise<*>}
//    */
//   postcode(_this, size) {
//     return this.open({
//       parent: _this,
//       component: DaumPostcodeModal,
//       size
//     });
//   }
// }
