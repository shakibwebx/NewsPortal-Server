import { Request, Response } from 'express';
import { SiteSettings } from './settings.model';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();

    // If no settings exist, create default
    if (!settings) {
      settings = await SiteSettings.create({
        youtubeVideoUrl: '',
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching settings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const { youtubeVideoUrl } = req.body;

    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({
        youtubeVideoUrl,
      });
    } else {
      settings.youtubeVideoUrl = youtubeVideoUrl;
      await settings.save();
    }

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating settings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
