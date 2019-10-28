var assert = require('assert');

describe('Types and grammar', function() {
  it('Type of `null` is `object`', () => {
    assert.equal(typeof(null), 'object')
  })

  it('Compund condition detects a null', () => {
    const a = null
    assert.equal(!a && typeof a === 'object', true)
  })

  it('Function`s length property equals its arguments count', () => {
    function f(a, b) {}

    assert.equal(f.length, 2)
  })

  it('typeof array is `object`', () => {
    assert.equal(typeof [1, 2], 'object')
  })

  // even though attempting to read such value will result in a ReferenceError!
  it('typeof operator returns `undefined` even for undeclared variables', () => {
    assert.equal(typeof b, 'undefined')
  })

  it('accessing a non existing object property won`t result in a ReferenceError', () => {
    const obj = { a: 1, b: 2 }

    assert.equal(obj.c, undefined)
  })

  it('Delete on an array won`t update array`s length', () => {
    const array = [1, 2, 3]
    assert.equal(array.length, 3)

    delete array[0]

    assert.equal(array[0], undefined)
    assert.equal(array.length, 3)
  })

  it('non-numeric indexes won`t count towards array`s length', () => {
    const array = []
    
    array[0] = 1
    array["one"] = 2

    assert.equal(array.length, 1)
  })

  it('number as string can mess up array`s length', () => {
    const array = []

    array["13"] = 0
    
    assert.equal(array.length, 14)
  })

  it('strings are immutable, arrays are not', () => {
    const array = [1, 2]
    const string = "12"

    array[0] = 5
    assert.equal(array[0], 5)

    string[0] = "5"
    assert.equal(string[0], "1")
  })

  it('Even though arrays have reverse method, strings do not', () => {
    assert.equal(typeof [].reverse, 'function')
    assert.equal(typeof "string".reverse, 'undefined')
  })

  it('Number.prototype.toFixed returns a string', () => {
    assert.equal(42.69.toFixed(1), '42.7')
  })

  it('void `voids` a value, but doesn`t override it', () => {
    const a = 42
    
    assert.equal(void a, undefined)
    assert.equal(a, 42)
  })

  it('typeof NaN is still a number', () => {
    const a = 2 / 'foo'

    assert.equal(isNaN(a), true)
    assert.equal(typeof a, 'number')
  })

  it('NaN is the only type in the JS that is not equal to itself', () => {
    assert.notEqual(NaN, NaN)
  })

  // but they aren't numbers either!
  it('isNaN returns true even for values that aren`t NaN...', () => {
    assert.equal(isNaN('faf'), true)
  })

  it('... but number.isNaN does not', () => {
    assert.equal(Number.isNaN('faf'), false)
  })

  it('Diving by zero in JS results in infinity, not runtime exception.', () => {
    assert.equal(1 / 0, Number.POSITIVE_INFINITY)
    assert.equal(-1 / 0 , Number.NEGATIVE_INFINITY)
  })

  it('Special equality does check some special cases where normal operators won`t work', () => {
    assert.equal(Object.is(-3 * 0, -0), true)
    assert.equal(Object.is(-3 * 0, 0), false)

    // when in the meantime...
    assert.equal(-3 * 0, 0)
  })

  it('You can modify a value via reference, but you can`t override it to point to a different value', () => {
    const func = a => {
      a.push(5)

      // this won't do anything!
      a = [1, 2, 3]
      a.push(4)
    }

    let x = [1, 2]
    func(x)

    assert.deepEqual(x, [1, 2, 5])
  })
});