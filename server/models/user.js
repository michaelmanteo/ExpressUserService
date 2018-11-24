const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now
    },
        lastLogin:{
        type: Date,
        default: null
    }
});

// Hash and Salt
userSchema.pre('save', async function(next) {
    try {
      //if password is not modified skip rehash
      if (!this.isModified('password')) return next();
      // Generate Salt
      const salt = await bcrypt.genSalt(10);
  
      // Hash password
      const hashPassword = await bcrypt.hash(this.password, salt);
  
      // reassign password to user
      this.password = hashPassword;
      next();
    } catch (error) {
      console.log(error);
  
    }
});

// Check if password matches, returns boolean
userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(e);
    }
}

userSchema.methods.hashPass = async function(password){
    try {
        // Generate Salt
        const salt = await bcrypt.genSalt(10);

        //return Hash password
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;

    } catch (e) {
        console.log(e);
    }
}

const User = mongoose.model('user', userSchema);
module.exports = User;