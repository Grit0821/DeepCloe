/**
 * 中等版本：用来面试答题
 * 考虑环引用，
 * 不拷贝原型链上的属性
 * 引用数据类型只有对象和数组
 */

let cache = [] // 只缓存引用类型
 function deepClone(source){
  if(source instanceof Object){
    let cacheDist = findCache(source)
    if(cacheDist){
      return cacheDist
    }else{
      let dist 
      if(source instanceof Array){
        dist = new Array()
      }else{
        dist = new Object()
      }
      cache.push([source, dist])
      for(let key in source){
        // 不拷贝原型链上的属性
        if(source.hasOwnProperty(key)){
          dist[key] = deepClone(source[key])
        }
      }
      return dist 
    }
    
  }
  return source
}

function findCache(source){
  for(let i=0; i< cache.length; i++){
    if(cache[i][0] ===source){
      return cache[i][1]
    }
  }
  return undefined
}

module.exports = deepClone