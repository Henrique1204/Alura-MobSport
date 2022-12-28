import { TouchableOpacity, Text } from 'react-native';

import estilos from './estilos';

const BotaoProduto = ({ onPress }) => {
  return (
    <TouchableOpacity style={estilos.botao} onPress={onPress}>
      <Text style={estilos.textoBotao}>+</Text>
    </TouchableOpacity>
  );
};

export default BotaoProduto;
