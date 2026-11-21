CREATE TYPE "ContactMessageStatus" AS ENUM ('UNREAD', 'READ');
CREATE TYPE "ContactEmailStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "admin_sessions" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_sessions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "admin_login_throttles" (
    "id" CHAR(64) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "window_started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blocked_until" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_login_throttles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(160) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "subject" VARCHAR(200) NOT NULL,
    "message" TEXT NOT NULL,
    "phone" VARCHAR(40) NOT NULL,
    "company" VARCHAR(120) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "status" "ContactMessageStatus" NOT NULL DEFAULT 'UNREAD',
    "email_notification" "ContactEmailStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT,
    "projectUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT,
    "productUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "company_settings" (
    "id" TEXT NOT NULL DEFAULT 'company',
    "companyName" TEXT NOT NULL DEFAULT 'GIRIK',
    "tagline" TEXT,
    "logoUrl" TEXT,
    "logoAltText" TEXT NOT NULL DEFAULT 'Company logo',
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_settings_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");
CREATE UNIQUE INDEX "admin_sessions_tokenHash_key" ON "admin_sessions"("tokenHash");
CREATE INDEX "admin_sessions_userId_idx" ON "admin_sessions"("userId");
CREATE INDEX "admin_sessions_expiresAt_idx" ON "admin_sessions"("expiresAt");
CREATE INDEX "admin_login_throttles_updated_at_idx" ON "admin_login_throttles"("updated_at");
CREATE INDEX "contact_messages_status_createdAt_idx" ON "contact_messages"("status", "createdAt");
CREATE INDEX "contact_messages_email_notification_createdAt_idx" ON "contact_messages"("email_notification", "createdAt");
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");
CREATE INDEX "projects_isPublished_sortOrder_idx" ON "projects"("isPublished", "sortOrder");
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");
CREATE INDEX "services_isPublished_sortOrder_idx" ON "services"("isPublished", "sortOrder");
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
CREATE INDEX "products_isPublished_idx" ON "products"("isPublished");

ALTER TABLE "admin_sessions"
ADD CONSTRAINT "admin_sessions_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "admin_users"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
