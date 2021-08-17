## 导入路径

> 子项目根据需要由此全路径快速 copy 使用

```js
// require-context
export { default as requireAll } from "@/utils/communal/svg-require.js";
// browser screen
export { default as client } from "@/utils/communal/client.js";

// fil-type
export {
  isJPG,
  isPDF,
  isDOC,
  isPPT,
  isXLS,
  isXLSX,
  isTXT,
  isMP4,
  isAVI,
} from "@/utils/communal/file-type.js";
// storage
export { deserialize, local, session } from "@/utils/communal/store.js";
// axios
export {
  isSuccess,
  oErrMsg,
  getError,
  emitCancelToken,
} from "@/utils/communal/axios-util.js";
// ua
export {
  getUA,
  isBrowser,
  ua,
  compare,
  isIE,
  isPresto,
  isAppleWebKit,
  isFirefox,
  isMobile,
  isAndroid,
  isiPhone,
  isiPad,
  isWeixin,
  isAlipay,
  isIos,
} from "@/utils/communal/ua-parser.js";
// util
export {
  isExternal,
  underlineToHump,
  humpToUnderline,
  getType,
  isEmpty,
  isEmptyExclude,
  trimArray,
  trimObject,
} from "@/utils/communal/util.js";
// 业务相关
export {
  dealEnum,
  dealSolution,
  getAxiosConfig,
  getSolutionForDomain,
  getAgentDutyInfoForDomain,
  getCurrentStudentDocInfo,
  blacklistReplace,
} from "@/utils/communal/domain.js";
```
