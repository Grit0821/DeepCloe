/**
 * index.js 是面试手写的函数版本，如果面试官问还有什么问题可以答如下思路：
 * cache 缓存会共用，可以用面向对象改造变为 class 版本
 * 使用方法： 
 * let deepClone = new DeepClone()
 * deepClone(var)
 * 这样每次深拷贝用的都是一个单独的实例，有自己私有的 cache
 */

class DeepClone {
  cache = []
  clone(source) {
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
        this.cache.push([source, dist])
        for (let key in source) { // for in 默认会遍历原型上的属性
          if (source.hasOwnProperty(key)) { // 只拷贝本身的属性, hasOwnPropety()忽略原型链属性
            dist[key] = this.clone(source[key])
          }
        }
        return dist
      }
    }
    return source
  }
  findCache(source){
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === source) {
        return this.cache[i][1]
      }
    }
    return undefined
  }
}

module.exports = DeepClone