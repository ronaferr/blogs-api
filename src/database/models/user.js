const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    /* createdAt: {
      type: 'TIMESTAMP'
    },
    updatedAt: {
      type: 'TIMESTAMP'
    }, */
  });

  return User;
};

module.exports = User;