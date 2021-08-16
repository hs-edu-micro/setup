// 下划线转换驼峰
export const underlineToHump = function (name) {
  return name.replace(/_(\w)/g, function (all, letter) {
    return letter ? letter.toUpperCase() : "";
  });
};

// 驼峰转换下划线
export const humpToUnderline = function (name) {
  const newName = name.replace(/([A-Z])/g, "_$1").toLowerCase();
  if (newName[0] === "_") return newName.substr(1);
  return newName;
};

/**
 * @title 结合 `typeof [value]` 和 `Object.prototype.toString.call([value])` 检测数据类型
 * typeof: 不能具体区分null和对象数据类型的值（无法检测是正则还是数组等）
 * instanceof: 不能处理基本数据类型值、只要在当前实例的原型链(__proto__)中出现过的类，检测结果都是true
 * constructor: 在类的原型上一般都会带有CONSTRUCTOR属性，存储当前类本身；但是此属性值太容易被修改了
 * Object.prototype.toString.call([value])
    - 调用Object原型上的toString方法，让方法执行的时候，方法中的this是要检测的数据类型 ，从而获取到数据类型所属类的详细信息
    - 在所有的数据类型类中,他们的原型上都有toString方法,除Object.prototype.toString不是把数据值转换为字符串，其余的都是转为字符串，而Object原型上的toString是检测当前实例隶属类的详细信息的（检测数据类型）
 * @example [1, false, "1", null, undefined, Symbol(1), { a: 1 }, [1], /1/, new Date(), $, window, 自定义类]
 */
export function getType(value) {
  const sType = typeof value;
  if (["object", "function"].indexOf(sType) < 0) return sType;
  // `\w` 匹配字母、数字、下划线。等价于 [A-Za-z0-9_]
  const reg = /^\[object ([a-zA-Z0-9]+)\]$/i;
  return reg.exec(Object.prototype.toString.call(value))[1].toLowerCase();
}

/**
 * 内置 Number.isInteger([value]) 检测给定值是否为整数。
 * 内置 Boolean([value]) 函数将真值转换为真值，将假值转换为假值。
 * FIXME: JSON.stringify(NaN)==="null"  JSON.stringify(/a/)==="{}" JSON.stringify({ c: undefined })==="{}"
 *
 * 判断为空：[0, NaN, "", " ", "0", "0 ", null, undefined, {}, []];
 * 判断不为空：[Symbol(1), Math.sin, /a/, new Date(), new Map(), new Set(), new WeakMap(), new WeakSet()];
 */
export function isEmpty(value) {
  const valType = getType(value);

  // 排除的数据类型
  const noEmpty = ["regexp", "symbol", "function", "date", "map", "set", "weakmap", "weakset"];
  if (noEmpty.indexOf(valType) > -1) return false;

  if (["undefined", "null"].indexOf(valType) > -1) return true;
  if (valType === "string" && ["", "0"].indexOf(value.trim()) > -1) return true;
  if (valType === "number" && (isNaN(value) || value === 0)) return true;

  // 空的普通对象和普通数组
  if (valType === "object" && Object.keys(value).length <= 0) return true;
  if (valType === "array" && value.length <= 0) return true;

  return false;
}

/**
 * 接收排除项
 * @param {*} value
 * @param {*} exclude [0, NaN, "", "0", null, undefined, {}, []]
 * @returns
 */
export function isEmptyExclude(value, exclude = []) {
  if (exclude.length <= 0) return isEmpty(value);

  const valType = getType(value);
  let flag = true;

  // 被检测值是否为规则内的空值
  const oCondition = valType === "object" && Object.keys(value).length <= 0;
  // NOTICE: 小于等于0仅匹配{}，其他对象走isEmpty（√）；大于等于0匹配所有对象，全部跳过验证（×）。
  const aCondition = valType === "array" && value.length <= 0;
  const nCondition = valType === "number" && ["NaN", "0"].indexOf(value.toString()) > -1;
  const sCondition = valType === "string" && ["", "0"].indexOf(value.trim()) > -1;
  const eCondition = ["undefined", "null"].indexOf(valType) > -1;
  const result = oCondition || aCondition || nCondition || sCondition || eCondition;
  // console.log(oCondition, aCondition, nCondition, sCondition, eCondition);

  for (let key of exclude) {
    const keyType = getType(key);

    // 被检测值与排除项类型相同，且是规则内的空值 -> 被检测值被排除，则不是空值
    if (valType === keyType && result) {
      flag = false;
      break;
    }
  }

  if (!flag) return false;
  return isEmpty(value);
}

/**
 * 清除数组空属性 (支持深层次递归)
 * @param {Array} value
 * @param {Array} exclude 想排除空值的数组
 * @param {Boolean} deep 是否深层次遍历
 * @returns
 */
export function trimArray(value, exclude = [], deep = true) {
  let _newVal = [];
  if (getType(value) !== "array" || value.length <= 0) return [];

  for (let element of value) {
    // 为空跳出循环
    if (isEmptyExclude(element, exclude)) continue;

    if (!deep) {
      _newVal.push(element);
      continue;
    }
    // 对object和array做进一步deep处理
    const elementType = getType(element);
    if (elementType === "object") {
      const oTrim = trimObject(element, exclude, true);
      if (isEmptyExclude(oTrim, exclude)) continue;
      _newVal.push(oTrim);
    } else if (elementType === "array") {
      const aTrim = trimArray(element, exclude, true);
      if (isEmptyExclude(aTrim, exclude)) continue;
      _newVal.push(aTrim);
    } else {
      _newVal.push(element);
    }
  }
  return _newVal;
}

/**
 * 清除对象空属性 (支持深层次递归)
 * @param {Object} value
 * @param {Array} exclude 想排除空值的数组
 * @param {Boolean} deep 是否深层次遍历
 * @returns
 */
export function trimObject(value, exclude = [], deep = true) {
  let _newVal = {};
  if (getType(value) !== "object" || Object.keys(value).length <= 0) return [];

  for (let key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      // 为空跳出循环
      const element = value[key];
      if (isEmptyExclude(element, exclude)) continue;

      if (!deep) {
        _newVal[key] = element;
        continue;
      }
      // 对object和array做进一步deep处理
      const elementType = getType(element);
      if (elementType === "object") {
        const oTrim = trimObject(element, exclude, true);
        if (isEmptyExclude(oTrim, exclude)) continue;
        _newVal[key] = oTrim;
      } else if (elementType === "array") {
        const aTrim = trimArray(element, exclude, true);
        if (isEmptyExclude(aTrim, exclude)) continue;
        _newVal[key] = aTrim;
      } else {
        _newVal[key] = element;
      }
    }
  }
  return _newVal;
}
