/**
 * https://mp.weixin.qq.com/s/ZLh7jHiDpTUD8f9q0PQx5Q
 */
export default function client() {
  // ie9 +  最新浏览器
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  } else {
    // ie8及其以下 - 怪异浏览器(怪异模式)
    if (document.compatMode === "BackCompat") {
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      };
    } else {
      // 标准模式(声明了DOCTYPE) // document.compatMode === "CSS1Compat"
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
}
