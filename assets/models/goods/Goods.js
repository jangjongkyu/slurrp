/**
 * 상품 모델
 * @class Goods
 */
export default class Goods {
  /**
   * Constructor
   * @param object {object}
   */
  constructor(object) {
    Object.assign(this, object || {
      // 상품 아이디
      goodsId: undefined,
      // 상품 명
      goodsNm: undefined,
      // 상품 상태 코드
      goodsStatCd: undefined,
      // 고시 아이디
      ntfId: undefined,
      // 모델 명
      mdlNm: undefined,
      // 업체 번호
      compNo: undefined,
      // 업체 명
      compNm: undefined,
      // 키워드
      kwd: undefined,
      // 원산지
      ctrOrg: undefined,
      // 최소 주문 수량,
      minOrdQty: 0,
      // 최대 주문 수량,
      maxOrdQty: 0,
      // 브랜드 번호
      bndNo: undefined,
      // 브랜드 명
      bndNm: undefined,
      // 브랜드 명 국문
      bndNmKo: undefined,
      // 브랜드 명 영문
      bndNmEn: undefined,
      // 배송 방법 코드
      dlvrMtdCd: undefined,
      // 배송 정책 번호
      dlvrcPlcNo: undefined,
      // 업체 정책 번호
      compPlcNo: undefined,
      // 홍보 문구
      prWds: undefined,
      // 무료 배송 여부
      freeDlvrYn: "N",
      // 수입사
      importer: undefined,
      // 제조사
      mmft: undefined,
      // 과세 구분 코드
      taxGbCd: undefined,
      // 재고 관리 여부
      stkMngYn: undefined,
      // MD 사용자 번호
      mdUsrNo: undefined,
      // 인기 순위
      pplrtRank: 0,
      // 인기 설정 코드
      pplrtSetCd: undefined,
      // 사이트 아이디
      stId: undefined,
      // 사이트 명
      stNm: undefined,
      // 사이트 정보
      stStdList: [],
      // 판매 시작 일시
      salesStrtDtm: undefined,
      // 판매 종료 일시
      salesEndDtm: undefined,
      // 할딜용 원판매금액
      orgAmt: 0,
      // 판매 금액
      saleAmt: 0,
      // 할인 금액
      dcAmt: 0,
      // 쿠폰 여부
      couponYn: "N",
      // 쿠폰 명
      cpNm: undefined,
      // 쿠폰 적용 코드
      cpAplCd: undefined,
      // 쿠폰 적용 값
      aplVal: undefined,
      // 쿠폰 금액
      cpAmt: 0,
      // 쿠폰 적용 시작 일시
      aplStrtDtm: undefined,
      // 쿠폰 적용 종료 일시
      aplEndDtm: undefined,
      // 이미지 경로
      imgPath: undefined,
      // 상품 대표이미지 순번
      imgSeq: undefined,
      // 반전 이미지 경로
      rvsImgPath: undefined,
      // 상품 유형 코드
      goodsTpCd: undefined,
      // 비고
      bigo: undefined,
      // 노출여부
      showYn: "N",
      // 단품 관리 여부
      itemMngYn: "N",
      // 웹 모바일 구분 코드
      webMobileGbCd: undefined,
      // 업체 상품 아이디
      compGoodsId: undefined,
      // 홍보 문구 노출 여부
      prWdsShowYn: "N",
      // 반품 가능 여부
      rtnPsbYn: "N",
      // 반품 메시지
      rtnMsg: undefined,
      // 전시 노출타입
      dispShowTpCd: undefined,
      // 품절 여부
      soldOutYn: "N",
      // 신규 여부
      newYn: "N",
      // 베스트 여부
      bestYn: "N",
      // 위시리스트 여부
      interestYn: "N",
      // 리뷰 수
      commentCnt: 0,
      // 핫딜 상품 여부
      dealYn: "N",
      // 공동구매 상품 여부
      groupYn: "N",
      // 공동구매 강제 종료 여부
      groupEndYn: "N",
      // 전시 분류 번호
      dispClsfNo: undefined,
      // 전시 우선 순위
      dispPriorRank: 0,
      // 규격
      size: undefined,
      //
      goodsCstrtGbCd: undefined,
      //
      cstrtGoodsId: undefined,
      // 상품 상세 연관 상품 아이디
      eptGoodsId: undefined,
      // 프로모션 번호
      prmtNo: undefined,
      // 프로모션 할인 금액
      prmtAmt: 0,
      // 대표 동영상 Link URL
      vdLinkUrl: undefined,
      // 상품 금액 유형 코드
      goodsAmtTpCd: undefined
    });
  }
}
