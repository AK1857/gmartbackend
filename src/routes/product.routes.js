const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const Product = require('../models/product');

// Create user
router.post('/create', productController.create);

// Example: Get user (add later)
router.get('/:id',productController.getProductById);
router.put('/update', productController.updateProduct);
router.get('/', productController.getAllProducts);
router.post('/insertMany',async(req,res,next)=>{
    try {
        const products = [
            { "name": "Apple", "price": 120, "category": "fruits", "stock": 50, "unit": "kg", "description": "Fresh and juicy red apples rich in fiber and vitamins." },
            { "name": "Banana", "price": 60, "category": "fruits", "stock": 80, "unit": "dozen", "description": "Naturally sweet bananas packed with energy and potassium." },
            { "name": "Mango", "price": 150, "category": "fruits", "stock": 40, "unit": "kg", "description": "Seasonal ripe mangoes known for their sweetness and flavor." },
            { "name": "Orange", "price": 90, "category": "fruits", "stock": 60, "unit": "kg", "description": "Citrus oranges rich in vitamin C and antioxidants." },
            { "name": "Papaya", "price": 50, "category": "fruits", "stock": 30, "unit": "kg", "description": "Soft and nutritious papaya good for digestion." },
            { "name": "Watermelon", "price": 40, "category": "fruits", "stock": 25, "unit": "piece", "description": "Refreshing watermelon perfect for summer hydration." },
          
            { "name": "Potato", "price": 30, "category": "vegetables", "stock": 100, "unit": "kg", "description": "Versatile potatoes ideal for various cooking styles." },
            { "name": "Onion", "price": 35, "category": "vegetables", "stock": 90, "unit": "kg", "description": "Fresh onions essential for everyday cooking." },
            { "name": "Tomato", "price": 40, "category": "vegetables", "stock": 80, "unit": "kg", "description": "Juicy tomatoes perfect for curries and salads." },
            { "name": "Cabbage", "price": 25, "category": "vegetables", "stock": 40, "unit": "piece", "description": "Crunchy cabbage rich in nutrients and fiber." },
            { "name": "Carrot", "price": 50, "category": "vegetables", "stock": 60, "unit": "kg", "description": "Sweet carrots high in vitamin A." },
            { "name": "Spinach", "price": 20, "category": "vegetables", "stock": 70, "unit": "bundle", "description": "Leafy green spinach loaded with iron and minerals." },
          
            { "name": "Toor Dal", "price": 140, "category": "pulses", "stock": 50, "unit": "kg", "description": "High-quality toor dal ideal for daily meals." },
            { "name": "Moong Dal", "price": 130, "category": "pulses", "stock": 45, "unit": "kg", "description": "Light and easy-to-digest moong dal." },
            { "name": "Chana Dal", "price": 110, "category": "pulses", "stock": 55, "unit": "kg", "description": "Nutritious chana dal rich in protein." },
            { "name": "Urad Dal", "price": 150, "category": "pulses", "stock": 35, "unit": "kg", "description": "Premium urad dal used in Indian dishes." },
            { "name": "Masoor Dal", "price": 120, "category": "pulses", "stock": 60, "unit": "kg", "description": "Quick-cooking masoor dal rich in protein." },
          
            { "name": "Turmeric Powder", "price": 200, "category": "masala", "stock": 25, "unit": "kg", "description": "Pure turmeric powder known for its color and health benefits." },
            { "name": "Red Chilli Powder", "price": 220, "category": "masala", "stock": 30, "unit": "kg", "description": "Spicy red chilli powder for enhancing flavor." },
            { "name": "Coriander Powder", "price": 180, "category": "masala", "stock": 28, "unit": "kg", "description": "Aromatic coriander powder for Indian cooking." },
            { "name": "Garam Masala", "price": 250, "category": "masala", "stock": 20, "unit": "kg", "description": "Blend of spices to add rich flavor to dishes." },
            { "name": "Cumin Seeds", "price": 300, "category": "masala", "stock": 15, "unit": "kg", "description": "Whole cumin seeds with strong aroma." },
          
            { "name": "Mustard Oil", "price": 180, "category": "oil_ghee", "stock": 40, "unit": "litre", "description": "Traditional mustard oil with strong flavor." },
            { "name": "Sunflower Oil", "price": 160, "category": "oil_ghee", "stock": 50, "unit": "litre", "description": "Healthy sunflower oil for everyday cooking." },
            { "name": "Refined Oil", "price": 150, "category": "oil_ghee", "stock": 60, "unit": "litre", "description": "Refined cooking oil suitable for frying." },
            { "name": "Desi Ghee", "price": 600, "category": "oil_ghee", "stock": 20, "unit": "kg", "description": "Pure desi ghee with rich aroma and taste." },
            { "name": "Vanaspati Ghee", "price": 140, "category": "oil_ghee", "stock": 35, "unit": "kg", "description": "Affordable vanaspati ghee for cooking." },
          
            { "name": "Parle-G Biscuits", "price": 10, "category": "cookies_biscuits", "stock": 200, "unit": "packet", "description": "Classic glucose biscuits loved by all ages." },
            { "name": "Good Day Biscuits", "price": 30, "category": "cookies_biscuits", "stock": 150, "unit": "packet", "description": "Crunchy butter biscuits with rich taste." },
            { "name": "Oreo Cookies", "price": 40, "category": "cookies_biscuits", "stock": 120, "unit": "packet", "description": "Chocolate sandwich cookies with cream filling." },
            { "name": "Marie Gold", "price": 25, "category": "cookies_biscuits", "stock": 180, "unit": "packet", "description": "Light and healthy tea-time biscuits." },
            { "name": "Hide & Seek", "price": 35, "category": "cookies_biscuits", "stock": 140, "unit": "packet", "description": "Chocolate chip biscuits with rich flavor." },
          
            { "name": "Milk", "price": 60, "category": "dairy_poultry", "stock": 100, "unit": "litre", "description": "Fresh full-cream milk for daily consumption." },
            { "name": "Curd", "price": 50, "category": "dairy_poultry", "stock": 80, "unit": "kg", "description": "Thick and fresh curd for meals." },
            { "name": "Butter", "price": 120, "category": "dairy_poultry", "stock": 60, "unit": "packet", "description": "Creamy butter for cooking and spreading." },
            { "name": "Paneer", "price": 350, "category": "dairy_poultry", "stock": 40, "unit": "kg", "description": "Soft paneer ideal for Indian dishes." },
            { "name": "Eggs", "price": 6, "category": "dairy_poultry", "stock": 300, "unit": "piece", "description": "Farm fresh eggs rich in protein." }
          ]
        
        await Product.insertMany(products)
       // productController.insertMany(products)
            .then(result => res.status(201).json({ success: true, data: result }))
            .catch(err => next(err));
    } catch (err) {
        next(err);
    }
})

module.exports = router;