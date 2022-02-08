const mongoose = require('mongoose');
const {marked} = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);
const Schema = mongoose.Schema;
    const postSchema = new Schema({
        title:{
            type: String,
            required: false,
            unique: true,
        },
        snippet:{
            type: String,
            required: false,
        },
        markdown:{
            type: String,
            required: true,
            unique: true,
        },
        sanitizedHtml:{
            type:String,
            required: true,
        },
        slug:{
            type: String,
            required: true,
            unique: true
        }
    },{timestamps: true});

    postSchema.pre('validate', function (next) {
        if(this.title){
            this.slug = slugify(this.title,{lower:true, strict: true})
        }
        
        if (this.markdown) {
            this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
        }
        next()
    })
    
    
    
    const post = mongoose.model('posts', postSchema);
    module.exports = post;