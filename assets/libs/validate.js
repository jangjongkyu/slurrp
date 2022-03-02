export function isEmptyString(value) {
  let v = value;
  if (v === undefined || v === null) v = "";
  v = v.trim();
  return v === "";
}

export function isEmptyObject(value) {
  if (value === undefined || value === null || value === "") return true;
  return false;
}

export function isMobilePattern(value) {
  let v = String(value || "");
  v = v.trim();
  return v !== "" && v.match(/^(010|011|016|017|018|019)(\d{7,8})$/g);
}

export function isPhonePattern(value) {
  let v = String(value || "");
  v = v.trim();
  return v !== "" && v.match(/^(\d{2,3})(\d{3,4})(\d{4})$/g);
}

export function isEmailPattern(value) {
  let v = value;
  if (v === undefined || v === null) v = "";
  v = v.trim();
  return v !== "" && v.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-]+)(\.[a-zA-Z]+)+$/g);
}

export function isValidPasswordLength(value) {
  let v = value;
  if (v === undefined || v === null) v = "";
  v = v.trim();
  if (v === "") return false;
  return v.length >= 10 && v.length <= 15;
}

export function isValidPasswordPattern(value) {
  let v = value;
  if (v === undefined || v === null) v = "";
  v = v.trim();
  if (v === "") return false;
  let result = 0;
  result += _containsAlphabet(v) ? 1 : 0;
  result += _containsNumber(v) ? 1 : 0;
  result += _containsSpecial(v) ? 1 : 0;
  return result > 1;
}

export function isEmptyArray(value) {
  let array = value || [];
  if (value.length > 0) return false;
  else return true;
}

export function checkMinLength(value, min) {
  value = _getValue(value);
  if (value === "") return true;
  else return value.length >= min;
}

export function checkMaxLength(value, max) {
  value = _getValue(value);
  if (value === "") return true;
  else return value.length <= max;
}

function _getValue(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function _containsAlphabet(value) {
  const MATCH = "abcdefghijklmnopqrstuvwxyz";
  let v = value.split("");
  for (let i = 0; i < v.length; i++) {
    if (MATCH.indexOf(v[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function _containsNumber(value) {
  const MATCH = "0123456789";
  let v = value.split("");
  for (let i = 0; i < v.length; i++) {
    if (MATCH.indexOf(v[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function _containsSpecial(value) {
  const MATCH = "!@#$%^&*()-=_+,./<>?;[]{}";
  let v = value.split("");
  for (let i = 0; i < v.length; i++) {
    if (MATCH.indexOf(v[i]) >= 0) {
      return true;
    }
  }
  return false;
}
