const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const assert = chai.assert
const deepClone = require('../src/index')
describe("deepClone", () => {
  it('是一个函数', ()=> {
    assert.isFunction(deepClone)
  })
  it('能够复制基本类型', () =>{
    // 6种基本数据类型：number, boolean, string, undefined, null， Symbol
    // 以 number 为例
    const n = 123
    const n2 = deepClone(n)
    assert( n === n2)
  })
  describe('对象', () => {
    it("能够复制普通对象", () => {
      const a = {name: '方方', child: {name: '小方方'}}
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.name = a2.name)
      assert(a.child !== a2.child)
      assert(a.child.name === a2.child.name)
    })
    it("能够复制数组对象", () => {
      const a = [
        [11,12],
        [21,22],
        [31,32]
      ]
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a[0] != a2[0])
      assert(a[1] != a2[1])
      assert(a[2] != a2[2])
      assert.deepEqual(a, a2)
    })
    it("能够复制函数", () => {
      const a = function(x, y) {
        return x + y;
      };
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a)
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
      assert(a(1, 2) === a2(1, 2));
    });
    it('环也能够复制',()=>{
      const a = {name: '方方'}
      a.self = a
      const a2 = deepClone(a)
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.self !== a2.self);
    })
    xit("不会爆栈", () => { 
      // 面试一般不考虑，思路就是把递归变成循环，将深度转变为长度
      // 创建一个深层嵌套对象， 这tm不就是链表么
      const a = {child: null} // 头结点
      let b = a  // 指针
      for(let i=0 ; i<20000; i++){
        b.child = {child: null}
        b = b.child
      }
      const a2= deepClone(a)
      assert(a !== a2)
      assert(a.child !== a2.child)
    })
    it("可以复制正则表达式", () => {
      const a = new RegExp('hi\\d+', 'gi')
      a.xxx = {yyy: {zzz: 1}}
      const a2 = deepClone(a)
      assert(a.source === a2.source)
      assert(a.flags === a2.flags)
      assert(a !== a2)
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    })
    it("可以复制日期", () => {
      const a = new Date()
      a.xxx = {yyy: {zzz: 1}}
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.getTime() === a2.getTime())
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    })
    it("自动跳过原型属性", () => {
      const a = Object.create({ name: "a" }); // name 放在原型上
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert.isFalse("name" in a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
  })
})