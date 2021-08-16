/**
 * @title 通过`ua-parser-js`获取navigator.userAgent等详细信息
 * @param {*} u UaParser实例
 */
export function getUA(u) {
  const {
    name: browser,
    version: browserVersion,
    major: browserMajor,
  } = u.getBrowser && u.getBrowser();
  const { name: engine, version: engineVersion } = u.getEngine && u.getEngine();
  const userAgent = u.getOS && u.getUA();

  const { architecture: cpu } = u.getCPU && u.getCPU();
  const { name: os, version: osVersion } = u.getOS && u.getOS();
  return {
    browser,
    browserVersion,
    browserMajor,
    cpu,
    engine,
    engineVersion,
    os,
    osVersion,
    userAgent,
  };
}

/**
 * 浏览器 or Node
 */
export function isBrowser() {
  return typeof window !== "undefined";
}

/* navigator.userAgent && toLowerCase */
export function ua() {
  return isBrowser() ? navigator.userAgent.toLowerCase() : "";
}

/**
 * @title 判断什么终端
 */
export const compare = (s) => ua().indexOf(s) >= 0;

/* IE内核 */
export const isIE = compare("trident");
/* opera内核 */
export const isPresto = compare("presto");
/* 苹果、谷歌内核 */
export const isAppleWebKit = compare("applewebKit");
/* 火狐内核 */
export const isFirefox = compare("gecko") && !compare("khtml");

/* 移动端类型 */
export const isMobile = Boolean(ua().match(/AppleWebKit.*Mobile.*/i));
/* android终端 || uc浏览器 */
export const isAndroid = compare("android") || compare("linux");
/* Ios */
export const isIos = Boolean(ua().match(/\(i[^;]+;( U;)? CPU.+Mac OS X\)/i));
/* 是否为iPhone或者 QQ HD 浏览器 */
export const isiPhone = compare("iphone");
/* 是否为iPad */
export const isiPad = compare("ipad");
/* 是否为weixin */
export const isWeixin = compare("micromessenger");
/* 是否为alipay */
export const isAlipay = compare("alipay");
