import React from 'react';
import { SafeAreaView, Text, RefreshControl, TouchableOpacity, ScrollView } from 'react-native';

import estilos from './estilos';

import { auth } from '../../config/firebase';
import { pegarProdutos, pegarProdutosTempoReal } from '../../servicos/firestore';

import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';
import BotaoProduto from '../../componentes/BotaoProduto';

const Principal = ({ navigation }) => {
  const usuario = auth.currentUser;

  const [produtos, setProdutos] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)

  const carregarDadosProdutos = async () => {
    setRefreshing(true);

    const produtosFirestore = await pegarProdutos();

    setProdutos(produtosFirestore);
    setRefreshing(false);
  };

  const deslogar = () => {
    auth.signOut();

    navigation.replace('Login');
  };

  React.useEffect(() => {
    carregarDadosProdutos()

    pegarProdutosTempoReal(setProdutos)
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <Cabecalho logout={deslogar} />

      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <ScrollView
        style={{ width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarDadosProdutos}
          />
        }
      >

      {produtos?.map((produto) => {
        return (
          <TouchableOpacity key={produto.id} onPress={() => navigation.navigate('DadosProduto', produto)}>
            <Produto nome={produto.nome} preco={produto.preco}  />
          </TouchableOpacity>
        )
      })}

      </ScrollView>

      <BotaoProduto onPress={() => navigation.navigate("DadosProduto")} />
    </SafeAreaView>
  );
};

export default Principal;
