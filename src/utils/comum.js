export const alteraDados = (variavel, valor, dados, setDados) => {
  setDados({
    ...dados,
    [variavel]: valor
  });
};

export const verificaSeTemEntradaVazia = (dados, setDados) => {
  for (const [variavel, valor] of Object.entries(dados)) {
    if (valor == '') {
      setDados({
        ...dados,
        [variavel]: null
      });

      return true;
    }
  }

  return false;
};
