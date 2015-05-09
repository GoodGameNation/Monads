var TypeError = "TypeError";

function checkType(context, obj) {
  if (!(obj instanceof context.constructor)){
    throw TypeError;
  }
  return obj;
}

function Identity(value) {
  this.value = value;
}

Identity.prototype.pipe = function(transform) {
  return checkType(this, transform(this.value));
};

Identity.prototype.fmap = function(transform) {
  // TODO
};

// Maybe
function Maybe(value) {
  if (!(this instanceof Maybe)) return new Maybe(value);
  this.value = value;
}

function Nothing() {
  return new Maybe(null);
}

Maybe.prototype.pipe = function(transform) {
  if (this.value == null || this.value == undefined) {
    return Nothing();
  }

  return checkType(this, transform(this.value));
};

Maybe.prototype.fmap = function(transform) {
  // TODO
};

Maybe.prototype.inspect = function() {
  return this.value;
}

// list
Array.prototype.pipe = function (transform) {
  var results = [];
  for (var i = 0; i < this.length; i++) {
    result = transform(this[i]);
    results.push(result);
  }
  return results;
};

Array.prototype.fmap = function (transform) {
  // TODO
};

module.exports = {
  Identity: Identity,
  Array: Array
}
