/**
 * 简单版本：用来面试挖坑,别问，问就是没考虑环引用和其他复杂数据类型
 * 不考虑环引用，
 * 不拷贝原型链上的属性
 * 引用数据类型只有对象和数组
 */

function deepClone(source){
  if(source instanceof Object){
    let dist 
    if(source instanceof Array){
      dist = new Array()
    }else{
      dist = new Object()
    }
    for(let key in source){
      // 不拷贝原型链上的属性
      if(source.hasOwnProperty(key)){
        dist[key] = deepClone(source[key])
      }
    }
    return dist 
  }
  return source
}

module.exports = deepClone