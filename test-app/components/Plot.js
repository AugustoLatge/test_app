import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme
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
      <VictoryChart width={350} theme={VictoryTheme.material}>
        {fillLines(props.data)}
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});

export default Plot;
