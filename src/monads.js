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

module.exports = {
  Identity: Identity,
  Array: Array
}
