// 分为两种 一种是138 90分钟 超出后每分钟按照1.5元收费
// 另外一种88元 90分钟 超出后按照每分钟1元
let shops = [{
  name: "店铺A",
  rules: [{
      type: "A",
      limitPrice: 138,
      limitTime: 90,
      evenTimePrice: 1.5
    },
    {
      type: "B",
      limitPrice: 88,
      limitTime: 90,
      evenTimePrice: 1
    }
  ]
}]
let typesDict = [{
  name: "A",
  value: "套餐A",
  remark: "套餐A,138元90分钟,超出后每分钟按照1.5元收费"
}, {
  name: "B",
  value: "套餐B",
  remark: "套餐B,88元90分钟,超出后按照每分钟1元"
}]
/**
 * 计算消费金额
 * @param {*} nowtimestamp 
 */
const matchPrice = (shop, type, time) => {
  let rule = []
  // 默认第一家店
  if (!shop) {
    rule = shops[0].rules
  }
  let findRuleObj = rule.find(ruleItem => ruleItem.type === type)


  var min = Math.floor(time / 1000 / 60); //分钟
  var sTime = time - min * 60 * 1000
  var second = Math.floor(sTime / 1000);
  console.log("使用了" + min + "分" + second + "秒")
  // 不超套餐则按套餐计费
  if (min < findRuleObj.limitTime) {
    return findRuleObj.limitPrice
  } else if (min == findRuleObj.limitTime) {
    if (second == 0) {
      return findRuleObj.limitPrice
    } else {
      return findRuleObj.limitPrice + findRuleObj.evenTimePrice
    }
  } else if (min > findRuleObj.limitTime) {
    let addPrice = 0
    let caTime = min - findRuleObj.limitTime
    if (second == 0) {
      return findRuleObj.limitPrice + caTime * findRuleObj.evenTimePrice
    } else {
      return findRuleObj.limitPrice + caTime * findRuleObj.evenTimePrice + findRuleObj.evenTimePrice
    }
  }
}
module.exports = {
  matchPrice,
  typesDict
}