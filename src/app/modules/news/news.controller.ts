import { Request, Response } from 'express';
import { NewsService } from './news.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getAllNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.getAllNews(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'News retrieved successfully',
    data: result.news,
    pagination: result.pagination,
  });
});

const getNewsById = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.getNewsById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'News retrieved successfully',
    data: result,
  });
});

const createNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.createNews(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'News created successfully',
    data: result,
  });
});

const updateNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.updateNews(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'News updated successfully',
    data: result,
  });
});

const deleteNews = catchAsync(async (req: Request, res: Response) => {
  await NewsService.deleteNews(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'News deleted successfully',
  });
});

const incrementViews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.incrementViews(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Views incremented successfully',
    data: result,
  });
});

const getNewsByCategory = catchAsync(async (req: Request, res: Response) => {
  const { category } = req.params;
  const { page, limit } = req.query;

  const result = await NewsService.getNewsByCategory(
    category,
    Number(page),
    Number(limit)
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'News retrieved successfully',
    data: result.news,
    pagination: result.pagination,
  });
});

const getFeaturedNews = catchAsync(async (req: Request, res: Response) => {
  const { limit } = req.query;
  const result = await NewsService.getFeaturedNews(Number(limit));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Featured news retrieved successfully',
    data: result,
  });
});

const getPopularNews = catchAsync(async (req: Request, res: Response) => {
  const { limit } = req.query;
  const result = await NewsService.getPopularNews(Number(limit));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Popular news retrieved successfully',
    data: result,
  });
});

const searchNews = catchAsync(async (req: Request, res: Response) => {
  const { q, page, limit } = req.query;
  const result = await NewsService.searchNews(
    String(q || ''),
    Number(page),
    Number(limit)
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Search results retrieved successfully',
    data: result.news,
    pagination: result.pagination,
  });
});

export const NewsController = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  incrementViews,
  getNewsByCategory,
  getFeaturedNews,
  getPopularNews,
  searchNews,
};
