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
}

export default userController;
