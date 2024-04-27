import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  brand: string;
  category: string;
  title: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnailImage: string;
  galleryImages: string[];
  description: string;
  rating: string;
  reviews: string[];
}

const ProductSchema: Schema = new Schema(
  {
    brand: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true },
    thumbnailImage: { type: String, required: true },
    galleryImages: { type: [String], required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: [String] },
  },
  { timestamps: true }
);

const ProductModel =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
