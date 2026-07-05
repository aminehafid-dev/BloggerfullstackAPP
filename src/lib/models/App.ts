import mongoose, { Schema, Document } from 'mongoose';

export interface IApp extends Document {
  name: string;
  description: string;
  category: string;
  developer: mongoose.Types.ObjectId;
  icon?: string;
  screenshots?: string[];
  downloadUrl: string;
  version: string;
  rating: number;
  downloads: number;
  size: string;
  requirements: string;
  createdAt: Date;
}

const AppSchema = new Schema<IApp>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  developer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  icon: String,
  screenshots: [String],
  downloadUrl: { type: String, required: true },
  version: { type: String, default: '1.0.0' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  downloads: { type: Number, default: 0 },
  size: String,
  requirements: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.App || mongoose.model('App', AppSchema);
