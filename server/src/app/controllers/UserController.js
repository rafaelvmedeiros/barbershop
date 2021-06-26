import User from '../models/User';
import isValidUser from '../valitadors/userValidation';

class UserController {
  async store(req, res) {
    try {
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
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      return res.json('');
    } catch (err) {
      return res.status(401).json('');
    }
  }

  async list(req, res) {
    try {
      return res.json('');
    } catch (err) {
      return res.status(401).json('');
    }
  }

  async update(req, res) {
    try {
      return res.json('');
    } catch (err) {
      return res.status(401).json('');
    }
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
