import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const DataInput = props => {
  return <View style={styles.container}>
    <Text>{props.label}</Text>
    <TextInput />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  }
}); 

export default DataInput;