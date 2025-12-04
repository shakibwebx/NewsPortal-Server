import { Category } from './category.model';
import { ICategory } from './category.interface';
import AppError from '../../utils/AppError';

const getAllCategories = async () => {
  const categories = await Category.find({ isActive: true }).sort({ order: 1 });
  return categories;
};

const getCategoryBySlug = async (slug: string) => {
  const category = await Category.findOne({ slug, isActive: true });

  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  return category;
};

const createCategory = async (payload: Partial<ICategory>) => {
  const category = await Category.create(payload);
  return category;
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  const category = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  return category;
};

const deleteCategory = async (id: string) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  return category;
};

export const CategoryService = {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};
