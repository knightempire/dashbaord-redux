
# Dashboard Redux App

This project is a modern dashboard application built with Next.js (App Router), TypeScript, Firebase authentication, and Redux Toolkit for state management.

## Features Implemented

- **Employee Management:**
  - List, create, edit, and delete employees with a clean UI.
  - Pagination and search/filter for employee data.
  - Soft delete (move to deleted list) and restore employees.
- **Authentication:**
  - Google login using Firebase.
  - Auth state managed in Redux and persisted in localStorage.
- **Responsive Design:**
  - Sidebar and Navbar layout, mobile-friendly login page.
- **Toast Notifications:**
  - Success messages for employee actions.

## How It Works

- **App Router:**
  - Routing is file-based in the `app/` directory (e.g., `app/dashbaord/page.tsx` for the employees dashboard).
- **Redux Toolkit:**
  - State is managed using slices (`authSlice`, `employeesSlice`).
  - Async actions (API calls) use `createAsyncThunk` for fetching employees.
  - Components use `useSelector` to read state and `useDispatch` to update state.
- **Firebase Auth:**
  - Login with Google via Firebase, token and user info stored in Redux and localStorage.

## Redux Concepts Used

- **Slice:** Each feature (auth, employees) has its own slice for state and reducers.
- **Async Thunks:** Used for API calls (e.g., fetching employees from dummyjson.com).
- **Reducers & Actions:** State updates are handled by reducers, actions are dispatched from components.
- **Store:** All slices are combined in `store.ts` and provided to the app via a ReduxProvider.
- **Type Safety:** Types for state and dispatch (`RootState`, `AppDispatch`) ensure safe usage in TypeScript.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying files in the `app/` directory. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
