import * as Yup from 'yup';

const isValidSession = (user) => {
  const isValidSessionSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  return isValidSessionSchema.isValid(user);
};

export default isValidSession;
