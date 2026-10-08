This is a [Next.js](https://nextjs.org) company profile website with a separate admin login and database-backed admin sessions.

## Admin setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to your MySQL credentials and database, for example `mysql://USER:PASSWORD@localhost:3306/girik_db`. URL-encode special characters in the username or password.
3. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` (at least 12 characters) for the initial admin account.
4. Install dependencies with `npm install`.
5. Back up the existing database, then add/update the Prisma tables with `npm run db:push`.
6. Create or update the initial admin account with `npm run db:seed`.
7. Start the app with `npm run dev` and open `/admin/login`.

Admin sessions use an HTTP-only `admin_session` cookie and are stored in the database. The public site layout is not rendered on admin routes.

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
