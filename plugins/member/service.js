export default class MemberService {
  constructor($axios) {
    this.$axios = $axios;
  }

  validate(validationMap, target, fields) {
    fields = fields || Object.keys(validationMap);
    const field = fields.find(key => !target[key]);
    if (field) {
      return validationMap[field];
    } else {
      return null;
    }
  }

  // 사용자
  validateMember(member, fields) {
    return this.validate(USER_VALIDATION_MAP, member, fields);
  }

  getMember() {
    return this.$axios.$get('/api/member');
  }

  saveMember(member) {
    return this.$axios.$post('/api/member', member);
  }

  deleteMember(code, reason) {
    return this.$axios.$delete('/api/member', {
      params: {
        code, reason
      }
    });
  }

  updatePassword(password) {
    return this.$axios.$put('/api/member/password', password);
  }

  confirmPassword(password) {
    return this.$axios.$put('/api/member/check-password', password);
  }

  // 사용자 배송지
  validateAddress(address) {
    return this.validate(ADDRESS_VALIDATION_MAP, address);
  }
  getMemberAddresses() {
    return this.$axios.$get('/api/member/address');
  }

  saveMemberAddress(address) {
    return this.$axios.$post('/api/member/address', address);
  }

  updateMemberAddressDefault(address) {
    return this.$axios.$put('/api/member/default-address', address);
  }

  deleteMemberAddress(addressId) {
    return this.$axios.$delete(`/api/member/address/${addressId}`);
  }

  getPrivacyPolicyContents() {
    return privacyPolicyContents;
  }

  async getPolicyCheckList() {
    const termsPolicies = await this.$axios.$get('/api/policy/terms');
    return [
      {
        label: "서비스 이용약관 (필수)",
        value: false,
        contents: termsPolicies[0] ? termsPolicies[0].content : '',
      },
      {
        label: "개인정보 수집ㆍ이용 동의서(필수)",
        value: false,
        contents: privacyPolicyContents,
      },
    ];
  }

  async getPolicyCheckListByOrder() {
    return [
      {
        label: "",
        value: false,
        contents: privacyPolicyContentsOrder,
      },
    ];
  }

  getPrivacyPolicyContentsByMyPage() {
    return privacyPolicyContentsMyPage;
  }

  getInputDeliveryAreaAgreementContents() {
    return inputDeliveryAreaAgreementContents;
  }

  getInputAccountAgreementContents() {
    return inputAccountAgreementContents;
  }

  getMemberSnsList() {
    return this.$axios.$get('/api/member/sns');
  }

}

const ADDRESS_VALIDATION_MAP = {
  adrsNm: '이름을 확인하세요.',
  mobile: '휴대폰 번호를 확인하세요.',
  roadAddr: '우편번호, 주소를 확인하세요.',
  roadDtlAddr: '상세주소를 확인하세요.',
}

const USER_VALIDATION_MAP = {
  bank: '환불 계좌 은행을 선택 하세요.',
  accountNumber: '계좌번호를 입력 하세요.',
};

//환불계좌 이용약관
const inputAccountAgreementContents = `
<html lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이용약관 팝업</title>
  <link rel="stylesheet" type="text/css" href="../css/common.css">
</head>
<body>
  <!--팝업-->
    <div class="popup_contents pop_height">            
		<!-- 내용노출 -->
        <div class="box">
            회사는 아래와 같이 개인정보를 수집 이용하고자 합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.
            <table class="pop_table mgt20">
        <colgroup>
                  <col width=""><col width="33%"><col width="33%">
                </colgroup>
                <tr>
                  <th>수집 목적</th>
                    <th>수집 항목</th>
                    <th>이용/보유기간</th>
                </tr>
                <tr>
                  <td>반품, 환불 접수 및 처리</td>
                    <td>예금주, 금융기관, 계좌번호</td>
                    <td><strong style="font-weight: bold; font-size: 18px;">회원 탈퇴 시 까지</strong></td>
                </tr>
            </table>
            <br />
            ※ 개인정보 수집 및 이용에 동의를 거부할 수 있습니다. 다만, 동의를 거부할 경우 상품구매 및 및 배송서비스 이용이 불가함을 알려드립니다.
            <br /><br />
            위와 같이 개인정보를 수집/이용하는데 동의합니다.
        </div>
        <!-- //내용노출 -->
        
    </div>
<!--//팝업-->
</body>
</html>`

//주소지 이용약관
const inputDeliveryAreaAgreementContents = `
<html lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이용약관 팝업</title>
  <link rel="stylesheet" type="text/css" href="../css/common.css">
</head>
<body>
  <!--팝업-->
    <div class="popup_contents pop_height">            
		<!-- 내용노출 -->
        <div class="box">
            회사는 아래와 같이 개인정보를 수집 이용하고자 합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.
            <table class="pop_table mgt20">
        <colgroup>
                  <col width=""><col width="33%"><col width="33%">
                </colgroup>
                <tr>
                  <th>수집 목적</th>
                    <th>수집 항목</th>
                    <th>이용/보유기간</th>
                </tr>
                <tr>
                  <td>주문 및 배송서비스</td>
                    <td>수취인 성명, 휴대폰번호, 배송지주소</td>
                    <td><strong style="font-weight: bold; font-size: 18px;">5년</strong></td>
                </tr>
            </table>
            <br />
            ※ 개인정보 수집 및 이용에 동의를 거부할 수 있습니다. 다만, 동의를 거부할 경우 상품구매 및 및 배송서비스 이용이 불가함을 알려드립니다.
            <br /><br />
            위와 같이 개인정보를 수집/이용하는데 동의합니다.
        </div>
        <!-- //내용노출 -->
        
    </div>
<!--//팝업-->
</body>
</html>`

//MyPage 개인정보 이용약관
const privacyPolicyContentsMyPage = `
<html lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이용약관 팝업</title>
  <link rel="stylesheet" type="text/css" href="../css/common.css">
</head>
<body>
  <!--팝업-->
    <div class="popup_contents pop_height">            
		<!-- 내용노출 -->
        <div class="box">
            회사는 아래와 같이 개인정보를 수집 이용하고자 합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.
            <table class="pop_table mgt20">
        <colgroup>
                  <col width=""><col width="33%"><col width="33%">
                </colgroup>
                <tr>
                  <th>수집 목적</th>
                    <th>수집 항목</th>
                    <th>이용/보유기간</th>
                </tr>
                <tr>
                  <td>회원 가입 및 관리</td>
                    <td>성별, 생년월일</td>
                    <td><strong style="font-weight: bold; font-size: 18px;">회원 탈퇴 시 까지</strong></td>
                </tr>
            </table>
            <br />
            ※ 선택항목 수집 이용에 동의하지 아니할 수 있습니다. 동의를 거부하더라도 서비스 이용에 불이익을 받지 않습니다.
            <br /><br />
            위와 같이 개인정보를 수집/이용하는데 동의합니다. 
        </div>
        <!-- //내용노출 -->
        
    </div>
<!--//팝업-->
</body>
</html>`

//비회원주문 개인정보 이용약관
const privacyPolicyContentsOrder = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이용약관 팝업</title>
  <link rel="stylesheet" type="text/css" href="../css/common.css">
</head>
<body>
  <!--팝업-->
  <div class="popup_header">
    <h5 class="title_pop">개인정보 수집ㆍ이용 동의서(필수)</h5>
  </div>
    <div class="popup_contents pop_height">            
		<!-- 내용노출 -->
        <div class="box">
        	회사는 아래와 같이 개인정보를 수집 이용하고자 합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.
            <table class="pop_table mgt20">
				<colgroup>
                	<col width=""><col width="33%"><col width="33%">
                </colgroup>
                <tr>
                	<th>수집 목적</th>
                    <th>수집 항목</th>
                    <th>이용/보유기간</th>
                </tr>
                <tr>
                	<td>- 이름, 이메일, 전화번호 : 고지의 전달, 불만처리나 주문/배송 정보 안내 등 원활한 의사소통 경로의 확보<br />
- 주소 : 상품 배송지 확보</td>
                    <td>이름, 휴대전화번호, 이메일, 주소</td>
                    <td><strong style="font-weight: bold; font-size: 18px;">5년간 수집 항목에 대한 정보를 보유함 <br/>(전자상거래법)</strong></td>
                </tr>
            </table>
            <br />
            ※ 위 정보는 회사가 수집 목적에 따른 서비스 제공을 위하여 필수적인 최소한의 정보에 해당하므로, 동의를 거부할 경우 원활한 서비스 이용에 제한을 받을 수 있습니다.
            <br /><br />
            위와 같이 개인정보를 수집/이용하는데 동의합니다. 
        </div>
        <!-- //내용노출 -->
        
 </div>
<!--//팝업-->
</body>
</html>`

const privacyPolicyContents = `
<html lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이용약관 팝업</title>
  <link rel="stylesheet" type="text/css" href="../css/common.css">
</head>
<body>
  <!--팝업-->
    <div class="popup_contents pop_height">            
		<!-- 내용노출 -->
        <div class="box">
        	회사는 아래와 같이 개인정보를 수집 이용하고자 합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.
            <table class="pop_table mgt20">
				<colgroup>
                	<col width=""><col width="33%"><col width="33%">
                </colgroup>
                <tr>
                	<th>수집 목적</th>
                    <th>수집 항목</th>
                    <th>이용/보유기간</th>
                </tr>
                <tr>
                	<td>회원 가입 및 관리<br />(회원제 서비스에 따른 본인 식별 인증, 중복 가입 및 부정 가입 방지, 가입 연령 확인, 회원 자격 유지 제한등, 각종 통지 및 고지)</td>
                    <td>이름, 휴대전화번호, 이메일 주소, 비밀번호, CI</td>
                    <td><strong style="font-weight: bold; font-size: 18px;">회원 탈퇴 시 까지<br />(단, 탈퇴 후 재가입 방지를 위하여 'ID, CI값' 90일 동안 보관)</strong></td>
                </tr>
            </table>
            <br />
            ※ 위 정보는 회사가 수집 목적에 따른 서비스 제공을 위하여 필수적인 최소한의 정보에 해당하므로, 동의를 거부할 경우 원활한 회원제 서비스 이용에 제한을 받을 수 있습니다.
            <br /><br />
            위와 같이 개인정보를 수집/이용하는데 동의합니다. 
        </div>
        <!-- //내용노출 -->
        
    </div>
<!--//팝업-->
</body>
</html>`
/*
const privacyPolicyContents = `
<html>
<head>
  <meta content="text/html; charset=UTF-8" http-equiv="content-type">
  <style type="text/css">.lst-kix_list_4-1 > li {
    counter-increment: lst-ctn-kix_list_4-1
  }

  ol.lst-kix_list_3-1 {
    list-style-type: none
  }

  ol.lst-kix_list_3-2 {
    list-style-type: none
  }

  .lst-kix_list_3-1 > li {
    counter-increment: lst-ctn-kix_list_3-1
  }

  ol.lst-kix_list_3-3 {
    list-style-type: none
  }

  ol.lst-kix_list_3-4.start {
    counter-reset: lst-ctn-kix_list_3-4 0
  }

  .lst-kix_list_5-1 > li {
    counter-increment: lst-ctn-kix_list_5-1
  }

  ol.lst-kix_list_3-4 {
    list-style-type: none
  }

  .lst-kix_list_2-1 > li {
    counter-increment: lst-ctn-kix_list_2-1
  }

  ol.lst-kix_list_3-0 {
    list-style-type: none
  }

  .lst-kix_list_1-1 > li {
    counter-increment: lst-ctn-kix_list_1-1
  }

  ol.lst-kix_list_2-6.start {
    counter-reset: lst-ctn-kix_list_2-6 0
  }

  .lst-kix_list_3-0 > li:before {
    content: "" counter(lst-ctn-kix_list_3-0, decimal) " "
  }

  ol.lst-kix_list_3-1.start {
    counter-reset: lst-ctn-kix_list_3-1 0
  }

  .lst-kix_list_3-1 > li:before {
    content: "" counter(lst-ctn-kix_list_3-1, upper-latin) ". "
  }

  .lst-kix_list_3-2 > li:before {
    content: "" counter(lst-ctn-kix_list_3-2, lower-roman) ". "
  }

  ol.lst-kix_list_1-8.start {
    counter-reset: lst-ctn-kix_list_1-8 0
  }

  .lst-kix_list_4-0 > li {
    counter-increment: lst-ctn-kix_list_4-0
  }

  .lst-kix_list_5-0 > li {
    counter-increment: lst-ctn-kix_list_5-0
  }

  ol.lst-kix_list_2-3.start {
    counter-reset: lst-ctn-kix_list_2-3 0
  }

  .lst-kix_list_3-5 > li:before {
    content: "" counter(lst-ctn-kix_list_3-5, lower-roman) ". "
  }

  .lst-kix_list_3-4 > li:before {
    content: "" counter(lst-ctn-kix_list_3-4, upper-latin) ". "
  }

  ol.lst-kix_list_1-5.start {
    counter-reset: lst-ctn-kix_list_1-5 0
  }

  .lst-kix_list_3-3 > li:before {
    content: "" counter(lst-ctn-kix_list_3-3, decimal) ". "
  }

  ol.lst-kix_list_3-5 {
    list-style-type: none
  }

  ol.lst-kix_list_3-6 {
    list-style-type: none
  }

  ol.lst-kix_list_3-7 {
    list-style-type: none
  }

  ol.lst-kix_list_3-8 {
    list-style-type: none
  }

  .lst-kix_list_3-8 > li:before {
    content: "" counter(lst-ctn-kix_list_3-8, lower-roman) ". "
  }

  .lst-kix_list_2-0 > li {
    counter-increment: lst-ctn-kix_list_2-0
  }

  ol.lst-kix_list_5-3.start {
    counter-reset: lst-ctn-kix_list_5-3 0
  }

  .lst-kix_list_2-3 > li {
    counter-increment: lst-ctn-kix_list_2-3
  }

  .lst-kix_list_3-6 > li:before {
    content: "" counter(lst-ctn-kix_list_3-6, decimal) ". "
  }

  .lst-kix_list_4-3 > li {
    counter-increment: lst-ctn-kix_list_4-3
  }

  .lst-kix_list_3-7 > li:before {
    content: "" counter(lst-ctn-kix_list_3-7, upper-latin) ". "
  }

  ol.lst-kix_list_4-5.start {
    counter-reset: lst-ctn-kix_list_4-5 0
  }

  ol.lst-kix_list_5-0.start {
    counter-reset: lst-ctn-kix_list_5-0 0
  }

  .lst-kix_list_1-2 > li {
    counter-increment: lst-ctn-kix_list_1-2
  }

  ol.lst-kix_list_3-7.start {
    counter-reset: lst-ctn-kix_list_3-7 0
  }

  .lst-kix_list_5-2 > li {
    counter-increment: lst-ctn-kix_list_5-2
  }

  ol.lst-kix_list_4-2.start {
    counter-reset: lst-ctn-kix_list_4-2 0
  }

  .lst-kix_list_3-2 > li {
    counter-increment: lst-ctn-kix_list_3-2
  }

  ol.lst-kix_list_2-2 {
    list-style-type: none
  }

  ol.lst-kix_list_2-3 {
    list-style-type: none
  }

  .lst-kix_list_5-0 > li:before {
    content: "" counter(lst-ctn-kix_list_5-0, decimal) ". "
  }

  ol.lst-kix_list_2-4 {
    list-style-type: none
  }

  ol.lst-kix_list_2-5 {
    list-style-type: none
  }

  .lst-kix_list_5-4 > li {
    counter-increment: lst-ctn-kix_list_5-4
  }

  .lst-kix_list_1-4 > li {
    counter-increment: lst-ctn-kix_list_1-4
  }

  .lst-kix_list_4-4 > li {
    counter-increment: lst-ctn-kix_list_4-4
  }

  ol.lst-kix_list_2-0 {
    list-style-type: none
  }

  ol.lst-kix_list_1-6.start {
    counter-reset: lst-ctn-kix_list_1-6 0
  }

  ol.lst-kix_list_2-1 {
    list-style-type: none
  }

  .lst-kix_list_4-8 > li:before {
    content: "" counter(lst-ctn-kix_list_4-8, lower-roman) ". "
  }

  .lst-kix_list_5-3 > li:before {
    content: "" counter(lst-ctn-kix_list_5-3, decimal) ". "
  }

  .lst-kix_list_4-7 > li:before {
    content: "" counter(lst-ctn-kix_list_4-7, upper-latin) ". "
  }

  .lst-kix_list_5-2 > li:before {
    content: "" counter(lst-ctn-kix_list_5-2, lower-roman) ". "
  }

  .lst-kix_list_5-1 > li:before {
    content: "" counter(lst-ctn-kix_list_5-1, upper-latin) ". "
  }

  .lst-kix_list_5-7 > li:before {
    content: "" counter(lst-ctn-kix_list_5-7, upper-latin) ". "
  }

  ol.lst-kix_list_5-6.start {
    counter-reset: lst-ctn-kix_list_5-6 0
  }

  .lst-kix_list_5-6 > li:before {
    content: "" counter(lst-ctn-kix_list_5-6, decimal) ". "
  }

  .lst-kix_list_5-8 > li:before {
    content: "" counter(lst-ctn-kix_list_5-8, lower-roman) ". "
  }

  ol.lst-kix_list_4-1.start {
    counter-reset: lst-ctn-kix_list_4-1 0
  }

  ol.lst-kix_list_4-8.start {
    counter-reset: lst-ctn-kix_list_4-8 0
  }

  ol.lst-kix_list_3-3.start {
    counter-reset: lst-ctn-kix_list_3-3 0
  }

  .lst-kix_list_5-4 > li:before {
    content: "" counter(lst-ctn-kix_list_5-4, upper-latin) ". "
  }

  .lst-kix_list_5-5 > li:before {
    content: "" counter(lst-ctn-kix_list_5-5, lower-roman) ". "
  }

  ol.lst-kix_list_2-6 {
    list-style-type: none
  }

  ol.lst-kix_list_2-7 {
    list-style-type: none
  }

  ol.lst-kix_list_2-8 {
    list-style-type: none
  }

  ol.lst-kix_list_1-0.start {
    counter-reset: lst-ctn-kix_list_1-0 0
  }

  .lst-kix_list_3-0 > li {
    counter-increment: lst-ctn-kix_list_3-0
  }

  .lst-kix_list_3-3 > li {
    counter-increment: lst-ctn-kix_list_3-3
  }

  ol.lst-kix_list_4-0.start {
    counter-reset: lst-ctn-kix_list_4-0 0
  }

  .lst-kix_list_3-6 > li {
    counter-increment: lst-ctn-kix_list_3-6
  }

  .lst-kix_list_2-5 > li {
    counter-increment: lst-ctn-kix_list_2-5
  }

  .lst-kix_list_2-8 > li {
    counter-increment: lst-ctn-kix_list_2-8
  }

  ol.lst-kix_list_3-2.start {
    counter-reset: lst-ctn-kix_list_3-2 0
  }

  ol.lst-kix_list_5-5.start {
    counter-reset: lst-ctn-kix_list_5-5 0
  }

  .lst-kix_list_2-2 > li {
    counter-increment: lst-ctn-kix_list_2-2
  }

  ol.lst-kix_list_2-4.start {
    counter-reset: lst-ctn-kix_list_2-4 0
  }

  ol.lst-kix_list_4-7.start {
    counter-reset: lst-ctn-kix_list_4-7 0
  }

  ol.lst-kix_list_1-3 {
    list-style-type: none
  }

  ol.lst-kix_list_5-0 {
    list-style-type: none
  }

  ol.lst-kix_list_1-4 {
    list-style-type: none
  }

  .lst-kix_list_2-6 > li:before {
    content: "" counter(lst-ctn-kix_list_2-6, decimal) ". "
  }

  .lst-kix_list_2-7 > li:before {
    content: "" counter(lst-ctn-kix_list_2-7, upper-latin) ". "
  }

  .lst-kix_list_2-7 > li {
    counter-increment: lst-ctn-kix_list_2-7
  }

  .lst-kix_list_3-7 > li {
    counter-increment: lst-ctn-kix_list_3-7
  }

  ol.lst-kix_list_5-1 {
    list-style-type: none
  }

  ol.lst-kix_list_1-5 {
    list-style-type: none
  }

  ol.lst-kix_list_5-2 {
    list-style-type: none
  }

  ol.lst-kix_list_1-6 {
    list-style-type: none
  }

  ol.lst-kix_list_1-0 {
    list-style-type: none
  }

  .lst-kix_list_2-4 > li:before {
    content: "" counter(lst-ctn-kix_list_2-4, upper-latin) ". "
  }

  .lst-kix_list_2-5 > li:before {
    content: "" counter(lst-ctn-kix_list_2-5, lower-roman) ". "
  }

  .lst-kix_list_2-8 > li:before {
    content: "" counter(lst-ctn-kix_list_2-8, lower-roman) ". "
  }

  ol.lst-kix_list_1-1 {
    list-style-type: none
  }

  ol.lst-kix_list_1-2 {
    list-style-type: none
  }

  ol.lst-kix_list_5-4.start {
    counter-reset: lst-ctn-kix_list_5-4 0
  }

  ol.lst-kix_list_4-6.start {
    counter-reset: lst-ctn-kix_list_4-6 0
  }

  ol.lst-kix_list_5-1.start {
    counter-reset: lst-ctn-kix_list_5-1 0
  }

  ol.lst-kix_list_3-0.start {
    counter-reset: lst-ctn-kix_list_3-0 0
  }

  ol.lst-kix_list_5-7 {
    list-style-type: none
  }

  ol.lst-kix_list_5-8 {
    list-style-type: none
  }

  .lst-kix_list_5-7 > li {
    counter-increment: lst-ctn-kix_list_5-7
  }

  ol.lst-kix_list_4-3.start {
    counter-reset: lst-ctn-kix_list_4-3 0
  }

  ol.lst-kix_list_5-3 {
    list-style-type: none
  }

  ol.lst-kix_list_1-7 {
    list-style-type: none
  }

  .lst-kix_list_4-7 > li {
    counter-increment: lst-ctn-kix_list_4-7
  }

  ol.lst-kix_list_5-4 {
    list-style-type: none
  }

  .lst-kix_list_1-7 > li {
    counter-increment: lst-ctn-kix_list_1-7
  }

  ol.lst-kix_list_1-8 {
    list-style-type: none
  }

  ol.lst-kix_list_3-8.start {
    counter-reset: lst-ctn-kix_list_3-8 0
  }

  ol.lst-kix_list_5-5 {
    list-style-type: none
  }

  ol.lst-kix_list_5-6 {
    list-style-type: none
  }

  ol.lst-kix_list_2-5.start {
    counter-reset: lst-ctn-kix_list_2-5 0
  }

  .lst-kix_list_5-8 > li {
    counter-increment: lst-ctn-kix_list_5-8
  }

  .lst-kix_list_4-0 > li:before {
    content: "" counter(lst-ctn-kix_list_4-0, decimal) " "
  }

  .lst-kix_list_2-6 > li {
    counter-increment: lst-ctn-kix_list_2-6
  }

  .lst-kix_list_3-8 > li {
    counter-increment: lst-ctn-kix_list_3-8
  }

  .lst-kix_list_4-1 > li:before {
    content: "" counter(lst-ctn-kix_list_4-1, upper-latin) ". "
  }

  .lst-kix_list_4-6 > li {
    counter-increment: lst-ctn-kix_list_4-6
  }

  ol.lst-kix_list_1-7.start {
    counter-reset: lst-ctn-kix_list_1-7 0
  }

  .lst-kix_list_4-4 > li:before {
    content: "" counter(lst-ctn-kix_list_4-4, upper-latin) ". "
  }

  ol.lst-kix_list_2-2.start {
    counter-reset: lst-ctn-kix_list_2-2 0
  }

  .lst-kix_list_1-5 > li {
    counter-increment: lst-ctn-kix_list_1-5
  }

  .lst-kix_list_4-3 > li:before {
    content: "" counter(lst-ctn-kix_list_4-3, decimal) ". "
  }

  .lst-kix_list_4-5 > li:before {
    content: "" counter(lst-ctn-kix_list_4-5, lower-roman) ". "
  }

  .lst-kix_list_4-2 > li:before {
    content: "" counter(lst-ctn-kix_list_4-2, lower-roman) ". "
  }

  .lst-kix_list_4-6 > li:before {
    content: "" counter(lst-ctn-kix_list_4-6, decimal) ". "
  }

  ol.lst-kix_list_5-7.start {
    counter-reset: lst-ctn-kix_list_5-7 0
  }

  .lst-kix_list_1-8 > li {
    counter-increment: lst-ctn-kix_list_1-8
  }

  ol.lst-kix_list_1-4.start {
    counter-reset: lst-ctn-kix_list_1-4 0
  }

  .lst-kix_list_5-5 > li {
    counter-increment: lst-ctn-kix_list_5-5
  }

  .lst-kix_list_3-5 > li {
    counter-increment: lst-ctn-kix_list_3-5
  }

  ol.lst-kix_list_1-1.start {
    counter-reset: lst-ctn-kix_list_1-1 0
  }

  ol.lst-kix_list_4-0 {
    list-style-type: none
  }

  .lst-kix_list_3-4 > li {
    counter-increment: lst-ctn-kix_list_3-4
  }

  ol.lst-kix_list_4-1 {
    list-style-type: none
  }

  ol.lst-kix_list_4-4.start {
    counter-reset: lst-ctn-kix_list_4-4 0
  }

  ol.lst-kix_list_4-2 {
    list-style-type: none
  }

  ol.lst-kix_list_4-3 {
    list-style-type: none
  }

  .lst-kix_list_2-4 > li {
    counter-increment: lst-ctn-kix_list_2-4
  }

  ol.lst-kix_list_3-6.start {
    counter-reset: lst-ctn-kix_list_3-6 0
  }

  .lst-kix_list_5-3 > li {
    counter-increment: lst-ctn-kix_list_5-3
  }

  ol.lst-kix_list_1-3.start {
    counter-reset: lst-ctn-kix_list_1-3 0
  }

  ol.lst-kix_list_2-8.start {
    counter-reset: lst-ctn-kix_list_2-8 0
  }

  ol.lst-kix_list_1-2.start {
    counter-reset: lst-ctn-kix_list_1-2 0
  }

  ol.lst-kix_list_4-8 {
    list-style-type: none
  }

  .lst-kix_list_1-0 > li:before {
    content: "" counter(lst-ctn-kix_list_1-0, decimal) " "
  }

  ol.lst-kix_list_4-4 {
    list-style-type: none
  }

  ol.lst-kix_list_4-5 {
    list-style-type: none
  }

  .lst-kix_list_1-1 > li:before {
    content: "" counter(lst-ctn-kix_list_1-1, upper-latin) ". "
  }

  .lst-kix_list_1-2 > li:before {
    content: "" counter(lst-ctn-kix_list_1-2, lower-roman) ". "
  }

  ol.lst-kix_list_2-0.start {
    counter-reset: lst-ctn-kix_list_2-0 0
  }

  ol.lst-kix_list_4-6 {
    list-style-type: none
  }

  ol.lst-kix_list_4-7 {
    list-style-type: none
  }

  .lst-kix_list_1-3 > li:before {
    content: "" counter(lst-ctn-kix_list_1-3, decimal) ". "
  }

  .lst-kix_list_1-4 > li:before {
    content: "" counter(lst-ctn-kix_list_1-4, upper-latin) ". "
  }

  ol.lst-kix_list_3-5.start {
    counter-reset: lst-ctn-kix_list_3-5 0
  }

  .lst-kix_list_1-0 > li {
    counter-increment: lst-ctn-kix_list_1-0
  }

  .lst-kix_list_4-8 > li {
    counter-increment: lst-ctn-kix_list_4-8
  }

  .lst-kix_list_1-6 > li {
    counter-increment: lst-ctn-kix_list_1-6
  }

  .lst-kix_list_1-7 > li:before {
    content: "" counter(lst-ctn-kix_list_1-7, upper-latin) ". "
  }

  ol.lst-kix_list_5-8.start {
    counter-reset: lst-ctn-kix_list_5-8 0
  }

  ol.lst-kix_list_2-7.start {
    counter-reset: lst-ctn-kix_list_2-7 0
  }

  .lst-kix_list_1-3 > li {
    counter-increment: lst-ctn-kix_list_1-3
  }

  .lst-kix_list_1-5 > li:before {
    content: "" counter(lst-ctn-kix_list_1-5, lower-roman) ". "
  }

  .lst-kix_list_1-6 > li:before {
    content: "" counter(lst-ctn-kix_list_1-6, decimal) ". "
  }

  .lst-kix_list_5-6 > li {
    counter-increment: lst-ctn-kix_list_5-6
  }

  .lst-kix_list_2-0 > li:before {
    content: "" counter(lst-ctn-kix_list_2-0, decimal) " "
  }

  .lst-kix_list_2-1 > li:before {
    content: "" counter(lst-ctn-kix_list_2-1, upper-latin) ". "
  }

  ol.lst-kix_list_2-1.start {
    counter-reset: lst-ctn-kix_list_2-1 0
  }

  .lst-kix_list_4-5 > li {
    counter-increment: lst-ctn-kix_list_4-5
  }

  .lst-kix_list_1-8 > li:before {
    content: "" counter(lst-ctn-kix_list_1-8, lower-roman) ". "
  }

  .lst-kix_list_2-2 > li:before {
    content: "" counter(lst-ctn-kix_list_2-2, lower-roman) ". "
  }

  .lst-kix_list_2-3 > li:before {
    content: "" counter(lst-ctn-kix_list_2-3, decimal) ". "
  }

  .lst-kix_list_4-2 > li {
    counter-increment: lst-ctn-kix_list_4-2
  }

  ol.lst-kix_list_5-2.start {
    counter-reset: lst-ctn-kix_list_5-2 0
  }

  ol {
    margin: 0;
    padding: 0
  }

  table td, table th {
    padding: 0
  }

  .c4 {
    border-right-style: solid;
    padding: 0pt 5.4pt 0pt 5.4pt;
    border-bottom-color: #000000;
    border-top-width: 1pt;
    border-right-width: 1pt;
    border-left-color: #000000;
    vertical-align: middle;
    border-right-color: #000000;
    border-left-width: 1pt;
    border-top-style: solid;
    background-color: #f2f2f2;
    border-left-style: solid;
    border-bottom-width: 1pt;
    width: 150.2pt;
    border-top-color: #000000;
    border-bottom-style: solid
  }

  .c5 {
    border-right-style: solid;
    padding: 0pt 5.4pt 0pt 5.4pt;
    border-bottom-color: #000000;
    border-top-width: 1pt;
    border-right-width: 1pt;
    border-left-color: #000000;
    vertical-align: middle;
    border-right-color: #000000;
    border-left-width: 1pt;
    border-top-style: solid;
    background-color: #f2f2f2;
    border-left-style: solid;
    border-bottom-width: 1pt;
    width: 133.3pt;
    border-top-color: #000000;
    border-bottom-style: solid
  }

  .c16 {
    border-right-style: solid;
    padding: 0pt 5.4pt 0pt 5.4pt;
    border-bottom-color: #000000;
    border-top-width: 1pt;
    border-right-width: 1pt;
    border-left-color: #000000;
    vertical-align: middle;
    border-right-color: #000000;
    border-left-width: 1pt;
    border-top-style: solid;
    border-left-style: solid;
    border-bottom-width: 1pt;
    width: 144.5pt;
    border-top-color: #000000;
    border-bottom-style: solid
  }

  .c6 {
    border-right-style: solid;
    padding: 0pt 5.4pt 0pt 5.4pt;
    border-bottom-color: #000000;
    border-top-width: 1pt;
    border-right-width: 1pt;
    border-left-color: #000000;
    vertical-align: middle;
    border-right-color: #000000;
    border-left-width: 1pt;
    border-top-style: solid;
    border-left-style: solid;
    border-bottom-width: 1pt;
    width: 75.4pt;
    border-top-color: #000000;
    border-bottom-style: solid
  }

  .c3 {
    border-right-style: solid;
    padding: 0pt 5.4pt 0pt 5.4pt;
    border-bottom-color: #000000;
    border-top-width: 1pt;
    border-right-width: 1pt;
    border-left-color: #000000;
    vertical-align: middle;
    border-right-color: #000000;
    border-left-width: 1pt;
    border-top-style: solid;
    border-left-style: solid;
    border-bottom-width: 1pt;
    width: 225.2pt;
    border-top-color: #000000;
    border-bottom-style: solid
  }

  .c11 {
    border-right-style: solid;
    padding: 0pt 5.4pt 0pt 5.4pt;
    border-bottom-color: #000000;
    border-top-width: 1pt;
    border-right-width: 1pt;
    border-left-color: #000000;
    vertical-align: middle;
    border-right-color: #000000;
    border-left-width: 1pt;
    border-top-style: solid;
    border-left-style: solid;
    border-bottom-width: 1pt;
    width: 150.2pt;
    border-top-color: #000000;
    border-bottom-style: solid
  }

  .c17 {
    border-right-style: solid;
    padding: 0pt 5.4pt 0pt 5.4pt;
    border-bottom-color: #000000;
    border-top-width: 1pt;
    border-right-width: 1pt;
    border-left-color: #000000;
    vertical-align: middle;
    border-right-color: #000000;
    border-left-width: 1pt;
    border-top-style: solid;
    border-left-style: solid;
    border-bottom-width: 1pt;
    width: 155.7pt;
    border-top-color: #000000;
    border-bottom-style: solid
  }

  .c15 {
    border-right-style: solid;
    padding: 0pt 5.4pt 0pt 5.4pt;
    border-bottom-color: #000000;
    border-top-width: 1pt;
    border-right-width: 1pt;
    border-left-color: #000000;
    vertical-align: middle;
    border-right-color: #000000;
    border-left-width: 1pt;
    border-top-style: solid;
    border-left-style: solid;
    border-bottom-width: 1pt;
    width: 133.3pt;
    border-top-color: #000000;
    border-bottom-style: solid
  }

  .c13 {
    color: #000000;
    font-weight: 700;
    text-decoration: none;
    vertical-align: baseline;
    font-size: 10pt;
    font-family: "Malgun Gothic";
    font-style: normal
  }

  .c2 {
    color: #000000;
    font-weight: 400;
    text-decoration: none;
    vertical-align: baseline;
    font-size: 10pt;
    font-family: "Malgun Gothic";
    font-style: normal
  }

  .c0 {
    padding-top: 0pt;
    padding-bottom: 8pt;
    line-height: 1.0;
    text-align: justify
  }

  .c1 {
    padding-top: 0pt;
    padding-bottom: 0pt;
    line-height: 1.0;
    text-align: center
  }

  .c14 {
    padding-top: 0pt;
    padding-bottom: 0pt;
    line-height: 1.15;
    text-align: left
  }

  .c19 {
    margin-left: -5.4pt;
    border-spacing: 0;
    border-collapse: collapse;
    margin-right: auto
  }

  .c7 {
    background-color: #ffffff;
    max-width: 451.3pt;
    padding: 85pt 72pt 72pt 72pt
  }

  .c12 {
    background-color: #f2f2f2
  }

  .c9 {
    height: 0pt
  }

  .c10 {
    height: 19.9pt
  }

  .c18 {
    height: 120.6pt
  }

  .c8 {
    height: 10pt
  }

  .title {
    padding-top: 24pt;
    color: #000000;
    font-weight: 700;
    font-size: 36pt;
    padding-bottom: 6pt;
    font-family: "Malgun Gothic";
    line-height: 1.0791666666666666;
    page-break-after: avoid;
    text-align: justify
  }

  .subtitle {
    padding-top: 18pt;
    color: #666666;
    font-size: 24pt;
    padding-bottom: 4pt;
    font-family: "Georgia";
    line-height: 1.0791666666666666;
    page-break-after: avoid;
    font-style: italic;
    text-align: justify
  }

  li {
    color: #000000;
    font-size: 10pt;
    font-family: "Malgun Gothic"
  }

  p {
    margin: 0;
    color: #000000;
    font-size: 10pt;
    font-family: "Malgun Gothic"
  }

  h1 {
    padding-top: 24pt;
    color: #000000;
    font-weight: 700;
    font-size: 24pt;
    padding-bottom: 6pt;
    font-family: "Malgun Gothic";
    line-height: 1.0791666666666666;
    page-break-after: avoid;
    text-align: justify
  }

  h2 {
    padding-top: 18pt;
    color: #000000;
    font-weight: 700;
    font-size: 18pt;
    padding-bottom: 4pt;
    font-family: "Malgun Gothic";
    line-height: 1.0791666666666666;
    page-break-after: avoid;
    text-align: justify
  }

  h3 {
    padding-top: 14pt;
    color: #000000;
    font-weight: 700;
    font-size: 14pt;
    padding-bottom: 4pt;
    font-family: "Malgun Gothic";
    line-height: 1.0791666666666666;
    page-break-after: avoid;
    text-align: justify
  }

  h4 {
    padding-top: 12pt;
    color: #000000;
    font-weight: 700;
    font-size: 12pt;
    padding-bottom: 2pt;
    font-family: "Malgun Gothic";
    line-height: 1.0791666666666666;
    page-break-after: avoid;
    text-align: justify
  }

  h5 {
    padding-top: 11pt;
    color: #000000;
    font-weight: 700;
    font-size: 11pt;
    padding-bottom: 2pt;
    font-family: "Malgun Gothic";
    line-height: 1.0791666666666666;
    page-break-after: avoid;
    text-align: justify
  }

  h6 {
    padding-top: 10pt;
    color: #000000;
    font-weight: 700;
    font-size: 10pt;
    padding-bottom: 2pt;
    font-family: "Malgun Gothic";
    line-height: 1.0791666666666666;
    page-break-after: avoid;
    text-align: justify
  }</style>
</head>
<body class="c7"><p class="c0"><span class="c13">&#44060;&#51064;&#51221;&#48372;&#51032; &#49688;&#51665; &#54637;&#47785; &#48143; &#51060;&#50857; &#47785;&#51201;</span>
</p>
<p class="c0"><span class="c2">&#54924;&#49324;&#45716; &#45796;&#50577;&#54616;&#44256; &#54200;&#47532;&#54620; &#51064;&#53552;&#45367; &#49436;&#48708;&#49828;&#47484; &#51228;&#44277;&#54616;&#44592; &#50948;&#54616;&#50668; &#50500;&#47000;&#50752; &#44057;&#51008; &#47785;&#51201;&#51004;&#47196; &#44060;&#51064;&#51221;&#48372;&#47484; &#49688;&#51665; &#48143; &#51060;&#50857;&#54616;&#44256; &#51080;&#49845;&#45768;&#45796;.</span>
</p>
<p class="c0"><span class="c2">&#54924;&#49324;&#44032; &#51228;&#44277;&#54616;&#45716; &#49436;&#48708;&#49828; &#51060;&#50857;&#44284;&#51221;&#50640;&#49436; &#54924;&#50896; &#48376;&#51064;&#51060; &#51088;&#48156;&#51201;&#51004;&#47196; &#44277;&#44060;&#54620; &#44060;&#51064;&#51221;&#48372; &#48143; &#44172;&#49884;&#47932;&#44284; &#44288;&#47144;&#54620; &#44428;&#47532;&#50752; &#52293;&#51076;&#51008; &#51089;&#49457;&#51088; &#48376;&#51064;&#50640;&#44172; &#51080;&#49845;&#45768;&#45796;. &#51088;&#48156;&#51201;&#51004;&#47196; &#44277;&#44060;&#46108; &#51221;&#48372;&#45716; &#48372;&#54840;&#48155;&#44592; &#50612;&#47140;&#50864;&#47728; &#53440;&#51064;&#50640; &#51032;&#54644; &#47924;&#45800;&#51004;&#47196; &#49688;&#51665;&#46104;&#44144;&#45208; &#52376;&#47532;&#46112; &#49688; &#51080;&#51004;&#47728;, &#51060;&#47196; &#51064;&#54644; &#48156;&#49373;&#54620; &#49552;&#49892;&#51060;&#45208; &#47928;&#51228;&#45716; &#51204;&#51201;&#51004;&#47196; &#48376;&#51064;&#50640;&#44172; &#51080;&#51020;&#51012; &#50976;&#45392;&#54616;&#49884;&#44592; &#48148;&#46989;&#45768;&#45796;. &#49436;&#48708;&#49828; &#51060;&#50857;&#44284;&#51221;&#50640;&#49436; &#44060;&#51064;&#50640; &#44288;&#54620; &#51221;&#48372;&#45716; &#44277;&#44060;&#46104;&#51648; &#50506;&#46020;&#47197; &#49900;&#54792;&#51012; &#44592;&#50872;&#50668; &#51452;&#49884;&#44592; &#48148;&#46989;&#45768;&#45796;. &#54924;&#49324;&#45716; &#45796;&#51020; &#47785;&#51201; &#51060;&#50808;&#47196;&#45716; &#44060;&#51064;&#51221;&#48372;&#47484; &#51060;&#50857;&#54616;&#51648; &#50506;&#51004;&#47728;, &#54924;&#49324;&#50640;&#49436; &#51228;&#44277;&#54616;&#45716; &#49436;&#48708;&#49828;&#51032; &#47785;&#51201;&#51060; &#48320;&#44221;&#46104;&#45716; &#44221;&#50864; &#48324;&#46020;&#51032; &#46041;&#51032;&#47484; &#48155;&#45716; &#46321; &#54596;&#50836;&#54620; &#51312;&#52824;&#47484; &#54633;&#45768;&#45796;.</span>
</p>
<p class="c0"><span class="c2">&#9312; &#54924;&#50896;&#44032;&#51077;, &#51452;&#47928; &#46321; &#49436;&#48708;&#49828; &#51060;&#50857; &#49884; &#49688;&#51665;&#46104;&#45716; &#51221;&#48372;</span>
</p>
<p class="c0"><span class="c2">- &#54924;&#50896;&#44032;&#51077; : (&#54596;&#49688;&#54637;&#47785;) &#51060;&#47492;, &#55092;&#45824;&#54256;&#48264;&#54840;, &#50500;&#51060;&#46356;, &#48708;&#48128;&#48264;&#54840;, &#51473;&#48373;&#44032;&#51077;&#54869;&#51064;&#51221;&#48372;(DI)</span>
</p>
<p class="c0"><span class="c2">- (선택항목) 성별, 생년월일</span>
</p>
<p class="c0"><span
  class="c2">*&#45348;&#51060;&#48260; &#44036;&#54200;&#54924;&#50896; &#44032;&#51077; &#49884;</span></p>
<p class="c0"><span class="c2">(&#54596;&#49688;&#54637;&#47785;) &#51060;&#50857;&#51088; &#44256;&#50976; &#49885;&#48324;&#51088;, &#51060;&#47492;, &#51060;&#47700;&#51068;</span>
</p>
<p class="c0"><span class="c2">(&#49440;&#53469;&#54637;&#47785;) &#49457;&#48324;, &#49373;&#51068;, &#50672;&#47161;&#45824;, &#50672;&#44228;&#51221;&#48372;(CI), &#54532;&#47196;&#54596;&#49324;&#51652;, &#48324;&#47749;</span>
</p>
<p class="c0"><span
  class="c2">*&#52852;&#52852;&#50724; &#44036;&#54200;&#54924;&#50896; &#44032;&#51077; &#49884;</span></p>
<p class="c0"><span class="c2">(&#54596;&#49688;&#54637;&#47785;) &#54532;&#47196;&#54596; &#51221;&#48372;(&#45769;&#45348;&#51076;/&#54532;&#47196;&#54596; &#49324;&#51652;), &#49457;&#48324;, &#50672;&#44228;&#51221;&#48372;(CI), &#52852;&#52852;&#50724;&#44228;&#51221;(&#51204;&#54868;&#48264;&#54840;), &#52636;&#49373; &#50672;&#46020;, &#54540;&#47084;&#49828;&#52828;&#44396; &#52628;&#44032; &#49345;&#53468; &#48143; &#45236;&#50669;, &#49373;&#51068;</span>
</p>
<p class="c0"><span class="c2">(&#49440;&#53469;&#54637;&#47785;) &#52852;&#52852;&#50724;&#44228;&#51221;(&#51060;&#47700;&#51068;), &#50672;&#47161;&#45824;</span>
</p>
<p class="c0"><span class="c2">*&#50528;&#54540; &#44036;&#54200;&#54924;&#50896; &#44032;&#51077; &#49884;</span></p>
<p class="c0"><span class="c2">(&#54596;&#49688;&#54637;&#47785;] &#50528;&#54540; &#51060;&#50857;&#51088; &#49885;&#48324; ID</span>
</p>
<p class="c0"><span class="c2">(&#49440;&#53469;&#54637;&#47785;) &#51060;&#47700;&#51068;</span></p>
<p class="c0"><span class="c2">&#8251;&#45348;&#51060;&#48260;/&#52852;&#52852;&#50724;/&#50528;&#54540;&#47196;&#48512;&#53552; &#51228;&#44277;&#48155;&#51008; &#51221;&#48372;&#45716; &#54924;&#50896;&#44032;&#51077; &#45800;&#44228;&#50640;&#47564; &#51060;&#50857;&#54616;&#47728;, &#54924;&#50896;&#44032;&#51077;&#51060; &#51652;&#54665;&#46104;&#51648; &#50506;&#51008; &#44221;&#50864; &#51593;&#49884; &#54028;&#44592;&#54633;&#45768;&#45796;.(&#45817;&#49324;&#45716; &#54924;&#50896;&#44032;&#51077; &#51208;&#52264;&#47484; &#53685;&#54644; &#44256;&#44061;&#51060; &#46041;&#51032;&#54620; &#44221;&#50864;&#50640; &#54620;&#54616;&#50668; &#44060;&#51064;&#51221;&#48372;&#47484; &#48372;&#44288;&#54633;&#45768;&#45796;.)</span>
</p>
<p class="c0"><span class="c2">- &#47932;&#54408; &#48176;&#49569; : (&#54596;&#49688;&#54637;&#47785;) &#51452;&#47928;&#51088;&#47749;. &#55092;&#45824;&#54256;&#48264;&#54840;, &#47700;&#51068; &#51452;&#49548;, &#49688;&#47161;&#51064;&#47749;, &#50672;&#46973;&#52376;, &#48176;&#49569;&#51648; &#51452;&#49548;</span>
</p>
<p class="c0"><span class="c2">- &#47932;&#54408; &#54924;&#49688; : (&#54596;&#49688;&#54637;&#47785;) &#51452;&#47928;&#51088;&#47749;. &#55092;&#45824;&#54256;&#48264;&#54840;, &#47700;&#51068; &#51452;&#49548;, &#49688;&#47161;&#51064;&#47749;, &#50672;&#46973;&#52376;, &#48176;&#49569;&#51648; &#51452;&#49548;</span>
</p>
<p class="c0"><span class="c2">- &#45824;&#44552; &#44208;&#51228; : (&#54596;&#49688;&#54637;&#47785;) &#49888;&#50857;&#52852;&#46300;&#51221;&#48372;, &#51008;&#54665;&#44228;&#51340;&#51221;&#48372;</span>
</p>
<p class="c0"><span class="c2">- &#49436;&#48708;&#49828; &#51060;&#50857; &#46608;&#45716; &#50629;&#47924;&#52376;&#47532;&#44284;&#51221;&#50640;&#49436; &#51088;&#46041;&#51004;&#47196; &#49373;&#49457;&#46104;&#50612; &#49688;&#51665;&#46104;&#45716; &#51221;&#48372; : (&#54596;&#49688;&#54637;&#47785;) &#51217;&#49549; IP &#51221;&#48372;, &#53216;&#53412;(Cookie), &#49436;&#48708;&#49828; &#51060;&#50857; &#44592;&#47197;, &#51217;&#49549; &#47196;&#44536;, &#44208;&#51228;&#44592;&#47197;, &#51060;&#50857;&#51221;&#51648;&#44592;&#47197;</span>
</p>
<p class="c0"><span class="c2">- &#54872;&#48520;&#52376;&#47532; : (&#54596;&#49688;&#54637;&#47785;) &#50696;&#44552;&#51452;&#47749;, &#54872;&#48520;&#44228;&#51340;</span>
</p>
<p class="c0"><span class="c2">- &#51228;&#55092;&#47928;&#51032; : (&#54596;&#49688;&#54637;&#47785;) &#50629;&#52404;&#47749;, &#45812;&#45817;&#51088;&#47749;, &#45812;&#45817;&#51088; &#51060;&#47700;&#51068;, &#50672;&#46973;&#52376;, &#47928;&#51032;&#45236;&#50857;</span>
</p>
<p class="c0"><span class="c2">- &#47784;&#48148;&#51068; &#44592;&#44592; &#51221;&#48372; : (&#54596;&#49688;&#54637;&#47785;) OS, &#44592;&#44592; &#49885;&#48324;&#51221;&#48372;, (&#49440;&#53469;&#54637;&#47785;) &#48652;&#46972;&#50864;&#51200; &#51221;&#48372;, &#44305;&#44256; &#49885;&#48324;&#51088;</span>
</p>
<p class="c0"><span class="c2">- &#48708;&#54924;&#50896; &#51452;&#47928;&#44208;&#51228;</span></p>
<p class="c0"><span class="c2">1) &#47932;&#54408; &#48176;&#49569;&#50640; &#44288;&#54620; &#51221;&#48372;: (&#54596;&#49688; &#54637;&#47785;) &#51452;&#47928;&#51088;&#47749;, &#55092;&#45824;&#54256;&#48264;&#54840;, &#47700;&#51068; &#51452;&#49548;, &#49688;&#47161;&#51064;&#47749;, &#50672;&#46973;&#52376;, &#48176;&#49569;&#51648; &#51452;&#49548;</span>
</p>
<p class="c0"><span class="c2">2) &#45824;&#44552; &#44208;&#51228;&#50640; &#44288;&#54620; &#51221;&#48372; : (&#54596;&#49688; &#54637;&#47785;) &#49888;&#50857;&#52852;&#46300;&#51221;&#48372;, &#51008;&#54665;&#44228;&#51340;&#51221;&#48372;</span>
</p>
<p class="c0"><span class="c2">3) &#49436;&#48708;&#49828; &#51060;&#50857; &#46608;&#45716; &#50629;&#47924;&#52376;&#47532;&#44284;&#51221;&#50640;&#49436; &#51088;&#46041;&#51004;&#47196; &#49373;&#49457;&#46104;&#50612; &#49688;&#51665;&#46104;&#45716; &#51221;&#48372; : (&#54596;&#49688; &#54637;&#47785;) &#51217;&#49549; IP &#51221;&#48372;, &#53216;&#53412;, &#49436;&#48708;&#49828; &#51060;&#50857; &#44592;&#47197;, &#51217;&#49549; &#47196;&#44536;</span>
</p>
<p class="c0"><span class="c2">- &#44592;&#53440;</span></p>
<p class="c0"><span class="c2">&#54924;&#49324;&#45716; &#48708;&#54924;&#50896; &#51452;&#47928;&#51032; &#44221;&#50864;&#50640;&#46020; &#48176;&#49569;, &#45824;&#44552;&#44208;&#51228;, &#51452;&#47928;&#45236;&#50669; &#51312;&#54924; &#48143; &#44396;&#47588;&#54869;&#51064;, &#49892;&#47749;&#50668;&#48512; &#54869;&#51064;&#51012; &#50948;&#54616;&#50668; &#54596;&#50836;&#54620; &#44060;&#51064;&#51221;&#48372;&#47564;&#51012; &#50836;&#52397;&#54616;&#44256; &#51080;&#51004;&#47728;, &#51060; &#44221;&#50864; &#44536; &#51221;&#48372;&#45716; &#45824;&#44552;&#44208;&#51228; &#48143; &#49345;&#54408;&#51032; &#48176;&#49569;&#50640; &#44288;&#47144;&#46108; &#50857;&#46020; &#51060;&#50808;&#50640;&#45716; &#45796;&#47480; &#50612;&#46496;&#54620; &#50857;&#46020;&#47196;&#46020; &#49324;&#50857;&#46104;&#51648; &#50506;&#49845;&#45768;&#45796;. &#48708;&#54924;&#50896;&#51004;&#47196; &#49436;&#48708;&#49828;&#47484; &#51060;&#50857;&#54616;&#45716; &#44221;&#50864; &#54924;&#50896;&#50640;&#44172;&#47564; &#51201;&#50857;&#46104;&#45716; &#49324;&#54637;&#51012; &#51228;&#50808;&#54620; &#45208;&#47672;&#51648; &#48512;&#48516;&#50640; &#45824;&#54616;&#50668;&#45716; &#54924;&#50896;&#44284; &#46041;&#51068;&#54616;&#44172; &#51060; &#44060;&#51064;&#51221;&#48372;&#52376;&#47532;&#48169;&#52840;&#51060; &#51201;&#50857;&#46121;&#45768;&#45796;.</span>
</p>
<p class="c0"><span class="c2">&#54924;&#49324;&#45716; &#54924;&#50896;&#44032;&#51077;&#51012; &#47564; 14&#49464; &#51060;&#49345;&#51064; &#44221;&#50864;&#50640;&#47564; &#44032;&#45733;&#54616;&#46020;&#47197; &#54616;&#47728;, &#44060;&#51064;&#51221;&#48372;&#51032; &#49688;&#51665; &#48143; &#51060;&#50857;&#50640; &#48277;&#51221;&#45824;&#47532;&#51064;&#51032; &#46041;&#51032;&#44032; &#54596;&#50836;&#54620; &#47564; 14&#49464; &#48120;&#47564; &#50500;&#46041;&#51032; &#44060;&#51064;&#51221;&#48372;&#45716; &#50896;&#52825;&#51201;&#51004;&#47196; &#49688;&#51665;&#54616;&#51648; &#50506;&#49845;&#45768;&#45796;. &#45800;, &#48277;&#51221;&#45824;&#47532;&#51064;&#51032; &#46041;&#51032;&#47484; &#50619;&#51008; &#44221;&#50864;&#50640;&#45716; &#47564; 14&#49464; &#48120;&#47564; &#51060;&#50857;&#51088;&#51032; &#44060;&#51064;&#51221;&#48372;&#47484; &#49688;&#51665; &#48143; &#51060;&#50857;&#54624; &#49688; &#51080;&#49845;&#45768;&#45796;.</span>
</p>
<p class="c0"><span class="c2">&#51060;&#48292;&#53944; &#51025;&#47784;&#44284;&#51221;&#50640;&#49436; &#54924;&#50896;&#44032;&#51077; &#49884; &#49688;&#51665;&#54616;&#51648; &#50506;&#50520;&#45912; &#44060;&#51064;&#51221;&#48372;&#47484; &#52628;&#44032;&#47196; &#49688;&#51665;&#54624; &#46412;&#50640; &#54924;&#49324;&#45716; &#54644;&#45817; &#54637;&#47785;&#51012; &#51060;&#50857;&#51088;&#46308;&#50640;&#44172; &#44256;&#51648;&#54616;&#44256; &#48324;&#46020;&#47196; &#46041;&#51032;&#47484; &#48155;&#50500; &#50629;&#47924;&#47484; &#52376;&#47532;&#54633;&#45768;&#45796;.</span>
</p>
<p class="c0 c8"><span class="c2"></span></p>
<p class="c0"><span class="c2">&#54924;&#49324;&#45716; &#44256;&#44061;&#45784;&#51060; &#51060;&#50857;&#54616;&#49884;&#45716; &#49345;&#54408;&#44160;&#49353;, &#51060;&#48292;&#53944;, &#49345;&#45812; &#46321; &#45796;&#50577;&#54620; &#49436;&#48708;&#49828; &#52292;&#45328;&#51012; &#53685;&#54644; &#53581;&#49828;&#53944;, &#51060;&#48120;&#51648;, &#51020;&#49457; &#46321;&#51032; &#44060;&#51064;&#51221;&#48372;&#47484; &#49688;&#51665; &#48143; &#51060;&#50857;&#54624; &#49688; &#51080;&#49845;&#45768;&#45796;. &#51060; &#44221;&#50864; &#49688;&#51665; &#48143; &#51060;&#50857;&#47785;&#51201;&#44284; &#54637;&#47785;, &#48372;&#50976;&#44592;&#44036; &#46321;&#51012; &#44256;&#51648;&#54616;&#44256; &#46041;&#51032;&#47484; &#48155;&#50500; &#52376;&#47532;&#54616;&#44256; &#51080;&#49845;&#45768;&#45796;. &#44305;&#44256;&#49457; &#51221;&#48372; &#49688;&#49888;&#50640; &#46041;&#51032;&#54616;&#49888; &#44256;&#44061;&#45784;&#44760;&#49436;&#45716; &#45208;&#51060;&#49828;&#53356;&#46989;&#50640;&#49436; &#51228;&#44277;&#54616;&#45716; &#51060;&#48292;&#53944;, &#54624;&#51064;&#54665;&#49324;, &#49888;&#44508;&#49345;&#54408; &#50504;&#45236; &#46321; &#45796;&#50577;&#54620; &#49436;&#48708;&#49828; &#48143; &#52572;&#49888; &#51221;&#48372;&#47484; &#50504;&#45236; &#48155;&#51004;&#49892; &#49688; &#51080;&#49845;&#45768;&#45796;.</span>
</p>
<p class="c0 c8"><span class="c2"></span></p>
<p class="c0"><span class="c2">&#9313; &#49436;&#48708;&#49828; &#51060;&#50857;&#44284;&#51221;&#50640;&#49436; &#49373;&#49457;&#46104;&#45716; &#51221;&#48372;</span>
</p>
<p class="c0"><span class="c2">&#54924;&#49324;&#45716; &#44256;&#44061;&#51032; &#50937; &#48143; &#50545; &#49436;&#48708;&#49828; &#51060;&#50857;&#44284;&#51221;&#50640;&#49436; &#50500;&#47000;&#50752; &#44057;&#51008; &#51221;&#48372;&#47484; &#49688;&#51665;&#54624; &#49688; &#51080;&#49845;&#45768;&#45796;.</span>
</p><a id="t.b48f46f752c337a3b9588e72fb1e940150685955"></a><a id="t.0"></a>
<table class="c19">
  <tbody>
  <tr class="c10">
    <td class="c12 c17" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#49688;&#51665; &#54637;&#47785;</span>
    </p></td>
    <td class="c5" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#51060;&#50857; &#47785;&#51201;</span></p>
    </td>
    <td class="c12 c16" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#48372;&#50976; &#44592;&#44036;</span>
    </p></td>
  </tr>
  <tr class="c18">
    <td class="c17" colspan="1" rowspan="1"><p class="c1"><span class="c2">IP&#51452;&#49548;, &#50937; &#48652;&#46972;&#50864;&#51200; &#53216;&#53412;(&#54924;&#50896;&#48264;&#54840; &#46321; &#51060;&#50857;&#51088; &#44256;&#50976; &#49885;&#48324;&#51088; &#54252;&#54632;), UserAgent, &#51217;&#49549;&#51068;&#49884;, &#47784;&#48148;&#51068; &#44592;&#44592;&#51221;&#48372;(&#51228;&#51312;&#49324;, &#47784;&#45944;, OS&#51221;&#48372;, &#50545;&#48260;&#51204;, UUID, &#44305;&#44256;&#49885;&#48324;&#51088; &#46321;), &#44592;&#53440; &#49436;&#48708;&#49828; &#51060;&#50857; &#44592;&#47197;</span>
    </p></td>
    <td class="c15" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#49436;&#48708;&#49828; &#51060;&#50857; &#44592;&#47197; &#53685;&#44228; &#48516;&#49437; &#46321; &#54408;&#51656; &#44288;&#47532;</span>
    </p>
      <p class="c1"><span class="c2">&#50504;&#51204;&#54620; &#44208;&#51228;&#47484; &#50948;&#54620; &#48372;&#50504;&#47196;&#51649; &#51201;&#50857;</span>
      </p>
      <p class="c1"><span class="c2">&#49548;&#48708;&#51088;&#48372;&#54840;&#47484; &#50948;&#54620; &#48277;&#51201; &#51032;&#47924; &#51456;&#49688; &#46321;</span>
      </p></td>
    <td class="c16" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#54924;&#50896; &#53448;&#53748; &#49884; &#46608;&#45716; &#48277;&#51221; &#51032;&#47924; &#48372;&#44288;&#44592;&#44036;</span>
    </p></td>
  </tr>
  </tbody>
</table>
<p class="c0"><span class="c2">&#8251; &#49436;&#48708;&#49828; &#51060;&#50857;&#44284;&#51221; &#51473; &#49373;&#49457;&#46104;&#45716; &#49345;&#45812;&#45236;&#50669; &#48143; &#44396;&#47588;&#44228;&#50557;&#44284; &#44288;&#47144;&#54620; &#44592;&#47197; &#46321;&#51008; &#48277;&#51221; &#51032;&#47924; &#51456;&#49688;&#47484; &#50948;&#54644; &#49688;&#51665;&#46121;&#45768;&#45796;.</span>
</p>
<p class="c0"><span class="c2">&#8251; &#51088;&#46041; &#49688;&#51665; &#49444;&#51221; &#44144;&#48512; &#48169;&#48277;</span>
</p>
<p class="c0"><span class="c2">- Android : &#49444;&#51221; &gt; Google &gt; &#44305;&#44256; &gt; &#44305;&#44256; &#47582;&#52644; &#49444;&#51221; &#54644;&#51228;</span>
</p>
<p class="c0"><span class="c2">- iOS : &#49444;&#51221; &gt; &#44060;&#51064; &#51221;&#48372; &#48372;&#54840; &gt; &#44305;&#44256; &gt; &#44305;&#44256; &#52628;&#51201; &#51228;&#54620; ON</span>
</p>
<p class="c0"><span class="c2">&#54924;&#49324;&#45716; &#50937;&#49345;&#50640; &#44277;&#44060; &#47785;&#51201;&#51060;&#45208; &#45824;&#49345;&#51032; &#51228;&#54620;&#50630;&#51060; &#54633;&#48277;&#51201;&#51004;&#47196; &#44277;&#44060;&#46108; &#51221;&#48372; &#48143; &#51060;&#50857;&#51088;&#51032; &#49436;&#48708;&#49828; &#51060;&#50857;&#44592;&#47197;(&#47196;&#44536;)&#44284; &#47700;&#53440;&#45936;&#51060;&#53552;&#50752; &#44057;&#51008; &#51221;&#48372;&#47484; &#49688;&#51665;&#54616;&#50668; &#51060;&#50857;&#51088;&#50640;&#44172; &#48372;&#45796; &#51339;&#51008; &#49436;&#48708;&#49828;&#47484; &#51228;&#44277;&#54624; &#49688; &#51080;&#46020;&#47197; &#48516;&#49437; &#48143; &#54876;&#50857;&#51012; &#54616;&#44256; &#51080;&#49845;&#45768;&#45796;. &#44396;&#52404;&#51201;&#51004;&#47196;, &#51060;&#50857;&#51088; &#44288;&#49900;&#50640; &#47582;&#52632; &#49436;&#48708;&#49828;&#47484; &#50864;&#49440;&#51201;&#51004;&#47196; &#51228;&#44277;&#54616;&#44256; &#47560;&#52992;&#54021;&#51201;&#51004;&#47196; &#51060;&#50857;&#51088;&#51032; &#44288;&#49900;&#48516;&#50556;&#50640; &#47582;&#45716; &#44305;&#44256;&#47484; &#51228;&#44277;&#54616;&#44144;&#45208;, &#51060;&#48292;&#53944; &#52280;&#50668;&#44592;&#54924;&#47484; &#51228;&#44277;&#54624; &#49688; &#51080;&#49845;&#45768;&#45796;.</span>
</p>
<p class="c0 c8"><span class="c2"></span></p>
<p class="c0"><span class="c13">&#44060;&#51064;&#51221;&#48372;&#51032; &#49688;&#51665; &#48169;&#48277;</span></p>
<p class="c0"><span class="c2">&#54924;&#49324;&#45716; &#50896;&#54876;&#54620; &#49436;&#48708;&#49828; &#51228;&#44277;&#51012; &#50948;&#54644; &#50937;&#44284; &#47784;&#48148;&#51068; &#50545;&#51012; &#53685;&#54644; &#45796;&#51020;&#44284; &#44057;&#51008; &#48169;&#48277;&#51004;&#47196; &#44060;&#51064;&#51221;&#48372;&#47484; &#49688;&#51665;&#54633;&#45768;&#45796;.</span>
</p>
<p class="c0"><span class="c2">- &#54856;&#54168;&#51060;&#51648;, &#51204;&#54868;, &#48176;&#49569; &#50836;&#52397;, &#49345;&#45812; &#44172;&#49884;&#54032;, &#44221;&#54408;&#54665;&#49324; &#48143; &#51060;&#48292;&#53944;(&#54856;&#54168;&#51060;&#51648;, SNS &#46321;) &#51025;&#47784; &#46321;</span>
</p>
<p class="c0"><span class="c2">- &#51228;&#55092;&#49324;&#47196;&#48512;&#53552;&#51032; &#51228;&#44277;</span></p>
<p class="c0"><span class="c2">- &#47196;&#44536; &#48516;&#49437; &#54532;&#47196;&#44536;&#47016;&#51012; &#53685;&#54620; &#49373;&#49457;&#51221;&#48372; &#49688;&#51665;</span>
</p>
<p class="c0 c8"><span class="c2"></span></p>
<p class="c0"><span class="c13">&#44060;&#51064;&#51221;&#48372;&#51032; &#48372;&#50976; &#48143; &#51060;&#50857;&#44592;&#44036;</span>
</p>
<p class="c0"><span class="c2">&#9312; &#50896;&#52825;&#51201;&#51004;&#47196; &#44060;&#51064;&#51221;&#48372;&#51032; &#49688;&#51665; &#48143; &#51060;&#50857;&#47785;&#51201; &#46608;&#45716; &#51228;&#44277;&#48155;&#51008; &#47785;&#51201;&#51060; &#45804;&#49457;&#46104;&#47732; &#51648;&#52404;&#50630;&#51060; &#54028;&#44592;&#54633;&#45768;&#45796;. &#45796;&#47564;, &#12300;&#51204;&#51088;&#49345;&#44144;&#47000; &#46321;&#50640;&#49436;&#51032; &#49548;&#48708;&#51088; &#48372;&#54840;&#50640; &#44288;&#54620; &#48277;&#47456;&#12301; &#46321; &#44288;&#44228;&#48277;&#47456;&#50640; &#51032;&#54616;&#50668; &#48372;&#51316;&#54624; &#54596;&#50836;&#44032; &#51080;&#45716; &#44221;&#50864;&#50640;&#45716; &#44536; &#44592;&#44036; &#46041;&#50504; &#48372;&#51316;&#54633;&#45768;&#45796;. &#51060; &#44221;&#50864;, &#54924;&#49324;&#45716; &#48372;&#44288;&#54616;&#45716; &#51221;&#48372;&#47484; &#44536; &#48372;&#44288; &#47785;&#51201;&#51004;&#47196; &#47564; &#51060;&#50857;&#54616;&#47728;, &#48372;&#51316;&#44592;&#44036;&#51008; &#50500;&#47000;&#50752; &#44057;&#49845;&#45768;&#45796;.</span>
</p><a id="t.14d7cb531d6a0f580af44dc646de51b1d33d9f38"></a><a id="t.1"></a>
<table class="c19">
  <tbody>
  <tr class="c10">
    <td class="c4" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#48372;&#51316;&#44540;&#44144;</span></p>
    </td>
    <td class="c3 c12" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#47785;&#51201;</span></p></td>
    <td class="c6 c12" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#44592;&#44036;</span></p></td>
  </tr>
  <tr class="c9">
    <td class="c11" colspan="1" rowspan="4"><p class="c1"><span class="c2">&#51204;&#51088;&#49345;&#44144;&#47000; &#46321;&#50640;&#49436;&#51032; &#49548;&#48708;&#51088; &#48372;&#54840;&#50640; &#44288;&#54620; &#48277;&#47456;</span>
    </p></td>
    <td class="c3" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#44228;&#50557; &#46608;&#45716; &#52397;&#50557;&#52384;&#54924; &#46321;&#50640; &#44288;&#54620; &#44592;&#47197;</span>
    </p></td>
    <td class="c6" colspan="1" rowspan="1"><p class="c1"><span class="c2">5&#45380;</span></p></td>
  </tr>
  <tr class="c9">
    <td class="c3" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#45824;&#44552;&#44208;&#51228; &#48143; &#51116;&#54868; &#46321;&#51032; &#44277;&#44553;&#50640; &#44288;&#54620; &#44592;&#47197;</span>
    </p></td>
    <td class="c6" colspan="1" rowspan="1"><p class="c1"><span class="c2">5&#45380;</span></p></td>
  </tr>
  <tr class="c9">
    <td class="c3" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#49548;&#48708;&#51088;&#51032; &#48520;&#47564; &#46608;&#45716; &#48516;&#51137;&#52376;&#47532;&#50640; &#44288;&#54620; &#44592;&#47197;</span>
    </p></td>
    <td class="c6" colspan="1" rowspan="1"><p class="c1"><span class="c2">3&#45380;</span></p></td>
  </tr>
  <tr class="c9">
    <td class="c3" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#54364;&#49884;/&#44305;&#44256;&#50640; &#44288;&#54620; &#44592;&#47197;</span>
    </p></td>
    <td class="c6" colspan="1" rowspan="1"><p class="c1"><span class="c2">6&#44060;&#50900;</span></p></td>
  </tr>
  <tr class="c9">
    <td class="c11" colspan="1" rowspan="1"><p class="c1"><span
      class="c2">&#44397;&#49464;&#44592;&#48376;&#48277;</span></p></td>
    <td class="c3" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#44144;&#47000;&#45236;&#50669; &#44288;&#47144; &#51221;&#48372;</span>
    </p></td>
    <td class="c6" colspan="1" rowspan="1"><p class="c1"><span class="c2">5&#45380;</span></p></td>
  </tr>
  <tr class="c9">
    <td class="c11" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#53685;&#49888;&#48708;&#48128;&#48372;&#54840;&#48277;</span>
    </p></td>
    <td class="c3" colspan="1" rowspan="1"><p class="c1"><span class="c2">&#53685;&#49888;&#49324;&#49892; &#54869;&#51064;&#51088;&#47308; &#44592;&#47197;</span>
    </p></td>
    <td class="c6" colspan="1" rowspan="1"><p class="c1"><span class="c2">3&#44060;&#50900;</span></p></td>
  </tr>
  </tbody>
</table>
<p class="c0"><span class="c2">&#8251; &#44592;&#53440; &#48277;&#47456;&#50640;&#49436; &#44508;&#51221;&#54620; &#51032;&#47924;&#47484; &#51456;&#49688;&#54616;&#44592; &#50948;&#54644; &#52376;&#47532;&#54620; &#44060;&#51064;&#51221;&#48372; &#51060;&#47141;&#51008; &#44536; &#52293;&#51076;&#51012; &#51077;&#51613;&#54616;&#44592; &#50948;&#54620; &#44592;&#44036; &#46041;&#50504; &#48372;&#44288;&#54624; &#49688; &#51080;&#49845;&#45768;&#45796;.</span>
</p>
<p class="c0 c8"><span class="c2"></span></p>
<p class="c0"><span class="c13">&#44060;&#51064;&#51221;&#48372;&#51032; &#51228;3&#51088; &#51228;&#44277;</span></p>
<p class="c0"><span class="c2">&#9312; &#54924;&#49324;&#45716; &#44256;&#44061;&#51032; &#44060;&#51064;&#51221;&#48372;&#47484; &#51228;2&#51312; (&#44060;&#51064;&#51221;&#48372;&#51032; &#49688;&#51665; &#54637;&#47785; &#48143; &#51060;&#50857; &#47785;&#51201;)&#50640;&#49436; &#44256;&#51648;&#54620; &#48276;&#50948;&#45236;&#50640;&#49436; &#49324;&#50857;&#54616;&#47728;, &#46041; &#48276;&#50948;&#47484; &#52488;&#44284;&#54616;&#50668; &#51060;&#50857;&#54616;&#44144;&#45208; &#53440;&#51064; &#46608;&#45716; &#53440;&#44592;&#50629;&middot;&#44592;&#44288;&#50640; &#51228;&#44277;&#54616;&#51648; &#50506;&#49845;&#45768;&#45796;.</span>
</p>
<p class="c0"><span class="c2">&#45796;&#47564;, &#45796;&#51020; &#49324;&#54637;&#51008; &#50696;&#50808;&#47196; &#54633;&#45768;&#45796;.</span>
</p>
<p class="c0"><span class="c2">1) &#49688;&#49324;&#47785;&#51201;&#51004;&#47196; &#44288;&#44228;&#48277;&#47456;&#50640;&#49436; &#51221;&#54620; &#51208;&#52264;&#50752; &#48169;&#48277;&#50640; &#46384;&#46972; &#49688;&#49324;&#44592;&#44288;&#51060; &#44060;&#51064;&#51221;&#48372; &#51228;&#44277;&#51012; &#50836;&#44396;&#54616;&#45716; &#44221;&#50864;</span>
</p>
<p class="c0"><span class="c2">2) &#53685;&#44228;&#51089;&#49457;, &#54617;&#49696;&#50672;&#44396;&#45208; &#49884;&#51109;&#51312;&#49324; &#46321;&#51012; &#50948;&#54616;&#50668; &#53945;&#51221; &#44060;&#51064;&#51012; &#49885;&#48324;&#54624; &#49688; &#50630;&#45716; &#54805;&#53468;&#47196; &#44305;&#44256;&#51452;, &#54801;&#47141;&#49324;&#45208; &#50672;&#44396;&#45800;&#52404; &#46321;&#50640; &#51228;&#44277;&#54616;&#45716; &#44221;&#50864;</span>
</p>
<p class="c0"><span class="c2">3) &#44592;&#53440; &#44288;&#44228;&#48277;&#47456;&#51032; &#44508;&#51221;&#50640; &#46384;&#47480; &#50836;&#52397;&#51060; &#51080;&#45716; &#44221;&#50864;</span>
</p>
<p class="c0"><span class="c2">4) &#50689;&#50629;&#51032; &#50577;&#46020;&#12685;&#54633;&#48337; &#46321;</span></p>
<p class="c0"><span class="c2">&#8251; &#54924;&#49324;&#45716; &#50689;&#50629;&#51032; &#50577;&#46020; &#46321;&#50640; &#44288;&#54620; &#49324;&#50976;&#44032; &#48156;&#49373;&#54616;&#50668; &#54924;&#50896;&#51032; &#44060;&#51064;&#51221;&#48372; &#51060;&#51204;&#51060; &#54596;&#50836;&#54620; &#44221;&#50864;, &#44288;&#44228;&#48277;&#47456;&#50640;&#49436; &#44508;&#51221;&#54620; &#51208;&#52264;&#50752; &#48169;&#48277;&#50640; &#46384;&#46972; &#44060;&#51064;&#51221;&#48372; &#51060;&#51204;&#50640; &#44288;&#54620; &#49324;&#49892; &#46321;&#51012; &#49324;&#51204;&#50640; &#44256;&#51648;&#54616;&#47728;, &#54924;&#50896;&#50640;&#44172;&#45716; &#44060;&#51064;&#51221;&#48372; &#51060;&#51204;&#50640; &#44288;&#54620; &#46041;&#51032; &#52384;&#54924;&#44428;&#51012; &#48512;&#50668;&#54633;&#45768;&#45796;.</span>
</p>
<p class="c0"><span class="c2">&#9313; &#44536; &#48150;&#50640; &#44060;&#51064;&#51221;&#48372;&#51032; &#51228; 3&#51088; &#51228;&#44277;&#51060; &#54596;&#50836;&#54620; &#44221;&#50864;&#50640;&#45716; &#54633;&#45817;&#54620; &#51208;&#52264;&#47484; &#53685;&#54620; &#44256;&#44061;&#51032; &#46041;&#51032;&#47484; &#50619;&#50612; &#51228; 3&#51088;&#50640;&#44172; &#44060;&#51064;&#51221;&#48372;&#47484; &#51228;&#44277;&#54624; &#49688; &#51080;&#49845;&#45768;&#45796;. </span>
</p></body>
</html>`
*/
