import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../db/models';

const { User } = model;

/**
 * Player Controller
 */
class userController {
  /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} return player created
     */
  static async signup(req, res) {
    const {
      firstname, lastname, username, email, phone, password
    } = req.body;
    return User
      .create({
        firstname,
        lastname,
        username,
        email,
        phone,
        password
      })
      .then(userData => res.status(201).send({
        success: true,
        message: 'User successfully created',
        userData
      })).catch((error) => {
        res.status(500).send({
          error: error.errors[0].message
        });
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} user
   */
  static async login(req, res) {
    try {
      const findUser = await User.findOne({ where: { email: req.body.email } });
      if (findUser) {
        const userData = {
          id: findUser.dataValues.id,
          username: findUser.dataValues.username,
          email: findUser.dataValues.email,
          password: findUser.dataValues.password
        };
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          const payload = {
            id: userData.id,
            username: userData.username,
            email: userData.email
          };
          const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY);
          return res.status(200).json({
            token,
            email: payload.email,
            username: payload.username
          });
        }
        return res.status(400).json({
          error: 'Password does not match'
        });
      }
      return res.status(404).json({
        error: 'User was not found'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Something we wrong with the server'
      });
    }
  }
}

export default userController;
