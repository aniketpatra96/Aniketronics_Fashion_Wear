import mongoose from "mongoose";

const TshirtSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: [String],
      required: true,
    },
    color: {
      type: Map,
      of: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    availableQty: {
      type: Map,
      of: {
        type: Map,
        of: Number,
      },
      required: true,
    },
  },
  { timestamps: true }
);

const HoodySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: [String],
      required: true,
    },
    color: {
      type: Map,
      of: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    availableQty: {
      type: Map,
      of: {
        type: Map,
        of: Number,
      },
      required: true,
    },
  },
  { timestamps: true }
);

const StickerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    availableQty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const MugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    availableQty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Tshirt = mongoose.models.Tshirt || mongoose.model("Tshirt", TshirtSchema);
const Hoody = mongoose.models.Hoody || mongoose.model("Hoody", HoodySchema);
const Sticker = mongoose.models.Sticker || mongoose.model("Sticker", StickerSchema);
const Mug = mongoose.models.Mug || mongoose.model("Mug", MugSchema);

export { Tshirt, Hoody, Sticker, Mug };