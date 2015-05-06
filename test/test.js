var Monads = require('../lib/monads.js')
  , Identity = Monads.Identity
  , Array = Monads.Array
  , assert = require("assert")

describe('Monads Test', function() {
  describe('Identity Monad', function() {
      it('Test the Identity Monad on an addOne function', function() {
        identity = new Identity(1)
        addOne = function(value) {
          return new Identity(value+1)
        }
        assert.equal(identity.pipe(addOne).value, 2)
        })
    })
})
