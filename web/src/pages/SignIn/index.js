import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

function SignIn() {
  return (
    <>
      <img src={logo} alt="logo" />

      <form>
        <input type="text" placeholder="Nome Completo" />
        <input type="email" placeholder="Seu E-mail" />
        <input type="password" placeholder="Sua Senha" />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </form>
    </>
  );
}

export default SignIn;
