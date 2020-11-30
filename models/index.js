const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

Post.belongsTo(User, {
    foreignKey: 'user_id',
  });
//connects user and post to see how many votes
//queries each table for information through the Vote model
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});
  
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});
//connect  Post to Vote directly 
Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  //connects Vote to Post directly
User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
Post.hasMany(Vote, {
    foreignKey: 'post_id'
  });
// connects comment to user and post
Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
  });
  
Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });
module.exports = { User, Post, Vote, Comment };