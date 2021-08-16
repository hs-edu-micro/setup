/**
 * @title 是否是成功响应
 * @param {Number} status
 * @returns {boolean}
 */
export function isSuccess(status) {
  return status >= 200 && status < 300;
}

/**
 * 常见错误集合
 */
export const oErrMsg = {
  400: "客户端请求的语法错误",
  401: "授权失败，请重新登录",
  403: "请求拒绝访问",
  404: "请求未找到资源",
  408: "请求访问超时",
  500: "服务器内部错误",
  501: "服务器不支持",
  502: "响应无效",
  503: "服务器超载或系统维护",
  504: "网关超时",
  505: "服务器不支持请求的HTTP协议的版本",
};

/**
 * @title 非常见错误归类
 * @param {Number} first
 * @returns {String}
 */
export function getError(first) {
  let errMsg = "";
  if (first == 1) {
    errMsg = "需要请求者继续执行操作";
  } else if (first == 3) {
    errMsg = "重定向";
  } else if (first == 4) {
    errMsg = "客户端内部错误";
  } else if (first == 5) {
    errMsg = "服务器内部错误";
  } else {
    errMsg = "其他错误";
  }
  return errMsg;
}

/**
 * @title 路由跳转之前取消正处于pending的接口
 * @param {Array<Function>} aCancel
 */
export function emitCancelToken(aCancel) {
  if (!aCancel || aCancel.length <= 0) return;
  {
    // item是之前每一个请求装进数组的cancel方法，item()执行后，若该请求是pending状态，则可以直接取消掉。
    aCancel.forEach((item) => {
      item("cancel pending");
    });
    // 执行完后记得清空$aHttpCancel数组。
    aCancel.splice(0, aCancel.length);
  }
}
