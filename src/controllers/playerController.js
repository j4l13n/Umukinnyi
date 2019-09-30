import model from '../db/models';

const { User } = model;

/**
 * Player Controller
 */
class playerController {
  /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} return player created
     */
  static async signup(req, res) {
    const {
      firstname, lastname, username, email, phonenumber, password
    } = req.body;
    return User
      .create({
        firstname,
        lastname,
        username,
        email,
        phonenumber,
        password
      })
      .then(userData => res.status(201).send({
        success: true,
        message: 'User successfully created',
        userData
      }));
  }
}

export default playerController;
