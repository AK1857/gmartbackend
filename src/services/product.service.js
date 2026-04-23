const userRepo = require('../repositories/user.repository');
const productRepo = require('../repositories/product.repository');
const createError = require('http-errors');

exports.creatProduct = async (data) => {
    const { name, description, price,stock ,category} = data;
    // 1. Basic validation (service-level safety)

    if (!name || !description || !price || !stock || !category) {
        throw createError(400, 'All fields are required');
    }

   // 2. Check if user already exists
    const existingProductName = await productRepo.findByName(name);
    if (existingProductName) {
        throw createError(409, 'product already exists');
    }

    // 4. Create product 
    const product = await productRepo.create({
        name, description, price,stock ,category
    });
    return product;
};

exports.getProductById = async (id) => {
    const product = await productRepo.findById(id);
    if (!product) {
        throw createError(404, 'product not found');
    }
    
    return product;
}

exports.updateProduct = async (data) => {
    // Implement update logic
    try {
       let _id= data.id;
     let product = await productRepo.findById(_id);
        if (!product) {
            throw createError(404, 'User not found');
        }
            product= await productRepo.update(_id, data);

        return product;
    }
    catch (err) {
        throw err;
    }
}

exports.getAllProducts = async () => {
    return await productRepo.findAll();
}
