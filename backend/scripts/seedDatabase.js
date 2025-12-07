const mongoose = require('mongoose');
const Menu = require('../models/Menu');
require('dotenv').config();

const seedData = [
  // Pizzas
  {
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, basil, and tomato',
    price: 299,
    category: 'pizzas',
    image: 'https://via.placeholder.com/250x200?text=Margherita+Pizza',
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni with cheese',
    price: 349,
    category: 'pizzas',
    image: 'https://via.placeholder.com/250x200?text=Pepperoni+Pizza',
  },
  {
    name: 'Veggie Supreme Pizza',
    description: 'Loaded with fresh vegetables',
    price: 329,
    category: 'pizzas',
    image: 'https://via.placeholder.com/250x200?text=Veggie+Pizza',
  },
  {
    name: 'BBQ Chicken Pizza',
    description: 'Smoky BBQ with tender chicken',
    price: 379,
    category: 'pizzas',
    image: 'https://via.placeholder.com/250x200?text=BBQ+Chicken',
  },
  // Cold Drinks
  {
    name: 'Cold Cola',
    description: 'Refreshing cold cola drink',
    price: 49,
    category: 'drinks',
    image: 'https://via.placeholder.com/250x200?text=Cold+Cola',
  },
  {
    name: 'Iced Tea',
    description: 'Chilled iced tea',
    price: 59,
    category: 'drinks',
    image: 'https://via.placeholder.com/250x200?text=Iced+Tea',
  },
  {
    name: 'Lemonade',
    description: 'Fresh homemade lemonade',
    price: 69,
    category: 'drinks',
    image: 'https://via.placeholder.com/250x200?text=Lemonade',
  },
  {
    name: 'Mango Lassi',
    description: 'Sweet mango yogurt drink',
    price: 79,
    category: 'drinks',
    image: 'https://via.placeholder.com/250x200?text=Mango+Lassi',
  },
  // Breads
  {
    name: 'Garlic Bread',
    description: 'Crispy bread with garlic and herbs',
    price: 99,
    category: 'breads',
    image: 'https://via.placeholder.com/250x200?text=Garlic+Bread',
  },
  {
    name: 'Cheese Naan',
    description: 'Soft naan with melted cheese',
    price: 89,
    category: 'breads',
    image: 'https://via.placeholder.com/250x200?text=Cheese+Naan',
  },
  {
    name: 'Butter Naan',
    description: 'Traditional naan with butter',
    price: 79,
    category: 'breads',
    image: 'https://via.placeholder.com/250x200?text=Butter+Naan',
  },
  {
    name: 'Paneer Kulcha',
    description: 'Soft bread stuffed with paneer',
    price: 119,
    category: 'breads',
    image: 'https://via.placeholder.com/250x200?text=Paneer+Kulcha',
  },
  // Desserts
  {
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake',
    price: 149,
    category: 'desserts',
    image: 'https://via.placeholder.com/250x200?text=Chocolate+Cake',
  },
  {
    name: 'Cheesecake',
    description: 'Creamy New York cheesecake',
    price: 179,
    category: 'desserts',
    image: 'https://via.placeholder.com/250x200?text=Cheesecake',
  },
  {
    name: 'Gulab Jamun',
    description: 'Traditional Indian sweet',
    price: 89,
    category: 'desserts',
    image: 'https://via.placeholder.com/250x200?text=Gulab+Jamun',
  },
  {
    name: 'Ice Cream Sundae',
    description: 'Vanilla ice cream with toppings',
    price: 129,
    category: 'desserts',
    image: 'https://via.placeholder.com/250x200?text=Ice+Cream+Sundae',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Menu.deleteMany({});
    console.log('✓ Cleared existing menu items');

    // Insert new data
    await Menu.insertMany(seedData);
    console.log('✓ Inserted seed data');

    mongoose.connection.close();
    console.log('✓ Database seeding complete');
  } catch (err) {
    console.error('✗ Error:', err.message);
    process.exit(1);
  }
};

seedDatabase();