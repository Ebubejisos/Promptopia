import mongooseApi from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model, models } = mongooseApi;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
});

// Hash and set the password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('hashedPassword') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
      this.hashedPassword = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

// check if a user is already in the database and if only it is'nt then create a new user using the schema
const User = models.User || model("User", UserSchema);

export default User; 