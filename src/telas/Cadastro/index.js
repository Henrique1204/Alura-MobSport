import React from 'react';
import { SafeAreaView } from 'react-native';

import estilos from './estilos';
import { entradas } from './entradas';

import { cadastrar } from '../../servicos/auth';
import { alteraDados, verificaSeTemEntradaVazia } from '../../utils/comum';

import Botao from '../../componentes/Botao';
import EntradaTexto from '../../componentes/EntradaTexto';
import Alerta from '../../componentes/Alerta';



const Cadastro = () => {
  const [dados, setDados] = React.useState({
    email: '',
    senha: '',
    confirmaSenha: ''
  });

  const [statusError, setStatusError] = React.useState('');
  const [mensagemError, setMensagemError] = React.useState('');

  const verificaSeSenhasSaoIguais = () => dados.senha != dados.confirmaSenha;

  const realizarCadastro = async () => {
    if (verificaSeTemEntradaVazia(dados, setDados)) return;

    if (dados.senha != dados.confirmaSenha) {
      setStatusError(true)
      setMensagemError('As senhas não conferem')

      return;
    }

    const resultado = await cadastrar(dados.email, dados.senha);
  
    if (resultado != 'sucesso') {
      setStatusError(true);
      setMensagemError(resultado);
    }
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
              error={entrada.name != 'confirmaSenha' ? false
              : verificaSeSenhasSaoIguais() && dados.confirmaSenha != ''
            }
            />  
          )
        })
      }

      <Alerta 
        mensagem={mensagemError}
        error={statusError}
        setError={setStatusError}
      />
      
      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </SafeAreaView>
  );
};

export default Cadastro;
