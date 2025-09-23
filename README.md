# E-Commerce Backend (NestJS + TypeORM)

A **scalable and secure backend** for an e-commerce platform, built with **NestJS** and **TypeORM**. This project provides **RESTful APIs** for managing users, products, orders, and analytics, with features like **JWT authentication, role-based access control (RBAC), and file uploads**.

---

## **Features**
- **User Management:** CRUD operations for users with role-based access (Admin, Customer, Editor)  
- **Product Catalog:** Manage products, variants, colors, labels, and images with filtering & pagination  
- **Order Processing:** Create and manage orders with stock validation and district-based analytics  
- **Authentication & Authorization:** Secure JWT-based authentication with role-based guards  
- **Analytics:** Endpoints for top-selling products, highest revenue products, non-selling products, and order distribution by district  
- **File Uploads:** Upload product images using Multer (disk storage)  
- **Database:** TypeORM integration with PostgreSQL or MySQL  

---

## **Tech Stack**
- **Framework:** NestJS  
- **ORM:** TypeORM  
- **Authentication:** JWT, bcrypt  
- **Database:** PostgreSQL/MySQL (configurable)  
- **File Handling:** Multer  
- **Language:** TypeScript  

---

## Setup Instructions
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/ecommerce-backend.git

##  Install dependencies:
 ```bash
 npm install
```

## Configure environment variables in .env file:
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret

## Run database migrations:
npm run typeorm:migration:run

##  Start the server in development mode:
npm run start:dev

## API Endpoints
-  Users : /users (CRUD, search, users without orders)
- Products: /product (CRUD, search with pagination)
- Product Variants: /product-details (CRUD, analytics: top-selling, non-selling, revenue)
- Orders: /orders (CRUD, district-based analytics)
- Authentication: /auth/login (JWT login), /auth/profile (protected)
- Product Images: /files/upload/:productId (image upload)

## Project Structure
 ```bash
  src/           -> Application source code (modules for users, products, orders, etc.)
uploads/       -> Directory for storing uploaded images
.gitignore     -> Files/folders to ignore
package.json   -> Dependencies & scripts
```

## License
### MIT


---

✅ **Professional Enhancements Added:**
1. Clear sections with headings for readability  
2. Bullet points for quick scanning  
3. Technical keywords for LinkedIn hashtags  
4. Clean GitHub README structure with setup and usage instructions  
5. Professional tone that emphasizes your skills and project impact  

---

