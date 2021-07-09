import { Op } from 'sequelize';

import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';

import Appointment from '../models/Appointment';
import SchedulerTime from '../models/SchedulerTime';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.json(400).json({ error: 'Invalid Date' });
    }

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = await SchedulerTime.findAll({});

    const available = schedule.map((data) => {
      const [hour, minute] = data.time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time: data.time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !Appointment.find((a) => format(a.date, 'HH:mm') === data.time),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
