import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryBar, VictoryChart, VictoryScatter, VictoryLine, VictoryTheme } from "victory-native";

const PlotTest = props => {

  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        {/* <VictoryBar data={props.data} x="quarter" y="earnings" /> */}
        
        {/* <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={props.data} /> */}

        <VictoryScatter
            style={{ data: { fill: "#c43a31" } }}
            size={3}
            data={props.data}
          />

      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
}); 

export default PlotTest;