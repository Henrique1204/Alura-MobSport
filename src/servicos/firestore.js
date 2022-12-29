import { collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot
} from 'firebase/firestore';

import { db } from '../config/firebase';

export const salvarProduto = async (data) => {
  try {
    await addDoc(collection(db, 'produtos'), data);

    return 'ok';
  } catch(error) {
    console.log('Erro add produto:', error);
    return 'erro';
  }
};

export const pegarProdutos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'produtos'));

    let produtos = [];

    querySnapshot.forEach((doc) => {
      let produto = {id: doc.id, ...doc.data()}
      produtos.push(produto)
    });

    return produtos;
  } catch(error) {
    console.log(error);

    return [];
  }
};

export const pegarProdutosTempoReal = (setProdutos) => {
  const ref = query(collection(db, 'produtos'));

  onSnapshot(ref, (querySnapshot) => {
    const produtos = [];

    querySnapshot.forEach(( doc ) => {
      produtos.push({id: doc.id, ...doc.data()})
    });

    setProdutos(produtos);
  });
};

export const atualizarProduto = async (produtoID, data) => {
  try {
    const produtoRef = doc(db, 'produtos', produtoID);

    await updateDoc(produtoRef, data);

    return 'ok';
  } catch(error) {
    console.log(error);

    return 'error';
  }
};

export const deletarProduto = async (produtoID) => {
  try {
    const produtoRef = doc(db, 'produtos', produtoID);

    await deleteDoc(produtoRef);

    return 'ok';
  } catch(error) {
    console.log(error);

    return 'error';
  }
};
