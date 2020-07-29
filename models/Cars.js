const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  carname: {
    type: String,
    required: true,
  },
  driver: {
    type: String,
    default: 'Нету Водителя',
  },
  description: {
    type: String,
    default: 'Описание еще не было добавлено',
  },
  phone_number: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  date_of_last_ensure: {
    type: Date,
    required: true,
  },
  date_of_end_ensure: {
    type: Date,
    required: true,
  },
  date_of_next_check: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    default: 'Нету',
  },
  type_of_car: {
    type: String,
    required: true,
  },
  gov_number: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    default: 'нету почты',
  },
  warnings: {
    type: [String],
    default: '',
  },
});

module.exports = Car = mongoose.model('car', CarSchema);
