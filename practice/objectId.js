const mongoose = require('mongoose');

const id = mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid("1233")
console.log(isValid)
