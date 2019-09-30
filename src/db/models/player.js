export default (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter you firstname"
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter you lastname"
      }
    },
    identity: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter you id number"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    }
  }, {});
  Player.associate = function(models) {
    // associations can be defined here
    Player.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Player;
};