import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryBar, VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

const Plot = props => {

  const moreThanOne = typeof props.data[0].y === "object";

  const fullData = props.data;

  const data = [];
  const data2 = [];

  for (var elem of fullData) {
    data.push({x: elem.x, y: elem.y[0]});
  }

  for (var elem of fullData) {
    data2.push({x: elem.x, y: elem.y[1]});
  }

  const f = () => {
    const a = [];
    a.push(<VictoryLine key={1}
      style={{
        data: { stroke: "#ccc" },
        parent: { border: "1px solid #ccc"}
      }}
      data={data} />);
    a.push(<VictoryLine key={2}
      style={{
        data: { stroke: "#ccc" },
        parent: { border: "1px solid #ccc"}
      }}
      data={data2} />);
    return a;
  }

  // <VictoryLine
  // style={{
  //   data: { stroke: "#ccc" },
  //   parent: { border: "1px solid #ccc"}
  // }}
  // data={data} />

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

        {/* <VictoryLine
          style={{
            data: { stroke: "#ccc" },
            parent: { border: "1px solid #ccc"}
          }}
          data={data} />

        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={data2} /> */}

          { f() }
        
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

export default Plot;