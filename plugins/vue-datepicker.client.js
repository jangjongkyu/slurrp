import Vue from "vue";
import Datepicker from "vuejs-datepicker";
import { ko } from "vuejs-datepicker/dist/locale";

Datepicker.props.language.default = () => ko;
Datepicker.props.format.default = () => "yyyy-MM-dd";

Vue.component("Datepicker", Datepicker);