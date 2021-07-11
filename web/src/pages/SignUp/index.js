import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

function SignUp() {
  return (
    <>
      <img src={logo} alt="logo" />

      <form>
        <input type="text" placeholder="Nome Completo" />
        <input type="email" placeholder="Seu E-mail" />
        <input type="password" placeholder="Sua Senha" />
        <input type="password" placeholder="Confirmar Senha" />

        <button type="submit">Cadastrar</button>
        <Link to="/register">Já tenho login</Link>
      </form>
    </>
  );
}

export default SignUp;
