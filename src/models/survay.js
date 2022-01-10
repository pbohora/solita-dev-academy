const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  sensorType: { type: String, required: true },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Farm',
  },
});

surveySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Survey', surveySchema);
