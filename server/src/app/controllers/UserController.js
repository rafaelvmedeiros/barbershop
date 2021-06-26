import User from '../models/User';
import isValidUser from '../valitadors/userValidation';

class UserController {
  async store(req, res) {
    if (!(await isValidUser(req.body))) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async index(req, res) {
    return res.json('');
  }

  async list(req, res) {
    return res.json('');
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async delete(req, res) {
    try {
      return res.json('');
    } catch (err) {
      return res.status(401).json('');
    }
  }
}

export default new UserController();
