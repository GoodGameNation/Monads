var Monads = require('../lib/monads.js')
  , Identity = Monads.Identity
  , Maybe = Monads.Maybe
  , Nothing = Monads.Nothing
  , Just = Monads.Just
  , should = require("chai").should()

describe('Monads Test', function() {
  describe('Identity Monad', function() {
      it('Test the Identity Monad on an addOne function', function() {
        identity = Identity(1)
        var addOne = function(value) {
          return Identity(value+1)
        }
        identity.pipe(addOne).value.should.equal(2)
      })

      it('Test the Maybe Monad on an addOne function', function() {
        maybe = Just(1)
        var addOne = function(value) {
          return Just(value+1)
        }

        var toNothing = function(value) {
          return Nothing()
        }
        maybe.pipe(addOne).value.should.equal(2)
        maybe.pipe(addOne).pipe(toNothing).pipe(addOne).value.should.equal(null)
      })
    })
})

describe('Functor Test', function() {
  describe('Identity Functor', function() {
      it('Test the Identity Functor on an addOne function', function() {
        identity = Identity(1)
        var addOne = function(value) {
          return value+1
        }
        identity.fmap(addOne).value.should.equal(2)
      })

      it('Test the Maybe functor on an addOne function', function() {
        maybe = Just(1)
        var addOne = function(value) {
          return value+1
        }
        maybe.fmap(addOne).value.should.equal(2)
        maybe = Nothing()
        maybe.fmap(addOne).value.should.equal(null)
      })
    })
})
