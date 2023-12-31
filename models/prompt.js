import { Schema, models, model } from "mongoose";

const PromptSchema = new Schema({
  // establishes a one to many relationship between a user and the prompt 
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."]
  },
});


const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;