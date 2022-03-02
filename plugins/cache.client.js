/**
 * 세션 스토리지로 부터 캐시를 가져온다
 * @param index {string} Cache index
 * @returns {*|*[]}
 */
function getCache(index) {
  try {
    let storage = JSON.parse(sessionStorage.getItem("cache"));
    return storage[index] || [];
  } catch (e) {
    return [];
  }
}

/**
 * 캐시 스토리지에 데이터를 저장한다
 * @param index {string} Cache index
 * @param value {*} Cache value, almost anything but do not use undefined or infinite recursive object
 */
function setCache(index, value) {
  let storage;

  try {
    storage = JSON.parse(sessionStorage.getItem("cache") || "{}");
  } catch (e) {
    storage = {};
  }

  storage[index] = value;
  sessionStorage.setItem("cache", JSON.stringify(storage));
}

/**
 * @class Cache
 * @description Caching service
 */
class Cache {

  /**
   * Constructor
   * @param $axios {object} NuxtJS $axios Module, required
   */
  constructor($axios) {
    console.assert($axios !== undefined, "$axios module is required");
    this.$axios = $axios;
  }

  /**
   * Sync cache
   * @param index {string} cache index path
   * @param force {boolean=false} force refresh cache <optional>
   * @returns {Promise<any>}
   */
  sync(index, force = false) {
    return new Promise((resolve, reject) => {
      let caches = getCache(index);
      if (caches.length === 0 || force === true) {
        this.$axios.$get(index)
          .then(data => {
            setCache(index, data);
            return resolve(getCache(index));
          })
          .catch(reject);
      } else {
        resolve(caches);
      }
    });
  }

  /**
   * Get cached data from storage
   * @param index {string} Cache index
   * @returns {*|*[]}
   */
  get(index) {
    return getCache(index);
  }

  /**
   * Manual set data to storage
   * @param index {string} Cache index
   * @param value {*} Cache value
   */
  set(index, value) {
    setCache(index, value);
  }
}

/**
 * Export plugins
 * @param ctx
 * @param inject
 */
export default (ctx, inject) => {
  let cache = new Cache(ctx.$axios);
  ctx.app.$cache = cache;
  inject("cache", cache);
}
