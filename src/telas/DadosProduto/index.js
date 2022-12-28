import React from 'react';
import { SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import estilos from './estilos';

import { salvarProduto, atualizarProduto, deletarProduto } from '../../servicos/firestore';

import EntradaTexto from '../../componentes/EntradaTexto';
import Botao from '../../componentes/Botao';
import Alerta from '../../componentes/Alerta';


const DadosProduto = ({ navigation, route }) => {
  const [nome, setNome] = React.useState(route?.params?.nome || '');
  const [preco, setPreco] = React.useState(route?.params?.preco || '');
  const [mensagem, setMensagem] = React.useState('');
  const [mostrarMensagem, setMostrarMensagem] = React.useState(false);

  const salvar = async () => {
    if (nome == '' || preco == ''){
      setMensagem('Por favor preencha todos os campos');
      setMostrarMensagem(true);

      return;
    }

    let resultado = '';

    if (route?.params) {
      resultado = await atualizarProduto(route?.params?.id, {
        nome, preco
      });
    } else{
      resultado = await salvarProduto({
        nome,
        preco
      });
    }
    
    if (resultado == 'erro'){
      setMensagem('Erro ao salvar produto');
      setMostrarMensagem(true);
    } else {
      navigation.goBack();
    }
  }

  const deletar = () => {
    Alert.alert(
      'Deletar produto',
      'Tem certeza que quer deletar?',
      [
        {
          text: 'Não',
          style:'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            deletarProduto(route?.params?.id);
            navigation.goBack()
          },
          style: 'default'
        }
      ]
    );
  };

  return (
    <SafeAreaView style={estilos.container}>
      {route?.params && (
        <TouchableOpacity onPress={() => deletar()}>
          <Icon
            name='trash-2'
            size={20}
            color='#000'
          />
        </TouchableOpacity>
      )}

      <EntradaTexto
        label='Nome do produto'
        value={nome}
        onChangeText={texto => setNome(texto)}
      />

      <EntradaTexto
        label='Preço do produto'
        value={preco}
        onChangeText={texto => setPreco(texto)}
      />

      <Botao onPress={() => salvar()} >Salvar</Botao>

      <Alerta
        mensagem={mensagem}
        error={mostrarMensagem}
        setError={setMostrarMensagem}
      />
    </SafeAreaView>
  )
};

export default DadosProduto;
