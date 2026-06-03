# Notice Board Application

A minimal, elegant, and production-ready Notice Board Application built for academic and professional environments. It allows administrators to publish, categorize, and prioritize important updates with a seamless user experience.

The user interface was crafted using the **"Academic Gallery"** design system principles, heavily utilizing tonal layering, ghost borders, and glassmorphism to create a polished, "no-line" aesthetic.

## 🌟 Features

- **Notice Management:** Full CRUD (Create, Read, Update, Delete) functionality for notices.
- **Categorization:** Organize notices by type (General, Event, Exam).
- **Prioritization:** Mark notices as "Urgent" to pin them to the top of the dashboard.
- **Modern UI/UX:** Built with a custom Tailwind CSS tonal palette (Orange theme), featuring ambient shadows, skeleton loaders, and frosted glass navigation.
- **Robust Error Handling:** Integrated Toast notifications for network failures, validation errors, and success states.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.

## 🛠 Tech Stack

- **Framework:** Next.js (Pages Router)
- **Frontend:** React 19, Tailwind CSS v4
- **Database ORM:** Prisma
- **Database:** SQLite (Local Development) / MySQL via TiDB Cloud (Production)
- **Deployment:** Vercel

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ainaanraza/Notice-Board-App.git
cd Notice-Board-App
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory. You can use `.env.example` as a template.
For local development using SQLite:
```env
DATABASE_URL="file:./dev.db"
```

### 4. Database Setup
Initialize the database and generate the Prisma Client:
```bash
# Push the schema to create the local SQLite database tables
npx prisma db push

# Generate the Prisma Client
npx prisma generate
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔌 API Endpoints

The application exposes the following RESTful endpoints under `/api/notices`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notices` | Fetches all notices, ordered by Priority (Urgent first) and Date. |
| `POST` | `/api/notices` | Creates a new notice. Requires title, body, category, priority, and date. |
| `PUT` | `/api/notices/:id` | Updates an existing notice by its ID. |
| `DELETE`| `/api/notices/:id` | Deletes a notice by its ID. |

## 🌐 Deployment Instructions

This project is configured for seamless deployment on **Vercel** with a **TiDB Cloud** Serverless database.

1. **Set up TiDB Cloud:**
   - Create a free serverless cluster on [TiDB Cloud](https://tidbcloud.com/).
   - Copy the connection string. Ensure the database name is set to `test` (not `sys`).
2. **Update Prisma Schema:**
   - In `prisma/schema.prisma`, ensure the provider is set to `"mysql"`.
3. **Deploy to Vercel:**
   - Import the project into Vercel.
   - Add your TiDB connection string to the `DATABASE_URL` environment variable in Vercel settings.
   - Deploy. Vercel will automatically run `prisma generate` during the build step.

*(Note: If you run into a 500 error on Vercel, ensure you have run `npx prisma db push` locally using your TiDB connection string to create the production tables!)*

## 🔮 Future Improvements

- **Image Uploads:** Integrate Cloudinary for secure, optional image attachments on notices.
- **Authentication:** Implement NextAuth.js to restrict notice creation and deletion to authorized administrators.
- **Pagination & Search:** Add infinite scrolling and text-based search for dashboards with high notice volume.

---

## 🤖 AI Usage Disclosure

This project was developed with the assistance of advanced AI coding tools to accelerate development and ensure best practices. 

- **Architecture & Planning:** AI was used to discuss and formulate the optimal folder structure, routing strategy (Next.js Pages router vs App router), and database schema design with Prisma.
- **Code Generation:** Boilerplate code for API routes, form validation logic, and repetitive CRUD operations were initially generated via AI prompts and subsequently customized.
- **UI/UX Refinement:** The custom "Stitch" design system (including tonal layering, ghost borders, and the Tailwind CSS v4 integration) was implemented through collaborative AI code reviews and iterative generation.
- **Debugging:** AI assistance was heavily utilized to diagnose and resolve complex deployment issues, including Vercel build caching, Prisma Client environment errors (`EPERM`), and TiDB system database restrictions.

*All AI-generated code was thoroughly reviewed, tested, and manually refined to meet production standards.*
