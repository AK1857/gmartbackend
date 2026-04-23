const Product=require('../models/product');

exports.create = (data) => Product.create(data);

exports.findByName = async (name) => {
    return await Product.findOne({ name }).lean();
};
exports.findById = (id) => {
    return Product.findById(id);
}

exports.update = (id, data) => {
    return Product.updateOne({ _id: id }, data);   
};

exports.findAll =  async() => {

    return await Product.find({});

}