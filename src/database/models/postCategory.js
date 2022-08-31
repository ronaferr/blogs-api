const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreingKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreingKey: true,
      },
    },
    { 
      timestamps: false,
      tableName: 'PostCategories',
     },
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost,
      { as: 'posts',
        through: PostCategory,
        foreingKey: 'categoryId',
        otherKey: 'postId',
      });
    models.BlogPost.belongsToMany(models.Category,
      { as: 'categories',
        through: PostCategory,
        foreingKey: 'postId',
        otherKey: 'categoryId',
      });
  };

  return PostCategory;
};

module.exports = PostCategory;