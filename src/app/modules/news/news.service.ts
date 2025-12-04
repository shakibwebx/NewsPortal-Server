import { News } from './news.model';
import { INews, INewsQuery } from './news.interface';
import AppError from '../../utils/AppError';

const getAllNews = async (query: INewsQuery) => {
  const { category, featured, page = 1, limit = 10, sort = '-publishedAt' } = query;

  const filter: any = {};
  if (category) filter.category = category;
  if (featured !== undefined) filter.featured = featured;

  const skip = (Number(page) - 1) * Number(limit);

  const news = await News.find(filter)
    .populate('category')
    .sort(sort)
    .limit(Number(limit))
    .skip(skip);

  const total = await News.countDocuments(filter);

  return {
    news,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

const getNewsById = async (id: string) => {
  const news = await News.findById(id).populate('category');

  if (!news) {
    throw new AppError(404, 'News not found');
  }

  return news;
};

const createNews = async (payload: Partial<INews>) => {
  const news = await News.create(payload);
  return news;
};

const updateNews = async (id: string, payload: Partial<INews>) => {
  const news = await News.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!news) {
    throw new AppError(404, 'News not found');
  }

  return news;
};

const deleteNews = async (id: string) => {
  const news = await News.findByIdAndDelete(id);

  if (!news) {
    throw new AppError(404, 'News not found');
  }

  return news;
};

const incrementViews = async (id: string) => {
  const news = await News.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );

  if (!news) {
    throw new AppError(404, 'News not found');
  }

  return news;
};

const getNewsByCategory = async (category: string, page = 1, limit = 10) => {
  const skip = (Number(page) - 1) * Number(limit);

  const news = await News.find({ category })
    .populate('category')
    .sort({ publishedAt: -1 })
    .limit(Number(limit))
    .skip(skip);

  const total = await News.countDocuments({ category });

  return {
    news,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

const getFeaturedNews = async (limit = 5) => {
  const news = await News.find({ isFeatured: true })
    .populate('category')
    .sort({ publishedAt: -1 })
    .limit(Number(limit));

  return news;
};

const getPopularNews = async (limit = 5) => {
  const news = await News.find()
    .populate('category')
    .sort({ views: -1 })
    .limit(Number(limit));

  return news;
};

const searchNews = async (searchQuery: string, page = 1, limit = 10) => {
  if (!searchQuery || searchQuery.trim() === '') {
    return {
      news: [],
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: 0,
        totalPages: 0,
      },
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  // Create text search filter
  const filter = {
    $or: [
      { title: { $regex: searchQuery, $options: 'i' } },
      { summary: { $regex: searchQuery, $options: 'i' } },
      { content: { $regex: searchQuery, $options: 'i' } },
    ],
  };

  const news = await News.find(filter)
    .populate('category')
    .sort({ publishedAt: -1 })
    .limit(Number(limit))
    .skip(skip);

  const total = await News.countDocuments(filter);

  return {
    news,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

export const NewsService = {
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
