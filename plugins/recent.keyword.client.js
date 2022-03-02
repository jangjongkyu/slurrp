import Vue from "vue";
import moment from "moment";

let RECENT_KEYWORD_STORAGE_NAME;

export default ({store, $axios, $cookies, env, app}, inject) => {
  RECENT_KEYWORD_STORAGE_NAME = env.RECENT_KEYWORD_STORAGE_NAME;

  let recentKeyword = new RecentKeyword(store, $axios, $cookies);

  app.$_rk = recentKeyword;
  inject("_rk", recentKeyword);
};

class RecentKeyword {
  constructor(store, axios, cookies) {
    this.store = store;
    this.axios = axios;
    this.cookies = cookies;

    this.recentKeywords = [];

    this.load();
  }

  async load() {
    let keywords = undefined;
    try {
      if (this.store.state.session.isMember) {
        keywords = await _loadFromServer(this.axios);
      }
    } catch (e) {
      keywords = undefined;
    }
    if (!keywords) {
      keywords = _loadFromStorage();
      if (!keywords) keywords = [];
    }

    Vue.set(this, "recentKeywords", keywords);
  }

  async add(keyword) {
    _removeKeyword(this.recentKeywords, keyword);

    this.recentKeywords.unshift({ keyword, timestamp: moment() });
    if (this.recentKeywords.length > 10) {
      this.recentKeywords.pop();
    }

    try {
      if (this.store.state.session.isMember) {
        let keywords = await _saveKeywords(this.recentKeywords, this.axios);
        Vue.set(this, "recentKeywords", keywords);
      } else {
        localStorage.setItem(RECENT_KEYWORD_STORAGE_NAME, JSON.stringify(this.recentKeywords));
      }
    } catch (e) {
    }
  }

  async remove(keyword) {
    _removeKeyword(this.recentKeywords, keyword);

    try {
      if (this.store.state.session.isMember) {
        let keywords = await _saveKeywords(this.recentKeywords, this.axios);
        Vue.set(this, "recentKeywords", keywords);
      } else {
        this.cookies.set(RECENT_KEYWORD_STORAGE_NAME, JSON.stringify(this.recentKeywords));
      }
    } catch (e) {
    }
  }

  async clear() {
    try {
      if (this.store.state.session.isMember) {
        await _saveKeywords([], this.axios);
      } else {
        localStorage.setItem(RECENT_KEYWORD_STORAGE_NAME, undefined);
      }
      Vue.set(this, "recentKeywords", []);
    } catch (e) {
    }
  }
}

function _removeKeyword(keywords, keyword) {
  let index = keywords.findIndex(item => item.keyword == keyword);
  if (index >= 0) {
    keywords.splice(index, 1);
  }
}

async function _saveKeywords(keywords, axios, cookies) {
  try {
    keywords = await axios.$post("/api/member/recent-keyword", keywords);
    localStorage.setItem(RECENT_KEYWORD_STORAGE_NAME, undefined);
  } catch (e) {
    // Failed to synchronize
  }
  return keywords;
}

async function _loadFromServer(axios) {
  try {
    let recentKeywords = axios.$get("/api/member/recent-keyword");
    localStorage.setItem(RECENT_KEYWORD_STORAGE_NAME, undefined);
    return recentKeywords;
  } catch (e) {
    return undefined;
  }
}

function _loadFromStorage() {
  try {
    let keywords = localStorage.getItem(RECENT_KEYWORD_STORAGE_NAME);
    return JSON.parse(keywords);
  } catch (e) {
    return [];
  }
}
