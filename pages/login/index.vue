<template>
  <section>
    <form class="box" @submit.prevent="onSubmit" novalidate>
      <!-- NICECLAUP 로그인 -->
      <div class="mar_set" :class="{ w500: !$device.isMobile }">
        <h4 class="title_1st">로그인</h4>
        <article>
          <div class="input_common">
            <input
              ref="username"
              placeholder="아이디"
              type="email"
              v-model="form.username"
              required
            />
            <div class="bt_close" @click.stop="form.username = undefined">
              <img src="/web/images/icon_common_close.png" alt="닫기" />
            </div>
          </div>
          <div class="input_common">
            <input
              ref="password"
              placeholder="비밀번호"
              type="password"
              v-model="form.password"
              required
            />
            <div class="bt_close" @click.stop="form.password = undefined">
              <img src="/web/images/icon_common_close.png" alt="닫기" />
            </div>
          </div>
        </article>
        <dl class="subj_detail_dl bdrn">
          <dt>
            <label class="checkbox_wrap">
              <input type="checkbox" v-model="form.remember" />
              <i class="check_icon"></i>
              <span class="txt_s">아이디 저장</span>
            </label>
          </dt>
          <dd>
            <nuxt-link
              :to="{ path: '/member/find-id', query: $route.query }"
              class="bt_txt_s"
            >
              아이디찾기
            </nuxt-link>
            <i class="vline"></i>
            <nuxt-link
              :to="{ path: '/member/reset-password', query: $route.query }"
              class="bt_txt_s"
            >
              비밀번호 재설정
            </nuxt-link>
          </dd>
        </dl>
        <div class="bt_2nd">
          <button type="submit" class="bt_black">로그인</button>
        </div>
      </div>
    </form>
    <div class="box login_sns">
      <!-- 간편 로그인 -->
      <div class="mar_set w500">
        <ul>
          <li>
            <button type="button" class="bt_naver" @click.stop="doNaverLogin()">
              네이버 로그인
            </button>
          </li>
          <li>
            <button type="button" class="bt_kakao" @click.stop="doKakaoLogin()">
              카카오 로그인
            </button>
          </li>
          <li>
            <button id="appleid-signin" type="button" class="bt_apple">
              애플 로그인
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="box">
      <!-- 회원가입 비회원주문  -->
      <div class="mar_set" :class="{ w500: !$device.isMobile }">
        <div class="txt_center_desc">
          아직 회원이 아니신가요?<br />NICE CLAUP(롯데 GFR)의 회원이 되셔서<br />다양한 혜택을
          만나보세요.
        </div>
        <div class="bt_2nd">
          <button
            type="button"
            class="bt_white"
            @click.stop="$router.push({ path: '/join', query: $route.query })"
          >
            회원가입하기
          </button>
        </div>
        <div
          class="bt_2nd"
          v-if="($route.query.referrer || '').toLowerCase() === 'order'"
        >
          <button
            type="button"
            class="bt_white"
            @click.stop="$router.push({ path: '/order', query: {} })"
          >
            비회원 주문
          </button>
        </div>
        <div class="bt_2nd" v-else>
          <button
            type="button"
            class="bt_underbar"
            @click.stop="onClickGuestOrder()"
          >
            비회원 주문조회
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { isEmailPattern, isEmptyString } from "@/assets/libs/validate";
import SimpleLogin from "@/assets/mixins/simple-login";

const STORAGE_KEY = "LGFRUSERNAME";

export default {
  mixins: [SimpleLogin],

  head: () => ({
    title: "로그인",
  }),

  middleware: ["anonymous-only"],

  data: () => ({
    form: {
      username: undefined,
      password: undefined,
      remember: false,
    },
  }),

  fetch({ store }) {
    store.commit("layout/setMobileHeader", {
      headerComponentName: "page",
      routeName: "로그인",
      hasFooter: false,
    });
  },

  mounted() {
    let username = window.localStorage.getItem(STORAGE_KEY);
    if (username) {
      this.form.username = username;
      this.form.remember = true;
      this.$refs.password.focus();
    } else {
      this.$refs.username.focus();
    }

    // try {
    //   let r = new URL(document.referrer);
    //   let c = new URL(location.href);
    //
    //   console.log(r.pathname, c.pathname);
    //
    //   if (c.pathname === r.pathname) {
    //     return this.$router.push("/");
    //   }
    // } catch (e) {
    // }
  },

  methods: {
    /**
     * 일반 JDBC 로그인
     */
    onSubmit() {

      
      return this.validateForm().then(async () => {
        try {
          this.form.password = encodeURI(this.form.password); 
          let form = [
            `username=${this.form.username}`,
            `password=${this.form.password}`,
          ];
          await this.$axios
            .$post("/api/login", form.join("&"), {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-App-No": this.$store.state.layout.appNo,
                "X-App-YN": this.$store.state.layout.isApp ? "Y" : "N"
              }
            })
            .then(async () => {

              if (this.form.remember) {
                window.localStorage.setItem(STORAGE_KEY, this.form.username);
              } else {
                window.localStorage.removeItem(STORAGE_KEY);
              }
            });
          return this.afterLoginHandler();
        } catch (e) {
          let state = ((e || {}).response || {}).status;
          let data = ((e || {}).response || {}).data;
          let message = data.message;
          let code = (data || {}).code || '';

          if (state === 504) message = "서버에 접속할 수 없습니다.";
          else if (code === 'ERR_HIBERNATE_USER') {
            let cache = JSON.stringify(data);
            cache = encodeURI(cache);
            this.$cookies.set(process.env.DORMANT_INFO_KEY, btoa(cache), {
              path: '/',
              maxAge: 60 * 5
            });
            return this.$router.push({path: '/member/active'});
          }
          else if (state === 403) {
            this.$modal.error(message);
            return;
          }
        }
      });
    },

    validateForm() {
      return new Promise((resolve, reject) => {
        if (isEmptyString(this.form.username)) {
          return;
          this.$modal.error("아이디를 반드시 입력해 주세요.").then(() => {
            this.$refs.username.focus();
            return reject();
          });
        }

        if (!isEmailPattern(this.form.username)) {
          return this.$modal.error("이메일 형식이 맞지 않습니다.<br/>확인 후 다시 입력해 주세요")
            .then(() => {
              this.form.username = undefined;
              this.$refs.username.focus();
              return reject();
            });
        }

        if (isEmptyString(this.form.password)) {
          return this.$modal
            .error("비밀번호를 반드시 입력해 주세요.")
            .then(() => {
              this.$refs.password.focus();
              return reject();
            });
        }

        return resolve();
      });
    },

    async onClickGuestOrder()
    {
      this.$cookies.remove(this.$env.ORDER_STORAGE_KEY);
      await this.$axios.get("/api/order/no-member/clear");
      return this.$router.push('/order/no-member');
    },
  },
};
</script>
