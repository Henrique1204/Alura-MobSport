import React from 'react';
import { SafeAreaView, Image } from 'react-native';

import estilos from './estilos';
import { entradas } from './entradas';

import { logar } from '../../servicos/auth';
import { auth } from '../../config/firebase';
import { alteraDados, verificaSeTemEntradaVazia } from '../../utils/comum';

import Botao from '../../componentes/Botao';
import EntradaTexto from '../../componentes/EntradaTexto';
import Alerta from '../../componentes/Alerta';

import animacaoCarregando from '../../../assets/animacaoCarregando.gif';

const Login = ({ navigation }) => {
  const [dados, setDados] = React.useState({
    email: '',
    senha: ''
  });

  const [statusError, setStatusError] = React.useState('');
  const [mensagemError, setMensagemError] = React.useState('');
  const [carregando, setCarregando] = React.useState(true);

  const realizarLogin = async () => {
    // funcao para verificar se email ou senha sao vazios
    if (verificaSeTemEntradaVazia(dados, setDados)) return;
    
    const resultado = await logar(dados.email, dados.senha);

    if (resultado == 'erro') {
      setStatusError(true);
      setMensagemError('E-mail ou senha não conferem');

      return;
    }

    navigation.replace('Principal');
  };

  React.useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged( usuario => {
      if (usuario) navigation.replace('Principal');

      setCarregando(false);
    });

    return () => estadoUsuario();
  },[]);

  if (carregando) {
    return (
      <SafeAreaView style={estilos.containerAnimacao}>
        <Image source={animacaoCarregando} 
          style={estilos.imagem}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      {
        entradas.map((entrada) => {
          return (
            <EntradaTexto
              key={entrada.id}
              {...entrada}
              value={dados[entrada.name]}
              onChangeText={valor => alteraDados(entrada.name, valor, dados, setDados)}
            />  
          )
        })
      }

      <Alerta 
        mensagem={mensagemError}
        error={statusError}
        setError={setStatusError}
      />
      
      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </SafeAreaView>
  );
};

export default Login;
