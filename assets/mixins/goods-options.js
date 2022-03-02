const ATTRS_NO = ["6", "7"];

export default {
  props: {
    goods: Object,
    types: Array,
    items: Array
  },

  data() {
    return {
      itemOptions: {
        "6": undefined, // 색상
        "7": undefined  // 사이즈
      },
      selectItemOption: {
        "6": undefined,
        "7": undefined
      }
    }
  },

  computed: {
    addSaleAmt() {
      if (this.selectItemOption["6"] !== undefined && this.selectItemOption["7"] !== undefined) {
        let items = this.getFilteredItems();
        return items[0].addSaleAmt;
      } else {
        return 0;
      }
    }
  },

  methods: {
    onAttrSelected(attrNo) {
      let items = [];
      // 값이 선택된 경우
      if (this.selectItemOption[String(attrNo)] !== undefined) {
        items = this.items.filter(x => x.options.filter(y => y.attrNo == attrNo && y.attrVal == this.selectItemOption[String(attrNo)].attrVal).length > 0);
      }
      // 값이 선택되지 않은 경우
      else {
        items = this.items;
      }

      // 다른 옵션의 재고를 조정하여 선택을 할 수 없게 만든다
      ATTRS_NO.filter(x => x != attrNo).forEach(x => {
        this.itemOptions[String(x)].forEach(option => {
          let optionItems = option.items.filter(item => items.filter(x => x.itemNo == item.itemNo).length > 0);
          option.stockQty = optionItems.length > 0 ?
            optionItems.map(item => item.stockQty || 0).reduce((p, v) => p + v) : 0;
        });
        if (this.selectItemOption[String(x)] !== undefined && this.selectItemOption[String(x)].stockQty == 0) this.selectItemOption[String(x)] = undefined;
      });
    },

    getFilteredItems() {
      let items = _.cloneDeep(this.items);
      ATTRS_NO.filter(attrNo => {
        items = items.filter(item => this.selectItemOption[String(attrNo)].items.filter(x => x.itemNo == item.itemNo).length > 0);
      });
      return items;
    },

    validate() {
      let result = true;
      ATTRS_NO.forEach(attrNo => {
        result &= ( this.selectItemOption[String(attrNo)] !== undefined );
      });
      return result;
    }
  },

  watch: {
    types: {
      immediate: true,
      handler(value) {
        value = value || [];
        let itemNo = (this.goods || {}).itemNo;
        ATTRS_NO.forEach(attrNo => {
          let options = ((value.filter(x => x.attrNo == attrNo)[0] || {}).options) || [];
          options.forEach(option => {
            option.items = (option.items || []).filter(x => x.stockQty > 0);
            option.stockQty = option.items.length > 0 ? option.items.map(item => item.stockQty || 0).reduce((p, v) => p + v) : 0;
          });
          this.itemOptions[String(attrNo)] = options;
          this.selectItemOption[String(attrNo)] = options
            .filter(x => x.stockQty > 0)
            .filter(x => x.items.filter(y => y.itemNo === itemNo).length > 0)[0];
        });
      }
    }
  }
};
