import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //Cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, //Cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //We will fetch from cloudinary, if I upload video it will give us duration as well
      required: true,
    },
    views: {
      type: Number,
      defaut: 0,
    },
    isPublished: {
      type: Boolean,
      defaut: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
