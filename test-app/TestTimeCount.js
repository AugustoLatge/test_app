import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export default function App() {
  const [isCounting, setIsCounting] = useState(1);
  const [isFirstCount, setIsFirstCount] = useState(true);

  const sleep = useCallback((milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  });

  useEffect(() => {
    if (isFirstCount) {
      setIsFirstCount(false)
    } else {        
      sleep(300);
      if (isCounting < 3) {      
        setIsCounting(isCounting + 1);
      }
    }
  });

  // useEffect(() => {
  //   if (isCounting < 3) {  
  //     sleep(1000);    
  //     setIsCounting(isCounting + 1);      
  //   }
  // });

  return (
    <View style={styles.container}>
      <Text>The count is: {isCounting}</Text>
    </View>
  );

  // const [count, setCount] = useState(0);

  // // Similar to componentDidMount and componentDidUpdate:
  // // useEffect(() => {
  // //   // Update the document title using the browser API
  // //   document.title = `You clicked ${count} times`;
  // // });

  // return (
  //   <View style={styles.container}>
  //     <Text>You clicked {count} times</Text>
  //     <Button title="Click me" onPress={() => setCount(count + 1)} />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
