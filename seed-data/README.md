# Seed Data Import

এই ফোল্ডারে fake/demo data আছে যা MongoDB তে import করা যাবে।

## ফাইলসমূহ

- `categories.json` - ৯টি category (জাতীয়, আন্তর্জাতিক, রাজনীতি, ব্যবসা, খেলা, বিনোদন, প্রযুক্তি, স্বাস্থ্য, শিক্ষা)
- `news.json` - ১৬টি বাংলা news article (বিভিন্ন category তে)
- `import.js` - Data import script

## কিভাবে Import করবেন

### Method 1: Script দিয়ে (সহজ)

```bash
# Server directory তে যান
cd server

# Import করুন
node seed-data/import.js
```

### Method 2: MongoDB Compass দিয়ে

1. MongoDB Compass খুলুন
2. আপনার database এ connect করুন
3. `categories` collection তৈরি করুন
4. Import করুন: `categories.json`
5. `news` collection তৈরি করুন
6. Import করুন: `news.json`

### Method 3: MongoDB Shell দিয়ে

```bash
# Categories import
mongoimport --uri="your-mongodb-uri" --collection=categories --file=seed-data/categories.json --jsonArray

# News import
mongoimport --uri="your-mongodb-uri" --collection=news --file=seed-data/news.json --jsonArray
```

## Data বিবরণ

### Categories (৯টি)
- জাতীয় (national)
- আন্তর্জাতিক (international)
- রাজনীতি (politics)
- ব্যবসা (business)
- খেলা (sports)
- বিনোদন (entertainment)
- প্রযুক্তি (technology)
- স্বাস্থ্য (health)
- শিক্ষা (education)

### News (১৬টি)
- ৫টি featured news
- বিভিন্ন category তে বিতরণ
- সম্পূর্ণ বাংলা content
- Real-world style এর খবর
- Different view counts
- Recent publish dates

## Note

Import করার পর server restart করতে হবে না। সরাসরি API call করতে পারবেন:

```
GET http://localhost:5001/api/categories
GET http://localhost:5001/api/news
GET http://localhost:5001/api/news?featured=true
```
