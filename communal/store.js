/**
 * @title store.js 反序列化
 * @param {string} strVal
 * @param {*} defaultVal
 * @returns {Object}
 */
export function deserialize(strVal, defaultVal) {
  if (!strVal) return defaultVal;
  let val = "";
  try {
    val = JSON.parse(strVal);
  } catch (e) {
    val = strVal;
  }
  return val;
}

/**
 * 封装localStorage
 */
export const local = {
  // get返回给定键的值并反序列化
  get: function (key, optionalDefaultValue = "") {
    return deserialize(localStorage.getItem(key), optionalDefaultValue);
  },
  // Calling set with value === undefined is equivalent to calling remove.
  set: function (key, value) {
    if (value === undefined) {
      return this.remove(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  },
  // remove deletes the key and value stored at the given key.
  remove: function (key) {
    localStorage.removeItem(key);
  },
  // clearAll will remove all the stored key-value pairs in this store.
  clearAll: function () {
    localStorage.clear();
  },
};

/**
 * 封装sessionStorage
 */
export const session = {
  // get返回给定键的值并反序列化
  get: function (key, optionalDefaultValue = "") {
    return deserialize(sessionStorage.getItem(key), optionalDefaultValue);
  },
  // Calling set with value === undefined is equivalent to calling remove.
  set: function (key, value) {
    if (value === undefined) {
      return this.remove(key);
    }
    sessionStorage.setItem(key, JSON.stringify(value));
    return value;
  },
  // remove deletes the key and value stored at the given key.
  remove: function (key) {
    sessionStorage.removeItem(key);
  },
  // clearAll will remove all the stored key-value pairs in this store.
  clearAll: function () {
    sessionStorage.clear();
  },
};
