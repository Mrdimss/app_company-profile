# GIRIK Company Profile

Next.js company profile and admin application using Prisma with Supabase PostgreSQL and Supabase Storage.

## Supabase setup

1. Create a Supabase project and keep its database password and service-role key private.
2. Set the application environment variables from `.env.example`. Use the Supavisor transaction-pooler URL (typically port `6543` with `pgbouncer=true`) for `DATABASE_URL`; use the project's direct database URL for `DIRECT_URL`. Both PostgreSQL connection strings should require TLS (`sslmode=require`). Use the database password from the Supabase project's Database settings, not an API key. URL-encode reserved characters in the password.
3. Run the SQL in `supabase/migrations/20261120130000_create_girik_assets_bucket.sql` from the Supabase SQL Editor. It creates the public `girik-assets` bucket, limits uploads to 2 MB and the supported image MIME types, and does not grant anonymous upload or delete access. Public access is for image delivery only; all mutations use the server-only service-role key.
4. Install dependencies with `npm install`.
5. Apply the PostgreSQL schema to a **new, empty** Supabase database using `npm run db:migrate`. This deploys the checked-in, additive Prisma migrations; it does not migrate rows from MySQL.
6. Create the initial admin account with `npm run db:seed`, then run `npm run dev` and open `/admin/login`.

Do not run `prisma migrate reset` or point `db:push` at a database containing data you need to preserve. Back up the source MySQL database before moving data. Export and transfer existing rows with a separately verified ETL/data migration, preserving IDs and foreign-key order; test the imported counts and representative records before switching production traffic. The current repository does not contain a MySQL data-export utility or Supabase credentials, so row migration and live connectivity must be completed in the project environment.

## Environment variables

- `DATABASE_URL`: Supabase PostgreSQL transaction-pooler connection for the running app.
- `DIRECT_URL`: Supabase direct connection used by Prisma CLI schema operations and migrations.
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL; also used to allow the project's public storage image URLs in `next/image`.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase publishable/anon key, available for public client-side access if needed. The current storage mutations do not use it.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only key for storage uploads/deletes. Never use a `NEXT_PUBLIC_` prefix for this key.
- `SUPABASE_STORAGE_BUCKET`: storage bucket name; defaults to `girik-assets`.
- `NEXT_PUBLIC_APP_URL`: application origin.
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`: initial admin seed values.
- `CONTACT_EMAIL`, `SMTP_USER`, `SMTP_APP_PASSWORD`: email notification settings.

Put actual credentials only in ignored local `.env` files and Vercel Environment Variables. `NEXT_PUBLIC_*` values are exposed to browser code; only the Supabase URL and publishable/anon key belong there.

## Prisma and deployment

Prisma runtime queries use `DATABASE_URL`; Prisma CLI operations use `DIRECT_URL`. Verify the schema with `npx prisma validate`, generate the client with `npx prisma generate`, and deploy additive migrations with `npm run db:migrate`. The checked-in migration history is converted to PostgreSQL and must be applied to an empty target unless the existing schema has been explicitly baselined after backup and review.

In Vercel, configure all required environment variables for the appropriate deployment environments. Add `DATABASE_URL` and `DIRECT_URL` with Supabase-provided connection strings, and set the same `NEXT_PUBLIC_SUPABASE_URL` at build time so `next/image` can allow the matching bucket hostname. No permanent local filesystem storage is used.

## Image storage

Product, project, and company-logo images are uploaded by authenticated admin API routes to the public `girik-assets` bucket under `products/`, `projects/`, and `logos/`. The helper also reserves `categories/` and `banners/` paths for future uploads; this repository currently has no separate category or banner upload model/route. Images are size- and content-signature-validated, get unique names, and database records store their public URLs. Replaced/deleted images are removed only after the database write succeeds and only when no product, project, or company setting still references the URL. A cleanup failure is logged and returned as `storageCleanupPending` without undoing a successful database change.

The existing MySQL migration files were not applied to Supabase automatically. `npm run db:migrate` uses Prisma Migrate and requires a new/empty PostgreSQL target; never reset the production database.

## Languages

Public pages use locale-prefixed URLs: `/id/...` for Indonesian and `/en/...` for English. The navbar language control switches the current page and retains its query parameters. Requests without a locale use the saved `girik-locale` cookie, then the browser language preference, and finally Indonesian. The legacy `/en-US/...` URL redirects to `/en/...`.

Static interface copy is maintained in `lib/i18n.ts`. Product, project, service, and company-setting content is displayed as entered in the database and is not translated.

Multilingual support applies to public-facing interface text only. Database content remains in the single value entered through the existing admin forms; product, project, service, and company-setting data is not translated. Admin forms, CRUD APIs, Prisma schema, and storage behavior remain single-language. No bilingual database migration is required. Set the already-supported `NEXT_PUBLIC_APP_URL` to the canonical site origin for sitemap and metadata URLs. Localized metadata includes canonical URLs and `id-ID`/`en` alternates, and the sitemap includes both locales.
