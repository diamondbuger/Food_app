Here is your **fully formatted, professional GitHub-ready README.md** — with proper Markdown headings, tables, code blocks, bullets, and consistent structure.

---

# 🍕 **PizzaHub – MERN Food Delivery App**

**Version:** 1.0.0
**Status:** Production Ready
**Last Updated:** 2025

A complete **MERN stack food delivery application** featuring user authentication, ordering system, admin dashboard, inventory management, and secure backend API.

---

# 🚀 **Quick Start**

## ✅ **Prerequisites**

* Node.js v14+
* npm or yarn
* MongoDB Atlas account
* Git installed

---

## 🔧 **Installation**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/diamondbuger/Food_app.git
cd Food_app
```

### 2️⃣ Setup Frontend

```bash
cd src     # or navigate to your frontend folder
npm install
npm start
```

Frontend runs at: **[http://localhost:3000](http://localhost:3000)**

### 3️⃣ Setup Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at: **[http://localhost:5000](http://localhost:5000)**

---

## 🌐 **Setup MongoDB**

1. Create MongoDB Atlas account
2. Create database: **mern-food-app**
3. Copy connection string

---

## 🔒 **Environment Variables**

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-food-app
JWT_SECRET=your_secret_key_here
NODE_ENV=development
COOKIE_EXPIRES=7
```

---

## 👨‍💼 Create Admin User

```bash
cd backend
npm run create-admin
```

**Default Admin**

* **Email:** [admin@pizzahub.com](mailto:admin@pizzahub.com)
* **Password:** admin123

---

# 🎉 **Features**

## 👤 **User Features**

* Registration + secure login (JWT)
* Browse menu items with categories
* Add to cart with real-time stock validation
* Checkout + delivery details
* Cash on Delivery
* Order history & user dashboard
* Auto-logout on invalid token

---

## 🛠️ **Admin Features**

* Dashboard: total users, orders, revenue
* Add/edit/delete menu items
* Manage stock
* View/update orders

---

## 🔐 **Security Features**

* JWT Auth + HTTP-only cookies
* bcrypt password hashing
* Role-based access
* CSRF protection
* Input validation

---

# 🧰 **Technology Stack**

### 🖥️ **Frontend**

* React 18
* React Router v6
* Context API
* Axios
* CSS3
* JavaScript ES6+

### 🖧 **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT-simple
* bcryptjs
* cookie-parser
* CORS

### 🗄️ **Database**

* MongoDB Atlas
* Collections: `users`, `menus`, `orders`, `payments`

---

# 📁 **Project Structure**

```
MERN-FoodApp/
├── src/                      # Frontend
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── App.jsx
│   ├── index.js
│   └── styles...
│
├── backend/                  # Backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── scripts/
│   ├── server.js
│   └── .env
│
├── README.md
├── PROJECT_DOCUMENTATION.txt
└── POSTMAN_API_TESTING_GUIDE.txt
```

---

# 🍽️ **Menu Categories**

### **Pizzas**

* Margherita – ₹299
* Pepperoni – ₹349
* Veggie Supreme – ₹329
* BBQ Chicken – ₹379

### **Drinks**

* Cold Cola – ₹49
* Iced Tea – ₹59
* Lemonade – ₹69
* Mango Lassi – ₹79

### **Breads**

* Garlic Bread – ₹99
* Cheese Naan – ₹89
* Butter Naan – ₹79
* Paneer Kulcha – ₹119

### **Desserts**

* Chocolate Cake – ₹149
* Cheesecake – ₹179
* Gulab Jamun – ₹89
* Ice Cream Sundae – ₹129

---

# 🔐 **User Authentication**

### **Registration**

* Fields: name, email, password, confirm password
* Password rules:

  * Min 8 chars
  * 1 uppercase, 1 lowercase
  * 1 number
  * 1 special character

### **Login**

* Email + password
* JWT stored in HTTP-only cookie
* Auto-logout on deletion

---

# 🔄 **User Workflow (Customer)**

1. Register / Login
2. Browse menu
3. Add to cart
4. Checkout
5. Payment (COD)
6. Order confirmation
7. View order history

---

# 🛠️ **Admin Workflow**

1. Login
2. Dashboard overview
3. Manage inventory
4. Manage orders
5. Update order status

---

# 📡 **API Endpoints**

Base URL: **`http://localhost:5000/api`**

### 🔹 Authentication

| Method | Endpoint         | Description  |
| ------ | ---------------- | ------------ |
| POST   | `/auth/register` | Register     |
| POST   | `/auth/login`    | Login        |
| GET    | `/auth/verify`   | Verify token |
| POST   | `/auth/logout`   | Logout       |

### 🔹 Menu

| Method | Endpoint    | Description    |
| ------ | ----------- | -------------- |
| GET    | `/menu`     | Get all items  |
| GET    | `/menu/:id` | Get item       |
| POST   | `/menu/add` | Admin add item |
| PUT    | `/menu/:id` | Update         |
| DELETE | `/menu/:id` | Delete         |

### 🔹 Orders

| Method | Endpoint           | Description  |
| ------ | ------------------ | ------------ |
| POST   | `/order/create`    | Create order |
| GET    | `/order/my-orders` | User orders  |

### 🔹 Admin

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| GET    | `/admin/stats`      | Website stats |
| GET    | `/admin/orders`     | All orders    |
| PUT    | `/admin/orders/:id` | Update status |

---

# 🧪 **Troubleshooting**

| Issue                     | Solution                    |
| ------------------------- | --------------------------- |
| Port in use               | Change port or kill process |
| MongoDB connection failed | Check URI & whitelist IP    |
| 401 Unauthorized          | Token expired               |
| CORS errors               | Enable credentials in Axios |
| Cookie issues             | Enable cookies & HTTPS      |
| Admin login fails         | Run `npm run create-admin`  |

---

# 📦 **Deployment Guide**

### 🚀 Frontend (Vercel / Netlify)

```bash
npm run build
```

### 🚀 Backend (Heroku / Railway)

1. Push to GitHub
2. Connect repo
3. Add environment variables
4. Deploy

### 🗄️ Database

MongoDB Atlas hosted in cloud (no extra setup)

---

# 🧭 **Planned Features**

* Razorpay/Stripe payments
* Email notifications
* Real-time order tracking
* Ratings & reviews
* Coupon system
* Analytics dashboard
* Mobile App (React Native)

---

# 📜 **Code Standards**

### Naming

* Variables → `camelCase`
* Components → `PascalCase`
* Constants → `UPPER_CASE`

### Commit Messages

* `feat:` Add feature
* `fix:` Bug fix
* `docs:` Documentation
* `refactor:` Maintainability

---

# 📄 **License**

**MIT License**

---

# 👤 **Author**

**diamondbuger**
GitHub: [https://github.com/diamondbuger/Food_app](https://github.com/diamondbuger/Food_app)

---

# 🎉 **Thank You for Using PizzaHub!**

If you face issues, create an issue on GitHub.
Happy Coding! 🚀🍕

---

If you want, I can also generate:

✅ Badges (GitHub stars, forks, license, tech stack, etc.)
✅ A logo/banner for your README
✅ Auto-generated table of contents

Just tell me!
