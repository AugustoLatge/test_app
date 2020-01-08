import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel
} from "victory-native";

import generateRGBstring from '../functions/generateRGBstring';

const Plot = props => {

  const fillLines = fullData => {
    var moreThanOne = typeof fullData[0].y === "object";

    if (moreThanOne) {
      var lines = [];

      var dataLength = fullData[0].y.length;

      var colorStringArray = generateRGBstring(dataLength);

      // For every y dimension (ex.: y = [0, 0] --> two dimensions)
      for (var i = 0; i < dataLength; i++) {
        var data = [];

        for (var elem of fullData) {
          data.push({ x: elem.x, y: elem.y[i] });
        }

        lines.push(
          <VictoryLine
            key={i}
            style={{
              data: { stroke: colorStringArray[i] },
              parent: { border: "1px solid #ccc" }
            }}
            data={data}
          />
        );
      }

      return lines;
    } else {
      return (
        <VictoryLine
          style={{
            data: { stroke: "rgb(57,106,177)" },
            parent: { border: "1px solid #ccc" }
          }}
          data={fullData}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <VictoryChart height={300} width={350} theme={VictoryTheme.material} >
        <VictoryLabel text="PK Curve" x={175} y={30} textAnchor="middle"/>
        <VictoryAxis label="time" style={{ axisLabel: {padding: 27} }}/>
        <VictoryAxis dependentAxis label="concentration" style={{ axisLabel: {padding: 33} }}/>
        {fillLines(props.data)}
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  }
});

export default Plot;
