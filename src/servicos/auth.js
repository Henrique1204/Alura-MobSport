import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  AuthErrorCodes 
} from 'firebase/auth';

import { auth } from '../config/firebase';

const errosFirebase = ({ code }) => {
  switch(code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'Esse email já está em uso';
    case AuthErrorCodes.INVALID_EMAIL:
      return 'Email inválido';
    case AuthErrorCodes.WEAK_PASSWORD:
      return 'A senha precisa de no minimo 6 caracteres';
    default:
      return 'Erro desconhecido';
  }
};

export const cadastrar = async (email, senha) => {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
  .then(() => 'sucesso')
  .catch(errosFirebase);

  return resultado
};

export const logar = async (email, senha) => {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
  .then(() => 'sucesso')
  .catch(() => 'erro');

  return resultado;
};
