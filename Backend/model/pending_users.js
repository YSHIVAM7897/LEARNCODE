import mongoose from 'mongoose';

const pendingUserSchema = new mongoose.Schema( {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true, 
  },
  email: {
    type: String, 
    required: true,
    unique: true,
  }, 
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  profileImg: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  }, 
  agreeToTerms: {
    type: Boolean,
    required: true,
  },
  address: {
      state: { type: String, default: "" },
      country: { type: String, default: "" }
    },
  createdAt: { type: Date, default: Date.now, expires: 6 * 60 }
});

const PendingUser = mongoose.model('PendingUser', pendingUserSchema);
export default PendingUser;