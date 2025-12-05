import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchItems, db} from "../database/db";

export default function VideosScreen({ navigation }) {

  const [itens, setItens] = useState([]);
  const [status, setStatus] = useState('Pronto');

  const carregarDados = async () => {
    setStatus('Carregando...');
    try {
      // 1. CHAMA A FUNÇÃO USANDO AWAIT
      const dadosDoBanco = await fetchItems();
      
      // 2. USA OS DADOS
      setItens(dadosDoBanco);
      setStatus(`Sucesso! ${dadosDoBanco.length} itens encontrados.`);
      
    } catch (error) {
      // 3. TRATAMENTO DE ERRO
      setStatus('ERRO ao buscar dados: ' + error.message);
      console.error('Erro de SQLite:', error);
    }
  };

  // Exemplo de uso: Carregar dados ao montar o componente
  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VideosScreen Inicial</Text>
      <Text style={styles.title}>data</Text>
      {/* <Text style={{ marginTop: 10 }}>Primeiro Item: {itens[0]}</Text> */}
      {/* <Button
                title="Ir para HomeScreen"
                onPress={() => navigation.navigate('HomeScreen')}
            /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});
