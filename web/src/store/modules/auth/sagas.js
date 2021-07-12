import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';

import { signFailure, signInSuccess, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error("This user isn't a provider!");
      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Authentication failed! Check your account.');

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password, confirmPassword } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
      confirmPassword,
      provider: true,
    });

    toast.success('Account created successfully');
    yield put(signUpSuccess());
    history.push('/');
  } catch (err) {
    toast.error('Registration failed. Check your data.');
    yield put(signFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
