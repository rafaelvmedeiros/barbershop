import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';

import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, '/sessions', {
    email,
    password,
  });

  console.tron.log(response);

  const { token, user } = response.data;

  if (!user.provider) {
    toast.error("This user isn't a provider!");
    return;
  }

  yield put(signInSuccess(token, user));

  history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
