/**
 * 단품 모델
 * @class Item
 */
export class Item {
  /**
   * Constructor
   * @param object {object} Import object
   */
  constructor(object) {
    Object.assign(this, object || {});
  }
}
