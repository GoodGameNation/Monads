var TypeError = "TypeError";

function checkType(context, obj) {
  if (!(obj instanceof context.constructor)){
    throw TypeError;
  }
  return obj;
}

function Identity(value) {
  if (!(this instanceof Identity)) return new Identity(value);
  this.value = value;
}

Identity.prototype.pipe = function(transform) {
  return checkType(this, transform(this.value));
};

Identity.prototype.fmap = function(transform) {
  return new Identity(transform(this.value))
};

// Maybe
function Maybe(value) {
  if (!(this instanceof Maybe)) return new Maybe(value);
  this.value = value;
}

function Nothing() {
  return new Maybe(null);
}
function Just(value) {
  return new Maybe(value);
}

Maybe.prototype.pipe = function(transform) {
  if (this.value === null || this.value === undefined) {
    return Nothing();
  }

  return checkType(this, transform(this.value));
};

Maybe.prototype.fmap = function(transform) {
  var transformValue
  if(this.value === null || this.value === undefined) {
    return Nothing()
  }
  transformValue = transform(this.value)
  if( transformValue === null || transformValue === undefined) {
    return Nothing()
  }
  return Just(transform(this.value))
};

Maybe.prototype.inspect = function() {
  return this.value;
}

// Usage: List(1,2,3,4,5,6)
function List() {
  if (!(this instanceof List)) return new List(...Array.prototype.slice.call(arguments));
  this.value = Array.prototype.slice.call(arguments)
}

// list
List.prototype.pipe = function (transform) {
  var results = [];
  for (var i = 0; i < this.value.length; i++) {
    var result = transform(this.value[i]);
    results = results.concat(result.value);
  }
  return List(...results);
};

List.prototype.fmap = function (transform) {
  var results = []
  for(var i=0; i < this.value.length; i++) {
    results[i] = transform(this.value[i]);
  }
  return List(...results)
};

module.exports = {
  Identity: Identity,
  Maybe: Maybe,
  Just: Just,
  List: List,
  Nothing: Nothing,
  Array: Array
}
