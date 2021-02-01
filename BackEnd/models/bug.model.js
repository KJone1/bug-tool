const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let BugSchema = new Schema(
  {
    BugName: {
      type: String,
      trim: true,
      minlength: 1,
      required: true,
    },
    BugDescription: {
      type: String,
      trim: true,
    },
    Version: {
      type: Number,
      required: true,
    },
    IsRepeatable: {
      type: Boolean,
      required: true,
    },
    Submitter: {
      type: String,
      required: true,
    },
    IsComplete: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Bug", BugSchema);
