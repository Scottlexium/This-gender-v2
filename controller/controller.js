const express = require("express");
const Post = require('../models/post');



module.exports.homepage_get = async (req, res)=>{
   const articles = await Post.find().sort({createdAt: 'desc'})
        res.render('index', {articles:articles});

}
module.exports.create_get =(req, res)=>{
    res.render('create');
}
module.exports.create_post = (req, res)=>{
    let {title, snippet, markdown}=req.body;
    const post = new Post({
        title,
        snippet,
        markdown
    })
    post.save()
    .then((result)=>{
        console.log(result)
        res.send('data Sent')
    }).catch(err => console.log(err));
}

module.exports.read_get = async (req, res)=>{
    const postId = req.params.slug;
    console.log(postId)
    const article = await Post.findOne({ slug: req.params.slug})
    if(article == null) res.render('/')
        res.render('postDetails', {articles:article})
    
}

module.exports.delete_post = async (req, res)=>{
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/')
}