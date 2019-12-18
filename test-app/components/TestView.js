import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestView = props => {
  const a = [];

  a.push(<Text key={1}>1</Text>);
  a.push(<Text key={2}>2</Text>);

  return <View>
    { a }
  </View>
}

const styles = StyleSheet.create({

}); 

export default TestView;