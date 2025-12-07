================================================================================
                          PIZZAHUB - MERN FOOD DELIVERY APP
                                   README
================================================================================

PROJECT NAME: PizzaHub
DESCRIPTION: A full-stack food delivery application built with MERN stack
VERSION: 1.0.0
STATUS: Production Ready
LAST UPDATED: 2024

================================================================================
                              QUICK START
================================================================================

PREREQUISITES:
- Node.js v14 or higher
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

INSTALLATION:

1. Clone Repository:
   git clone https://github.com/diamondbuger/Food_app.git
   cd Food_app

2. Setup Frontend:
   cd src (or navigate to frontend directory)
   npm install
   npm start
   Runs on: http://localhost:3000

3. Setup Backend:
   cd backend
   npm install
   npm run dev
   Runs on: http://localhost:5000

4. Setup MongoDB:
   - Create account on MongoDB Atlas
   - Create database named "mern-food-app"
   - Get connection string

5. Configure Environment:
   Create backend/.env file with:
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-food-app
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   COOKIE_EXPIRES=7

6. Create Admin User:
   cd backend
   npm run create-admin
   
   Default Credentials:
   Email: admin@pizzahub.com
   Password: admin123

7. Test the App:
   - Open http://localhost:3000 in browser
   - Register a new user or login with admin credentials
   - Start browsing and ordering food!

================================================================================
                              FEATURES
================================================================================

USER FEATURES:
✓ User Registration with Email & Password
✓ Secure Login with JWT Authentication
✓ Browse Menu Items (Pizzas, Drinks, Breads, Desserts)
✓ Category Filtering
✓ Add Items to Cart
✓ Real-time Inventory Validation
✓ Place Orders with Delivery Details
✓ Cash on Delivery Payment
✓ View Order History
✓ Personalized User Dashboard
✓ Auto-logout on Cookie Deletion
✓ Strong Password Requirements

ADMIN FEATURES:
✓ Dashboard with Statistics
  - Total Users Count
  - Total Orders Count
  - Total Revenue
✓ Inventory Management
  - Add New Menu Items
  - Edit Item Prices
  - Update Stock Quantities
  - Delete Items
✓ Order Management
  - View All Orders
  - Update Order Status
  - View Customer Details

SECURITY FEATURES:
✓ JWT Authentication
✓ HTTP-only Secure Cookies
✓ Password Hashing (bcryptjs)
✓ Role-based Access Control
✓ Protected API Routes
✓ Token Verification
✓ Auto-logout on Invalid Token
✓ CSRF Protection
✓ Input Validation

================================================================================
                           TECHNOLOGY STACK
================================================================================

FRONTEND:
- React 18
- React Router v6
- Axios
- Context API
- CSS3 (with Gradients & Animations)
- JavaScript ES6+

BACKEND:
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT (jwt-simple)
- bcryptjs
- cookie-parser
- CORS

DATABASE:
- MongoDB Atlas (Cloud)
- Collections: users, menus, orders, payments

TOOLS:
- Git & GitHub
- Postman (API Testing)
- npm (Package Manager)

================================================================================
                          PROJECT STRUCTURE
================================================================================

MERN-FoodApp/
├── src/                              (Frontend)
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── MenuPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── OrderPage.jsx
│   │   ├── PaymentPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── OrderHistoryPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── InventoryPage.jsx
│   │   └── AdminOrdersPage.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── MenuCard.jsx
│   │   ├── CartItem.jsx
│   │   ├── OrderSummary.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/
│   │   └── useCheckAuth.js
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── backend/                          (Backend)
│   ├── models/
│   │   ├── User.js
│   │   ├── Menu.js
│   │   ├── Order.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── menu.js
│   │   ├── order.js
│   │   ├── admin.js
│   │   ├── payment.js
│   │   └── cart.js
│   ├── middleware/
│   │   └── auth.js
│   ├── services/
│   │   └── googlePayService.js
│   ├── scripts/
│   │   ├── seedDatabase.js
│   │   └── createAdmin.js
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── .gitignore
├── README.txt
├── PROJECT_DOCUMENTATION.txt
└── POSTMAN_API_TESTING_GUIDE.txt

================================================================================
                            MENU CATEGORIES
================================================================================

PIZZAS (🍕):
- Margherita Pizza - ₹299
- Pepperoni Pizza - ₹349
- Veggie Supreme Pizza - ₹329
- BBQ Chicken Pizza - ₹379

DRINKS (🥤):
- Cold Cola - ₹49
- Iced Tea - ₹59
- Lemonade - ₹69
- Mango Lassi - ₹79

BREADS (🍞):
- Garlic Bread - ₹99
- Cheese Naan - ₹89
- Butter Naan - ₹79
- Paneer Kulcha - ₹119

DESSERTS (🍰):
- Chocolate Cake - ₹149
- Cheesecake - ₹179
- Gulab Jamun - ₹89
- Ice Cream Sundae - ₹129

================================================================================
                          USER AUTHENTICATION
================================================================================

REGISTRATION:
- URL: /register
- Fields: Name, Email, Password, Confirm Password
- Password Requirements:
  * Minimum 8 characters
  * At least 1 uppercase letter (A-Z)
  * At least 1 lowercase letter (a-z)
  * At least 1 number (0-9)
  * At least 1 special character (!@#$%^&* etc)
- Real-time validation feedback
- Password visibility toggle

LOGIN:
- URL: /login
- Fields: Email, Password
- JWT token stored in HTTP-only cookie
- 7-day expiration
- Auto-logout on cookie deletion

DEFAULT ADMIN:
- Email: admin@pizzahub.com
- Password: admin123
- Role: admin

================================================================================
                          USER WORKFLOWS
================================================================================

CUSTOMER WORKFLOW:

1. Register/Login
   - Create account or login
   - Get authenticated
   - See personalized greeting

2. Browse Menu
   - View all items or filter by category
   - See prices, descriptions, stock status
   - Can't add out-of-stock items

3. Shopping Cart
   - Add items with desired quantity
   - Can't add more than available stock
   - See cart total and tax
   - Remove items if needed

4. Checkout
   - Enter delivery address
   - Enter phone number
   - Proceed to payment

5. Payment
   - Select Cash on Delivery
   - See order summary
   - Confirm order

6. Order Confirmation
   - See full order summary
   - Item details with prices
   - Delivery information
   - Total amount

7. Order History
   - View all past orders
   - See order dates and status
   - View items ordered
   - See total amounts

ADMIN WORKFLOW:

1. Login as Admin
   - Use admin credentials
   - Access admin panel

2. View Dashboard
   - See total users count
   - See total orders count
   - See total revenue

3. Manage Inventory
   - View all menu items
   - Add new items
   - Edit prices and quantities
   - Delete items
   - See low stock warnings

4. Manage Orders
   - View all customer orders
   - See customer details
   - View order items
   - Update order status (confirmed/cancelled)

================================================================================
                            API ENDPOINTS
================================================================================

BASE URL: http://localhost:5000/api

AUTHENTICATION:
POST   /auth/register           - Register new user
POST   /auth/login              - Login user
GET    /auth/verify             - Verify token
POST   /auth/logout             - Logout user

MENU:
GET    /menu                    - Get all items
GET    /menu/:id                - Get single item
POST   /menu/add                - Add item (Admin)
PUT    /menu/:id                - Update item (Admin)
DELETE /menu/:id                - Delete item (Admin)

ORDERS:
POST   /order/create            - Create order
GET    /order/my-orders         - Get user orders

ADMIN:
GET    /admin/stats             - Get statistics
GET    /admin/orders            - Get all orders
PUT    /admin/orders/:id        - Update status

For detailed API documentation, see POSTMAN_API_TESTING_GUIDE.txt

================================================================================
                            SECURITY NOTES
================================================================================

PASSWORD SECURITY:
- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Minimum strength requirements enforced

TOKEN SECURITY:
- JWT tokens expire after 7 days
- Stored in HTTP-only cookies (can't be accessed by JavaScript)
- Cookies only sent over HTTPS in production
- SameSite flag set to 'strict' for CSRF protection

AUTHENTICATION:
- All protected routes require valid token
- Token verified every 5 seconds
- Invalid token triggers auto-logout
- Deleting cookie logs user out immediately

DATA SECURITY:
- Password fields never logged or exposed
- Error messages don't reveal sensitive info
- Input validation on all forms
- SQL injection prevention (using MongoDB)

================================================================================
                          ENVIRONMENT SETUP
================================================================================

MONGODB ATLAS SETUP:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new project "PizzaHub"
4. Create cluster (free tier)
5. Create database user with password
6. Whitelist your IP address
7. Get connection string
8. Add to .env:
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mern-food-app

FRONTEND SETUP:

1. Ensure Node.js installed: node -v
2. Install dependencies: npm install
3. Start dev server: npm start
4. App opens on http://localhost:3000

BACKEND SETUP:

1. Create .env file in backend directory
2. Add environment variables (see PREREQUISITES)
3. Install dependencies: npm install
4. Start server: npm run dev
5. Server runs on http://localhost:5000

TESTING WITH POSTMAN:

1. Download Postman from postman.com
2. Create collection "PizzaHub API"
3. Test endpoints using guide in POSTMAN_API_TESTING_GUIDE.txt
4. Save requests in collection
5. Share collection with team

================================================================================
                          DEPLOYMENT GUIDE
================================================================================

FRONTEND DEPLOYMENT (Vercel/Netlify):

1. Build project: npm run build
2. Creates /build folder with optimized files
3. Deploy using Vercel/Netlify
4. Update API base URL in api.js to production backend
5. Site goes live on custom domain

BACKEND DEPLOYMENT (Heroku/Railway):

1. Push code to GitHub
2. Connect repository to Heroku
3. Add environment variables in Heroku dashboard
4. Deploy automatically or manually
5. Test with Postman using production URL

DATABASE DEPLOYMENT:

1. MongoDB Atlas already hosted in cloud
2. No additional setup needed
3. Automatic backups included
4. Monitor usage in Atlas dashboard

PRODUCTION ENVIRONMENT:

Update .env with:
- NODE_ENV=production
- SECURE_COOKIE=true (HTTPS only)
- Updated MONGODB_URI
- Strong JWT_SECRET

================================================================================
                          TROUBLESHOOTING
================================================================================

ISSUE: Port already in use
SOLUTION: Kill process using port or change port in .env

ISSUE: MongoDB connection failed
SOLUTION: Check internet, verify MONGODB_URI, whitelist IP in Atlas

ISSUE: 401 Unauthorized
SOLUTION: Token expired or invalid, login again

ISSUE: CORS error
SOLUTION: Check frontend/backend running, enable credentials in axios

ISSUE: Cookie not working
SOLUTION: Check browser privacy settings, enable cookies in Postman

ISSUE: Can't login with admin
SOLUTION: Run npm run create-admin, or reset password

ISSUE: Inventory not updating
SOLUTION: Restart server, refresh page, check database

ISSUE: npm install fails
SOLUTION: Delete node_modules and package-lock.json, try again

For more help, check:
- Backend console logs
- Browser console (F12)
- MongoDB Atlas dashboard
- GitHub issues

================================================================================
                          FEATURES ROADMAP
================================================================================

COMPLETED:
✓ User authentication
✓ Menu management
✓ Shopping cart
✓ Order system
✓ Payment processing (COD)
✓ Admin dashboard
✓ Inventory management
✓ Security features
✓ Responsive design
✓ Auto-logout on cookie deletion

PLANNED:
- Real payment gateway (Razorpay/Stripe)
- Email notifications
- Order tracking with real-time updates
- User ratings & reviews
- Multiple delivery addresses
- Coupon/discount codes
- Advanced admin analytics
- Mobile app (React Native)
- Restaurant partnerships
- Subscription plans
- Loyalty rewards program

================================================================================
                          SUPPORT & FEEDBACK
================================================================================

GITHUB REPOSITORY:
https://github.com/diamondbuger/Food_app

ISSUES & BUGS:
- Create GitHub issue with description
- Include error message and steps to reproduce
- Attach screenshots if applicable

FEATURE REQUESTS:
- Create GitHub discussion
- Describe use case and benefit
- Add any relevant context

DOCUMENTATION:
- README.txt (this file)
- PROJECT_DOCUMENTATION.txt
- POSTMAN_API_TESTING_GUIDE.txt

GETTING HELP:
- Check documentation first
- Search existing GitHub issues
- Create new issue if problem not found
- Include error messages and environment details

================================================================================
                          CODE STANDARDS
================================================================================

NAMING CONVENTIONS:
- Variables: camelCase
- Constants: UPPER_CASE
- Components: PascalCase
- Files: camelCase.js or PascalCase.jsx

FOLDER STRUCTURE:
- pages/      - Page components
- components/ - Reusable components
- context/    - State management
- services/   - API calls
- hooks/      - Custom hooks
- models/     - Database schemas
- routes/     - API endpoints

COMMIT MESSAGES:
- feat: Add new feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructure

================================================================================
                          LICENSE & CREDITS
================================================================================

LICENSE: MIT
AUTHOR: diamondbuger
CONTRIBUTORS: Open for contributions

TECHNOLOGIES CREDITED:
- React.js team
- Express.js community
- MongoDB
- Mongoose ODM
- JWT-simple
- bcryptjs
- Open source community

================================================================================
                          VERSION HISTORY
================================================================================

v1.0.0 (2024-01-15) - Initial Release
- Complete MERN stack implementation
- All core features implemented
- Security features implemented
- Documentation completed
- Ready for production

================================================================================
                          CONTACT & LINKS
================================================================================

GITHUB: https://github.com/diamondbuger/Food_app
PORTFOLIO: [Your portfolio link]
EMAIL: [Your email]

DOCUMENTATION FILES:
- README.txt - This file
- PROJECT_DOCUMENTATION.txt - Detailed documentation
- POSTMAN_API_TESTING_GUIDE.txt - API testing guide

================================================================================

Thank you for using PizzaHub!

For questions or support, please refer to documentation files or create
a GitHub issue.

Happy coding! 🚀

================================================================================
                              END OF README
================================================================================

Version: 1.0.0
Last Updated: 2024
Status: Active
