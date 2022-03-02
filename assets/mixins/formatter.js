import moment from "moment";
import numeral from "numeral";

moment.locale("ko");

const dayLblArr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const dayLblSmplArr = ["일", "월", "화", "수", "목", "금", "토"];

export default {
  methods: {
    formatDate(value, format, parse) {
      format = _getValue(format);

      if (value === undefined) return "";
      else {
        if (format === "") format = "YYYY-MM-DD";
        return moment(value, parse).format(format);
      }
    },

    // getDayLabel(value, format, parse, type)
    getDayLabel(value, parse, type)
    {
      // value = this.formatDate(value, format, parse);
      if (value === undefined) return "";
      return type == 0 ? dayLblArr[moment(value, parse).day()] : dayLblSmplArr[moment(value, parse).day()];
    },

    formatScore(value) {
      return numeral(value).format("0.0");
    },

    formatAmount(value) {
      return numeral(value).format("0,0");
    },

    formatCnt(value) {
      return numeral(value).format("0,0");
    },

    formatPercent(value) {
      return numeral(value).format("0%");
    },

    formatPhone(value) {
      value = _getValue(value);
      value = value.replace(/\D/g, "");
      if (value.match(/^(02|\d{2,3})(\d{3,4})(\d{4})$/g)){
        return value.replace(/^(02|\d{2,3})(\d{3,4})(\d{4})$/g, "$1-$2-$3");
      }else if (value.match(/^(\d{4})(\d{4})$/g)){
        return value.replace(/^(\d{4})(\d{4})$/g, "$1-$2");
      }
      else return "";
    },

    formatBizRegNo(value) {
      value = _getValue(value);
      value = value.replace(/\D/g, "");
      if (value.match(/^(\d{3})(\d{2})(\d{5})$/g)) {
        return value.replace(/^(\d{3})(\d{2})(\d{5})$/g, "$1-$2-$3");
      } else {
        return "";
      }
    },

    getLabel(value, codeList) {
      let _f = (codeList || []).filter((x) => x.dtlCd === value)[0];
      return (_f || {}).dtlNm || value;
    },

    getShtLabel(value, codeList) {
      let _f = (codeList || []).filter((x) => x.dtlCd === value)[0];
      return (_f || {}).dtlShtNm || value;
    },

    getUsrDfn1Val(value, codeList) {
      let _f = (codeList || []).filter((x) => x.dtlCd === value)[0];
      return (_f || {}).usrDfn1Val || value;
    },

    getUsrDfn2Val(value, codeList) {
      let _f = (codeList || []).filter((x) => x.dtlCd === value)[0];
      return (_f || {}).usrDfn2Val || value;
    },

    getUsrDfn3Val(value, codeList) {
      let _f = (codeList || []).filter((x) => x.dtlCd === value)[0];
      return (_f || {}).usrDfn3Val || value;
    },

    getUsrDfn4Val(value, codeList) {
      let _f = (codeList || []).filter((x) => x.dtlCd === value)[0];
      return (_f || {}).usrDfn4Val || value;
    },

    getUsrDfn5Val(value, codeList) {
      let _f = (codeList || []).filter((x) => x.dtlCd === value)[0];
      return (_f || {}).usrDfn5Val || value;
    },

    getGoodsOptionList(value) {
      value = _getValue(value);
      return value.split("/").filter(x => x);
    },

    getGoodsOptionsAsCommaString(value) {
      value = _getValue(value);
      return value.split("/").filter(x => x).join(", ");
    },

    getGoodsOptionsAsSlashString(value) {
      value = _getValue(value);
      return value.split("/").filter(x => x).join(" / ");
    },

    getImageUrl(value) {
      value = _getValue(value);
      if (value === "") return "/images/no-img.jpg";
      let url;
      try {
        url = new URL(value);
      } catch (e) {
        if (value.match(/^\/.*$/g)) value = value.slice(1, value.length);
        url = new URL(`${this.$env.cdnUrl}/${value}`);
      }
      return url.href;
    },

    getUrl(value) {
      value = _getValue(value);
      if (value === "") return undefined;
      let url;
      try {
        url = new URL(value);
      } catch (e) {
        if (value.match(/^\/.*$/g)) value = value.slice(1, value.length);
        url = new URL(`${this.$env.siteUrl}/${value}`);
      }
      return url.href;
    },

    toHtml(value) {
      value = _getValue(value);
      return value.replace(/\n/g, "<br>");
    },

    splitComma(value) {
      try {
        value = _getValue(value);
        return value.split(",");
      } catch (e) {
        return [];
      }
    },

    getSplitData(value, delim, index) {
      try {
        value = _getValue(value);
        delim = _getValue(delim);
        return value.split(delim)[index];
      } catch (e) {
        return undefined;
      }
    },

    backButtonClicked() {
      // console.log("Back Button Action")
      if (this.$store.state.layout.referrer) {
        return this.$router.push(this.$store.state.layout.referrer);
      } else {
        return this.$router.go(-1);
      }
    },

    getSiteDomain() {
      try {
        let url = new URL(this.$env.siteUrl);
        return url.hostname;
      } catch (e) {
        return undefined;
      }
    },


    getReferrer() {
      let referrer;
      try {
        let referrer = document.referrer;
        console.log("Referer", referrer);
        if (!referrer) {
          let url = new URL(this.$nuxt.context.from.fullPath, this.$env.siteUrl);
          referrer = url.href;
          console.log("Referer is empty fall back to previous router", referrer);
        }
        return referrer;
      } catch (e) {
        return undefined;
      }
    },

    getReferrerDomain() {
      try {
        let url = new URL(this.getReferrer());
        return url.hostname;
      } catch (e) {
        return undefined;
      }
    }
  }
};

function _getValue(value) {
  if (value === undefined || value === null) return "";
  else return String(value).trim();
}
