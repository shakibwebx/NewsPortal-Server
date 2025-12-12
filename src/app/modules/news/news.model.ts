import mongoose, { Schema } from 'mongoose';
import { INews } from './news.interface';

const NewsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    upazila: {
      type: String,
      enum: ['chuadanga-sadar', 'alamdanga', 'damurhuda', 'jibannagar', ''],
      default: '',
      trim: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    image: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBreaking: {
      type: Boolean,
      default: false,
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title before saving
NewsSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    // Simple slug generation (Bengali-friendly)
    this.slug = `${this._id}-${Date.now()}`;
  }
  next();
});

NewsSchema.index({ title: 'text', content: 'text' });
NewsSchema.index({ category: 1, publishedAt: -1 });
NewsSchema.index({ featured: 1, publishedAt: -1 });
NewsSchema.index({ slug: 1 }, { unique: true });

export const News = mongoose.model<INews>('News', NewsSchema);
