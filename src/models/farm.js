const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const farmSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  surveys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
    },
  ],
});

farmSchema.plugin(uniqueValidator);

farmSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

farmSchema.methods.toSimpleJSON = function () {
  return {
    name: this.name,
    id: this._id,
  };
};

module.exports = mongoose.model("Farm", farmSchema);
