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
  var day = Math.floor(difValue / 1000 / 60 / 60 / 24);//天
  difValue = difValue % (1000 * 60 * 60 * 24);
  var hour = Math.floor(difValue / 1000 / 60 / 60);//小时
  difValue = difValue % (1000 * 60 * 60);
  var min = Math.floor(difValue / 1000 / 60);//分钟
  difValue = difValue % (1000 * 60);
  var second = Math.floor(difValue / 1000);
  let returnString = second + "秒"
  if(min){
    returnString = min + "分钟" + returnString
  }
  if(hour){
    returnString = hour + "小时" + returnString
  }
  if(day){
    returnString = day + "天" + returnString
  }
  return  returnString
}
module.exports = {
  formatTime: formatTime,
  getDifValue
}
