import mongooseApi from 'mongoose';

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

// check if a user is already in the database and if only it is'nt then create a new user using the schema
const User = models.User || model("User", UserSchema);

export default User; 