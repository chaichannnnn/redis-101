const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);

// const dataSchema = new mongoose.Schema({
//     name: {
//         required: true,
//         type: String
//     },
//     age: {
//         required: true,
//         type: Number
//     }
// });

// module.exports = mongoose.model('Data', dataSchema);
