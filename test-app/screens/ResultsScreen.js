import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Plot from '../components/Plot';


const ResultsScreen = props => {
  const results = useSelector(state => state.calculate.results);

  return <View style={styles.screen}>
    <Text>Results Screen</Text>
    <Plot data={results}/>    
  </View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
}); 

export default ResultsScreen;