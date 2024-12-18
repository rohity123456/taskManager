# Collaborative Task List (Next.js)

This is a task list management application built with Next.js, Prisma, and MongoDB. It allows users to create, edit, and delete tasks, and filter tasks by various criteria.

## Features

- **Task Management:**
  - Create, edit, and delete tasks.
  - Filter and search tasks by various criteria.
  - Real-time updates of task list could not complete due to time constraints (using Liveblocks or other library in future).
- **Modern UI:**
  - Clean and intuitive user interface using Shadcn UI components and Tailwind CSS.
- **Efficient Data Handling:**
  - Prisma ORM for seamless interaction with MongoDB.
  - Redux Toolkit (RTK Query) for efficient data fetching, caching, and state management.
- **Robust Architecture:**
  - Clear separation of concerns using React Server Components (RSC) and Client Components.
  - Next.js server actions for handling form submissions and data mutations.
- **Type Safety:** Developed using TypeScript for improved code quality and maintainability.

## Technologies Used

- **Frontend:**
  - Next.js 14+
  - React
  - TypeScript
  - Redux Toolkit (RTK Query)
  - Shadcn UI
  - Tailwind CSS
- **Backend:**
  - Next.js API Routes
  - Prisma ORM
  - MongoDB 

- **Authentication:** NextAuth.js 

## Demo
- Live : [Task Manager](https://task-manager-d8mh.vercel.app/)
  
## Getting Started locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rohity123456/taskManager.git
   cd taskManager
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Create and update .env file:**
   ```bash
   <!-- Add these lines to .env -->
      DATABASE_URL=<your-mongodb-url>
   ```

3. **Prisma setting:**
   ```bash
   npx prisma generate
   ```


4. **Start Development Server:**
   ```bash
   npm run dev
   ```

