import * as Yup from 'yup';

export const isValidUserCreateSchema = (user) => {
  const userCreateSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required().min(6),
  });

  return userCreateSchema.isValid(user);
};

export const isValidUserUpdateSchema = (user) => {
  const userCreateSchema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });

  return userCreateSchema.isValid(user);
};
