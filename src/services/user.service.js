const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

exports.createUser = async (data) => {
    const { email, password, name } = data;


    // 1. Basic validation (service-level safety)
    if (!email || !password) {
        throw createError(400, 'Email and password are required');
    }

   // 2. Check if user already exists
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
        throw createError(409, 'User already exists');
    }

    // 3. Hash password (security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await userRepo.create({
        name,
        email,
        password: hashedPassword
    });

    // 5. Remove sensitive data before returning
    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};

exports.getUserById = async (id) => {
    const user = await userRepo.findById(id);
    if (!user) {
        throw createError(404, 'User not found');
    }

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
}

exports.updateUser = async (data) => {
    // Implement update logic
    try {
        // Placeholder for update logic
        /*
        1. Validate input (ensure required fields are present)
        2. Check if user exists (by ID or email)
        3. Hash password if it's being updated
        4. Update user in the database


        */ 
       let userId= data.id;

     let user = await userRepo.findById(userId);
        if (!user) {
            throw createError(404, 'User not found');
        }
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }
            Object.assign(user, data);

            user= await userRepo.update(userId, data);
             // await user.save();
         

        return user;
    }
    catch (err) {
        throw err;
    }
}
