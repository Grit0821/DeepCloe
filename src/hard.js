let cache = []

function deepClone(source) {
  if (source instanceof Object) {
    let cacheDist = findCache(source)
    if (cacheDist) {
      // 有缓存
      return cacheDist
    } else {
      // 无缓存
      let dist
      if (source instanceof Array) { // 先特殊后一般
        dist = new Array()
      } else if (source instanceof Function) {
        dist = function () {
          return source.apply(this, arguments)
        }
      } else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags)
      } else if (source instanceof Date) {
        dist = new Date(source)
      } else {
        dist = new Object()
      }
      // dist 初始化以后就要 push
      cache.push([source, dist])
      for (let key in source) { // for in 默认会遍历原型上的属性
        if (source.hasOwnProperty(key)) { // 只拷贝本身的属性, hasOwnPropety()忽略原型链属性
          dist[key] = deepClone(source[key])
        }
      }
      return dist
    }
  }
  return source
}


function findCache(source) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === source) {
      return cache[i][1]
    }
  }
  return undefined
}

module.exports = deepClone