import { View, Text } from 'react-native';

import estilos from './estilos';

const Produto = ({ nome, preco }) => {
  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>{nome}</Text>
      <Text style={estilos.texto}>R$ {preco}</Text>
    </View>
  );
};

export default Produto;
