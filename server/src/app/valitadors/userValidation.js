import * as Yup from 'yup';

const userSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const isValidUser = user => {
  return userSchema.isValid(user);
};

export default isValidUser;
