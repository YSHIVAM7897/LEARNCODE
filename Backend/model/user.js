import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    profileImg: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    agreeToTerms: {
      type: Boolean,
      required: true,
    },

    // Address Object
    address: {
      state: { type: String, default: "" },
      country: { type: String, default: "" }
    },

    // Certificates Array
    certificates: [
      {
        candidateName: {type: String, required: true},
        courseName: { type: String, required: true },
        date: { type: String, required: true },
        certificateId: { type: String, required: true, unique: true },
        certificateUrl: { type: String },
      }
    ],

    // Education Array
    education: [
      {
        degree: { type: String, required: true },
        institute: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        cgpa: { type: String },
      }
    ],

    links : [
       {
        title: {type : String, required: true},
        link: {type : String, required: true}
       }
      ],
 
    skills: {
      type: [String],
      default: [],
    }
  },

  // Auto add createdAt / updatedAt fields
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
