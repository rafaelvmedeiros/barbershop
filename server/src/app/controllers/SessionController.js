import jwt from 'jsonwebtoken';

import authCofing from '../../config/auth';
import User from '../models/User';

import isValidSession from '../valitadors/SessionValidation';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!(await isValidSession(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authCofing.secret, {
        expiresIn: authCofing.expiresIn,
      }),
    });
  }
}

export default new SessionController();
