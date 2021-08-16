import { local, session } from "./store.js";
import { humpToUnderline } from "./util.js";

/* 自考测试-武汉工程大学 */
export const businessDomain = "zktest.huashenxt.com:8888";

/**
 * @title 五合一接口处理数据函数：enumList 数组转成对象格式
 */
export function dealEnum(enumList, configList) {
  if (!enumList || enumList.length <= 0) return;
  const oEnumList = {};
  const oEnumLanguageList = {};

  enumList.forEach((item) => {
    const key = humpToUnderline(item.group);
    if (item.enumType === 1) {
      if (Object.prototype.hasOwnProperty.call(oEnumList, key)) {
        Object.assign(oEnumList[key], { [item.key]: item.value });
        // eslint-disable-next-line
        // oEnumList[key] = { ...oEnumList[key], [item.key]: item.value };
      } else {
        oEnumList[key] = { [item.key]: item.value };
      }
    } else {
      if (Object.prototype.hasOwnProperty.call(oEnumLanguageList, key)) {
        Object.assign(oEnumLanguageList[key], { [item.key]: item.value });
        // oEnumLanguageList[key] = { ...oEnumLanguageList[key], [item.key]: item.value };
      } else {
        oEnumLanguageList[key] = { [item.key]: item.value };
      }
    }
  });

  // 获取edu_logs时间间隔
  oEnumList["history_param_type"] = {};
  if (!(configList && Object.prototype.hasOwnProperty.call(configList, "historyParam"))) return;
  let aHistoryName = [];
  try {
    aHistoryName = JSON.parse(configList["historyParam"].param);
  } catch (error) {
    console.log("error: domain.js", error);
  }
  aHistoryName = aHistoryName.filter((item) => item.src == "edu_logs");
  if (aHistoryName.length <= 0) return;
  if (aHistoryName[0].dst.length <= 0) return;
  const aHistoryDst = [...aHistoryName[0].dst];
  aHistoryDst.sort((a, b) => {
    // sort改变原数组
    return new Date(b.endTime) - new Date(a.endTime);
  });
  aHistoryDst.forEach((item) => {
    oEnumList["history_param_type"][item.name] = item.name;
  });

  local.set("enumList", oEnumList);
  local.set("enumLanguageList", oEnumLanguageList);
}

/**
 * @title 五合一接口处理数据函数：solutionList 数组转成对象格式
 */
export function dealSolution(solutionList) {
  const oSolutionList = {};
  if (!solutionList || solutionList.length <= 0) return;
  solutionList.forEach((item) => {
    oSolutionList[item.webDomain] = item;
  });

  local.set("solutionList", oSolutionList);
}

/**
 * @title 根据二级域名 获取覆盖axios配置信息
 */
export const getAxiosConfig = function () {};

/**
 * @title 根据二级域名 获取solution
 */
export const getSolutionForDomain = function () {
  const solutionList = local.get("solutionList");
  if (!solutionList || solutionList.length <= 0) return {};

  let solution = solutionList[businessDomain];
  for (var item in solutionList) {
    if (window.location.href.indexOf("://" + item) != -1) {
      solution = solutionList[item];
      break;
    }
  }
  return solution;
};

/**
 * @title 根据二级域名 获取agentIno
 */
export const getAgentDutyInfoForDomain = function (agentDutyInfo, solution = false) {
  if (!agentDutyInfo || agentDutyInfo.length <= 0) return {};
  if (!solution) solution = getSolutionForDomain();

  let oDuty = agentDutyInfo[0];
  for (let item of agentDutyInfo) {
    if (item.schoolno === solution.schoolno) {
      oDuty = item;
      break;
    }
  }
  return oDuty;
};

/**
 * @title 根据currentClassno获取当前用户studentDocInfo
 */
export const getCurrentStudentDocInfo = (key) => {
  const {
    studentInfo: { studentDocInfo },
    currentClassno,
  } = session.get("sessionUser");
  let obj = null;
  for (var i = 0; i < studentDocInfo.length; i++) {
    if (studentDocInfo[i].classno === currentClassno) {
      obj = studentDocInfo[i];
      break;
    }
  }
  if (key) return obj[key];
  return obj;
};

/**
 * @title 黑名单
 */
export const blacklistReplace = (key) => {
  const { trainType, solutionno } = getSolutionForDomain();
  // console.log('blacklistReplace: ', trainType, solutionno);
  const enumLanguageList = local.get("enumLanguageList");
  const oEnum = enumLanguageList[key];

  /* 没配黑名单 */
  if (!oEnum || Object.keys(oEnum).length <= 0) return key;

  /* 优先级: trainType > solutionno */
  const trainTypeValue = oEnum["trainType" + trainType];
  const solutionValue = oEnum["solutionno" + solutionno];
  if (trainTypeValue) {
    if (trainTypeValue === "BLACKLIST") return false;
    return trainTypeValue;
  } else if (solutionValue) {
    if (solutionValue === "BLACKLIST") return false;
    return solutionValue;
  } else {
    return key;
  }
};
