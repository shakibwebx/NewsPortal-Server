# News Portal Server

Professional news portal backend built with Express, TypeScript, and MongoDB.

## 🏗️ Project Structure

```
server/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── news/              # News module
│   │   │   │   ├── news.controller.ts
│   │   │   │   ├── news.service.ts
│   │   │   │   ├── news.model.ts
│   │   │   │   ├── news.interface.ts
│   │   │   │   └── news.routes.ts
│   │   │   ├── category/          # Category module
│   │   │   │   ├── category.controller.ts
│   │   │   │   ├── category.service.ts
│   │   │   │   ├── category.model.ts
│   │   │   │   ├── category.interface.ts
│   │   │   │   └── category.routes.ts
│   │   │   └── comment/           # Comment module
│   │   │       ├── comment.controller.ts
│   │   │       ├── comment.service.ts
│   │   │       ├── comment.model.ts
│   │   │       ├── comment.interface.ts
│   │   │       └── comment.routes.ts
│   │   ├── middlewares/
│   │   │   ├── globalErrorHandler.ts
│   │   │   └── notFound.ts
│   │   └── utils/
│   │       ├── catchAsync.ts
│   │       ├── AppError.ts
│   │       └── sendResponse.ts
│   ├── config/
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── package.json
├── tsconfig.json
└── vercel.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration

### Running the Server

**Development:**
```bash
npm run dev
```

**Build:**
```bash
npm run build
```

**Production:**
```bash
npm start
```

## 📡 API Endpoints

### News Routes
- `GET /api/news` - Get all news (with pagination)
- `GET /api/news/featured` - Get featured news
- `GET /api/news/popular` - Get popular news by views
- `GET /api/news/category/:category` - Get news by category
- `GET /api/news/:id` - Get single news by ID
- `POST /api/news` - Create new news
- `PUT /api/news/:id` - Update news
- `DELETE /api/news/:id` - Delete news
- `PATCH /api/news/:id/views` - Increment views

### Category Routes
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Comment Routes
- `GET /api/comments?newsId=xxx` - Get comments by news ID
- `POST /api/comments` - Create comment
- `PATCH /api/comments/:id/approve` - Approve comment
- `DELETE /api/comments/:id` - Delete comment

## 🏛️ Architecture

### Modular Pattern
Each module follows a consistent structure:
- **Interface**: TypeScript types and interfaces
- **Model**: Mongoose schema and model
- **Service**: Business logic layer
- **Controller**: Request/response handling
- **Routes**: API route definitions

### Error Handling
- Global error handler middleware
- Custom AppError class
- Async error wrapper (catchAsync)
- Mongoose error handling

### Response Format
```typescript
{
  success: boolean,
  message: string,
  data?: any,
  count?: number,
  pagination?: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
```

## 🔒 Environment Variables

See `.env.example` for all required environment variables.

## 📦 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

Configuration is in `vercel.json`

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Mongoose validators
- **Error Handling**: Custom middleware

## 📝 License

MIT
