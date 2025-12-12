import mongoose, { Schema } from 'mongoose';
import { ISiteSettings } from './settings.interface';

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    youtubeVideoUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
