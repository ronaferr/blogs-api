const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory",
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      { as: 'posts',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'id',
      });
    models.Category.belongsToMany(models.BlogPost,
      { as: 'categories',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'id',
      });
  };

  return PostCategory;
};

module.exports = PostCategory;