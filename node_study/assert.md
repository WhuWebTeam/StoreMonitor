#  assert 断言


### assert(value[, message])  断言 value 正确， 错误信息 message


### assert.ok(value[, message]) 等同于 assert(value[, message])






### assert.deepEqual(actual, expected[, message]) 断言 actual 和 expected 深度相同， 错误信息 message
    
    使用 == 运算符比较
    
    只测试可枚举的自身属性， 不测试对象的原型、 连接符 和 不可枚举的属性

    如果 actual ！= expected 则抛出 AssertionError, 且 message 属性为传入的 message 参数， 否则 message 属性为 undfined


### assert.deepStrictEqual(actual, expected[, message])  断言 actual 和 expected 深度相等， 错误信息 message

    使用 === 运算符比较

    要测试对象的 原型、 标签(变量名)

    如果 actual !== expected 则抛出 AssertionError, 且 message 属性为传入的 message 参数， 否则 message 属性为 undfined


### assert.notDeepEqual(actual, expected [,message]) 断言 actual 和 expected 不深度相等 


### assert.notDeepSrtictEqual(actual, expected [, message]) 断言 actual 和 expected 不严格深度相等






### assert.equal(actual, expected [,message]) 断言 actual 和 expected 相等

    使用 == 比较符

    如果 actual != exected 则抛出 AssertionError, 且 message 属性 为传入的 message 参数， 否则 message 为 undefined


### assert.strictEqual(actual, expected [, message]) 断言 actual 和 expected 严格相等


### assert.notEqual(actual, expected [,message]) 断言 actual 和 expected 不相等


### assert.notStrictEqual(actual, expected [, message]) 断言 actual 和 expected 不严格相等






### assert.ifError(value)  断言 value 错误

    如果 value 为真， 则抛出 value


### assert.notThrowError(block [, errorType] [,meesage]) 断言 block 函数不会抛出错误， 若错误类型匹配 errorType 则 显示 message 信息



