const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getDifValue = (nowtimestamp, beforetimestamp) => {
  var difValue = nowtimestamp - beforetimestamp;
  var day = Math.floor(difValue / 1000 / 60 / 60 / 24); //天
  difValue = difValue % (1000 * 60 * 60 * 24);
  var hour = Math.floor(difValue / 1000 / 60 / 60); //小时
  difValue = difValue % (1000 * 60 * 60);
  var min = Math.floor(difValue / 1000 / 60); //分钟
  difValue = difValue % (1000 * 60);
  var second = Math.floor(difValue / 1000);
  let returnString = second + "秒"
  if (min) {
    returnString = min + "分钟" + returnString
  }
  if (hour) {
    returnString = hour + "小时" + returnString
  }
  if (day) {
    returnString = day + "天" + returnString
  }
  return returnString
}
/**
 * 
 * @param {*} nowtimestamp 
 */
const matchPrice = (time) => {
  // 分为两种 一种是138 90分钟 超出后每分钟按照1.5元收费
  // 另外一种88元 90分钟 超出后按照每分钟1元
  let rules = [{
      name: "A",
      limitPrice: 138,
      limitTime: 90,
      evenTimePrice: 1.5
    },
    {
      name: "B",
      limitPrice: 88,
      limitTime: 90,
      evenTimePrice: 1
    }
  ]
  var day = Math.floor(difValue / 1000 / 60 / 60 / 24); //天
  difValue = difValue % (1000 * 60 * 60 * 24);
  var hour = Math.floor(difValue / 1000 / 60 / 60); //小时
  difValue = difValue % (1000 * 60 * 60);
  var min = Math.floor(difValue / 1000 / 60); //分钟
  difValue = difValue % (1000 * 60);
  var second = Math.floor(difValue / 1000);
  let returnString = second + "秒"



}
module.exports = {
  formatTime: formatTime,
  getDifValue
}