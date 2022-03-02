export default class DaumPost {

  zipcode = undefined;
  roadAddress = undefined;
  jibunAddress = undefined;

  constructor(data) {
    let result = data || {
      zonecode: undefined,
      roadAddress: undefined
    };

    this.zipcode = result.zonecode;
    this.roadAddress = result.roadAddress;
    this.jibunAddress = result.jibunAddress;
  }

}
