const mongoose = require('mongoose');
const RecipeSchema =  new mongoose.Schema({

        id: {type: Number, required: true},
        
        name: {String, required: true, trim: true},
        image: { type: URL },
        link: {String},
        recipe: {String, required: true}
});

const Recipe = new mongoose.model('Recipe', RecipeSchema);

module.exports = {
    Recipe }