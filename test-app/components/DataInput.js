import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const DataInput = props => {
  return <View style={styles.container}>
    <Text>{props.label}</Text>
    <TextInput placeholder={"Place holder"} onSubmitEditing={props.printStuff}/>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  }
}); 

export default DataInput;