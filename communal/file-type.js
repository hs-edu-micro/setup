/**
 * 将上传文件转为二进制形式后，再获取其前四位头文件的十六进制编码，根据这个就可以精准判定上传文件类型。
 * https://zhuanlan.zhihu.com/p/259840090
 * https://blog.csdn.net/weixin_33826268/article/details/94604439
 */

export function isJPG(type) {
  // image/jpeg
  return type.indexOf("jpeg") > -1;
}

export function isPDF(type) {
  // application/pdf
  return type.indexOf("pdf") > -1;
}

export function isDOC(type) {
  // application/vnd.openxmlformats-officedocument.wordprocessingml.document
  // application/msword
  return type.indexOf("word") > -1;
}

export function isPPT(type) {
  // ppt pptx 类型相同
  // application/vnd.openxmlformats-officedocument.presentationml.presentation
  return type.indexOf("presentationml") > -1;
}

export function isXLS(type) {
  // application/vnd.ms-excel
  return type.indexOf("excel") > -1;
}

export function isXLSX(type) {
  // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  return type.indexOf("spreadsheetml") > -1;
}

export function isTXT(type) {
  // text/plain
  return type === "text/plain";
}

export function isMP4(type) {
  // video/mp4
  return type.indexOf("mp4") > -1;
}

export function isAVI(type) {
  // video/avi
  return type.indexOf("avi") > -1;
}
