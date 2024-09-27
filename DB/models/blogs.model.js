import { model, Schema } from "mongoose";

const blogsSchema = new Schema(
  {
    url: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    Image: {
      secure_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const blogsModel = model("blogs", blogsSchema);
