import model from '../db/models';

const { Player } = model;

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
  static async createPlayer(req, res) {
    const {
      firstname, lastname, identity, email, phone
    } = req.body;
    return Player
      .create({
        firstname,
        lastname,
        identity,
        email,
        phone,
        userId: 1
      })
      .then(userData => res.status(201).send({
        success: true,
        message: 'User successfully created',
        userData
      })).catch((error) => {
        res.status(500).json({
          error: error.errors[0].message
        });
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} return player updated
   */
  static async updatePlayer(req, res) {
    try {
      const player = await Player.findOne({ where: { id: req.params.id } });
      const updated = await player.update({
        firstname: req.body.firstname || player.firstname,
        lastname: req.body.lastname || player.lastname,
        email: req.body.email || player.email,
        userId: player.userId,
        phone: req.body.phone || player.phone
      });
      return res.status(200).json({
        player: updated
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} return players
     */
  static async getAllPlayers(req, res) {
    return Player
      .findAll()
      .then((players) => {
        res.status(200).json({
          players
        });
      }).catch(() => {
        res.status(500).json({
          error: 'Something went wrong while fetching users'
        });
      });
  }
}

export default playerController;
