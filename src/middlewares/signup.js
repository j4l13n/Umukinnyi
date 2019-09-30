import Joi from '@hapi/joi';
import model from '../db/models';

const { User } = model;

/**
 *  Signup validaton
 */
class SignupValidation {
  /**
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @returns {Object} signupSchema object
    */
  static async signupvalidator(req, res, next) {
    const signupSchema = Joi.object().keys({
      firstname: Joi.string().regex(/^\S+$/).min(4).required()
        .options({ language: { string: { regex: { base: 'please remove spaces between word!' } } } })
        .label('Firstname'),
      lastname: Joi.string().regex(/^\S+$/).min(4).required()
        .options({ language: { string: { regex: { base: 'please remove spaces between word!' } } } })
        .label('Lastname'),
      username: Joi.string().regex(/^\S+$/).min(4).required()
        .options({ language: { string: { regex: { base: 'please remove spaces between word!' } } } })
        .label('Username'),
      email: Joi.string().email().insensitive().required()
        .label('Email'),
      phone: Joi.string().regex(/^(?=.*\d)[\d]{10,}$/).required().options({ language: { string: { regex: { base: 'must be only number and length 10' } } } })
        .label('Phonenumber'),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({ language: { string: { regex: { base: 'must be an alphanumeric with uppercase and the length not less than 8!' } } } })
        .label('Password'),
    });
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
    };
    const checkUser = Joi.validate(user, signupSchema, {
      abortEarly: false
    });
    if (checkUser.error) {
      const Errors = [];
      for (let i = 0; i < checkUser.error.details.length; i += 1) {
        Errors.push(checkUser.error.details[i].message.replace('"', ' ').replace('"', ' '));
      }
      return res.status(400).json({ Errors });
    }
    const usernameUsed = await User.findOne({ where: { username: user.username } });
    if (usernameUsed) return res.status(409).json({ error: 'username already taken, please try again' });
    req.user = checkUser.value;
    next();
  }
}
export default SignupValidation;
