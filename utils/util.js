/**
 * 数字转数组
 */
function convertToStarsArray(stars) {
  const num = stars.toString().substring(0, 1)
  const arr = []
  for( let i = 1; i<=5; i++) {
    if (i < num) {
      arr.push(1)
    } else {
      arr.push(0)
    }
  }
  return arr
}

/**
 * 请求数据
 */
function http (url, callBack) {
  wx.request({
    url,
    method: 'GET',
    header: {
      "Content-Type": 'json'
    },
    success: (res) => {
      callBack(res.data)
    },
    fail: (error) => {
      console.log(error)
    }
  })
}

/**
 * 转成字符串
 */
function convertToCastString(casts) {
  let castjoin = ''
  casts.map(item => {
    castjoin += item.name + ' / '
  })
  return castjoin.substring(0, castjoin.length - 2)
}

function convertToCastInfos(casts) {
  const castsArray = []
  casts.map(item => {
    const cast = {
      img: item.avatars ? item.avatars.large : '',
      name: item.name
    }
    castsArray.push(cast)
  })
  return castsArray
}

module.exports = {
  convertToStarsArray,
  http,
  convertToCastString,
  convertToCastInfos 
}