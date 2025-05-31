const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true,  lowercase: true,
  match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },
  password: { type: String, required: true },
  phone: String,
  residenceType: String,
  monthlyIncome: Number,
  previousLoan: Boolean,
  maritalStatus: String,
  numberOfDependents: Number,
  city: String,
  state: String,
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch(err) {
    next(err);
  }
});

// Method to compare password on login
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
