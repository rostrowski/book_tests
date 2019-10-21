var assert = require('assert');

describe('Scopes and closures', function() {
  it('Compiler doesnt care whether variable is redeclared', function() {
    var a = 5
    var a = 6

    assert.equal(a, 6)
  });

  it('RHS lookup results in ReferenceError...', function() {
    let hadReferenceError = false

    try {
      b
    } catch (ex) {
      if (ex instanceof ReferenceError) {
        hadReferenceError = true
      }
    }

    assert.equal(hadReferenceError, true)
  });

  // that is - when not in a strict mode - in such case unreferenced variable will be simply created.
  it('...but LHS lookup does not', function() {
    let hadReferenceError = false

    try {
      b = true
    } catch (ex) {
      if (ex instanceof ReferenceError) {
        hadReferenceError = true
      }
    }

    assert.equal(hadReferenceError, false)
  });

  it('Impossible operation results in a TypeError', function() {
    let hadTypeError = false

    try {
     const b = true
     b()
    } catch (ex) {
      if (ex instanceof TypeError) {
        hadTypeError = true
      }
    }

    assert.equal(hadTypeError, true)
  });

  // in non strict mode
  it('`with` will create a property on the outer scope if it doesn`t exist on an object', function() {
    const obj = {
      c: 2
    }

    with (obj) {
      d = 3
    }

    assert.equal(obj.d, undefined)
    assert.equal(global.d, 3)

    // afer
    delete global.d
  });

  it('variables aren`t accessible outside of function`s scope', function() {
    let hadReferenceError = false
    try {
      function x () {
        var a = 5
      }
      assert.equal(a, 5)
    } catch (ex) {
      if (ex instanceof ReferenceError) {
        hadReferenceError = true
      }
    }

    assert.equal(hadReferenceError, true)
  })

  it('self invoking function is not visible in the outer scope', function() {
    let hadReferenceError = false
    try {
      (function foo(){})()
      foo()
    } catch (ex) {
      if (ex instanceof ReferenceError) {
        hadReferenceError = true
      }
    }

    assert.equal(hadReferenceError, true)
  })

  it('functions are hoisted...', function() {
    let hadReferenceError = false

    try {
      foo()
      function foo() {}
    } catch (ex) {
      if (ex instanceof ReferenceError) {
        hadReferenceError = true
      }
    }

    assert.equal(hadReferenceError, false)
  })

  it('...but functions expressions are not.', function() { // they also result in a TypeError, not ReferenceError!
    let hadReferenceError = false

    try {
      foo()
      var foo = function () {}
    } catch (ex) {
      if (ex instanceof TypeError) {
        hadReferenceError = true
      }
    }

    assert.equal(hadReferenceError, true)
  })

  it('Functions are hoisted first, then other variables', function() {
    var actual = foo()
    
    var foo = function () {
      return 2
    }

    function foo () {
      return 1
    }

    assert.equal(actual, 1)
  })

  // which means that JS cares where the function was declared, rather than where it was called
  it('JS has lexical scope, not dynamic scope', function() {
    function foo() {
      return a
    }

    function bar() {
      var a = 5
      return foo()
    }

    var a = 6

    assert.equal(bar(), 6) // not 5!
  })
});