import * as Yup from 'yup';

const isValidApointment = (user) => {
  const isValidApointmentSchema = Yup.object().shape({
    provider_id: Yup.number().required(),
    date: Yup.date().required(),
  });

  return isValidApointmentSchema.isValid(user);
};

export default isValidApointment;
