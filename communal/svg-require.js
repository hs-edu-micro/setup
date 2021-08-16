/**
 * 导入某个文件夹下全部svg资源
 */
function requireAll(requireContext) {
  // @params aSvgName {Array<string>}
  const aSvgName = requireContext.keys();

  // let aName = aSvgName.map(item=>{
  //   const ret = item.match(/(?<=.\/).*?(?=.svg)/);
  //   return ret ? ret[0] : '';
  // });

  const aSvgFile = aSvgName.map(requireContext);
  return aSvgFile;
}

export default requireAll;

/**
 * 正则示例：
 * @description 正则匹配以[开头、以]结尾不包含[]: str.match(/(?<=\[).*?(?=\])/g)
 * @description 正则匹配以[开头、以]结尾包含[]: str.match(/\[.*?\]/g)
 * @description 正则匹配以{开头、以}结尾包含{}: str.match(/\{[^\{]+\}/g)
 * @description 正则匹配以{开头、以}结尾不包含{}: str.match(/(?<=\{).*?(?=\})/g)
 */
