import Kakao from "@/assets/libs/kakao";

export default (ctx) => {
  /**
   * 카카오 JavaScript API를 초기화 한다.
   * ** Client Only
   */
  Kakao.init(ctx.env.kakaoApiKey);
};
