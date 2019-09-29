import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter you username"
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
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },
      },
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hashSync(user.password, 8);
      }
    },
    instanceMethods: {
      async validatePassword(password) {
        return await bcrypt.compareSync(password, this.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Player, {
      foreignKey: 'userId',
    });
  };
  return User;
};