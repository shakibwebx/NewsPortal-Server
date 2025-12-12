import express from 'express';
import { getSettings, updateSettings } from './settings.controller';
import { authMiddleware, adminMiddleware } from '../../middlewares/auth';

const router = express.Router();

// Public route - get settings
router.get('/', getSettings);

// Admin only - update settings
router.put('/', authMiddleware, adminMiddleware, updateSettings);

export const SettingsRoutes = router;
