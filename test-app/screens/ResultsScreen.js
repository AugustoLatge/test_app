import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultsScreen = props => {
  return <View style={styles.screen}>
    <Text>Results Screen</Text>
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