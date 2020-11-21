import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, index: true, dropDups: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

userSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password,10);
  next()

})
const userModel = mongoose.model('User', userSchema);

export default userModel;