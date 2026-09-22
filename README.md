# E-Commerce API (Elevvo)

A scalable, modular RESTful API built with **Node.js**, **TypeScript**, **Express**, and **Prisma ORM**.

---

## 🏗️ Architecture & Project Structure

The project follows a **Modular Architecture** to separate concerns, improve maintainability, and allow feature-based scalability.

```text
ecommerce-api-elevvo/
├── prisma/
│   ├── migrations/          # Database schema migrations history
│   └── schema.prisma        # Database models & Prisma configuration
├── src/
│   ├── common/              # Shared logic & utilities across modules
│   │   └── repositories/    # Base / Generic repository design pattern implementation
│   ├── config/              # Infrastructure configurations
│   │   └── prisma.ts        # Prisma Client singleton connection
│   ├── config-env/          # Environment variables validation & setup
│   │   └── env.ts           # Type-safe environment variable mapping
│   ├── generated/           # Auto-generated Prisma client types & artifacts
│   ├── modules/             # Core application domains (Modular Pattern)
│   │   ├── auth/            # Authentication, JWT generation & guard middleware
│   │   ├── order/           # Order placement, status workflows & checkout handling
│   │   ├── product/         # Product catalog, stock management & categories
│   │   └── user/            # User profile management & roles handling
│   └── main.ts              # Application entry point & Express app bootstrap
├── .env                     # Environment variables configuration file
├── .gitignore               # Git ignored files configuration
└── package.json             # Project dependencies and scripts
```


🚀 Key Modules & Architecture Details
1. Modular Architecture (src/modules)
The application follows a modular and scalable structure where each core feature is isolated into its own domain:

auth/: Manages authentication processes (User Sign-up, Sign-in, JWT Token verification, and Authorization middleware).

user/: Handles user profile operations, role-based controls, and user administration.

product/: Manages product listing, categorization, inventory tracking, and search/filter operations.

order/: Handles order creation, status workflows, checkout processing, and user order history.

2. Database Management & ORM (prisma/)
schema.prisma: Defines data models for Users, Products, Orders, and Auth sessions.

migrations/: Tracks database schema updates over time.

src/config/prisma.ts: Centralized Prisma Client instance initialized for efficient connection pooling.

3. Shared Infrastructure & Utilities (src/common & src/config-env)
common/repositories/: Abstracted repository layer for database queries to decouple business logic from data storage.

config-env/env.ts: Environment variable loader and type-safe schema validator.

⚙️ Getting Started
1. Prerequisites
Node.js (v18 or higher)

PostgreSQL or supported SQL database

2. Installation
Bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
3. Environment Setup
Create a .env file in the root directory and configure the environment variables:

DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce_db?schema=public"
PORT=3000
JWT_SECRET="your_super_secret_key"
4. Database Setup & Migrations
Bash
# Run database migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
5. Running the Application
Bash
# Development mode
npm run dev
#Doc :
https://documenter.getpostman.com/view/56665483/2sBYB2r7MX
# Production build
npm run build
npm start
