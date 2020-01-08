import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Plot from '../components/Plot';

const ResultsScreen = props => {
  const results = useSelector(state => state.calculate.results);

  return <View style={styles.screen}>
    <Plot data={results}/>    
  </View>
}

ResultsScreen.navigationOptions = {
  headerTitle: "Results"
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    height: 300
  }
}); 

export default ResultsScreen;