import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import yamamotoSteadyStateModel from '../functions/yamamotoSteadyStateModel';
import oneCompartmentSingleDoseSteadyStateModel from '../functions/oneCompartmentSingleDoseSteadyStateModel';
import oneCompartmentMultiDoseModel from '../functions/oneCompartmentMultiDoseModel';
import yamamotoFunctionPartial from '../functions/yamamotoFunctionPartial';
import ode1 from '../functions/ode1';
import Plot from '../components/Plot';
import TestView from '../components/TestView';

const DataEntryScreen = props => {

  // var t0 = 0;
  // var tf = 50;
  // var dt = 1;
  // var CRCL = 100;
  // var WT = 70;
  // var tDarray = [0,10,20,30,40];
  // var Darray = [1000,1000,1000,1000,1000];
  // var TinfArray = [1,1,1,1,1];
  // var TauArray = [10,10,10,10,10];

  // var CRCL = 100,
  //     WT = 70,
  //     tD = 0,
  //     Tinf = 1,
  //     D = 1000,      
  //     t0 = 0,
  //     dt = .001,
  //     tfinal = 10;

  var CRCL = 100,
      WT = 70,
      tDarray = [0,10,20,30,40],
      Darray = [1000,1000,1000,1000,1000],
      TinfArray = [1,1,1,1,1],
      t0 = 0,
      dt = 1,
      tfinal = 50;

  var theta = [0,0,0,0,0,0,0,0];
  theta[0] = 3.83;
  theta[1] = 0.032;
  theta[2] = 0.32;
  // theta[3] = 0.206;	// for healthy volunteers
  // theta[4] = 39.4;    
  theta[3] = 0.478;	// for patients with gram positive infections
  theta[4] = 60.6;  
  theta[5] = 8.81;
  theta[6] = 0.143;
  theta[7] = 0;

  var eta = [.375,.182,.192,.728];

  const yamamotoFunction = yamamotoFunctionPartial(
    CRCL,
    WT,
    tDarray,
    Darray,
    TinfArray,
    theta,
    eta);

  // // const modelResult = yamamotoSteadyStateModel(
  // const modelResult = oneCompartmentMultiDoseModel(
  //   t0,
  //   tf,
  //   dt,
  //   CRCL,
  //   WT,
  //   Darray,
  //   tDarray,
  //   TinfArray,
  //   TauArray,    
  //   theta,
  //   eta
  // );

  // const data = [
  //   { quarter: 1, earnings: 13000 },
  //   { quarter: 2, earnings: 16500 },
  //   { quarter: 3, earnings: 14250 },
  //   { quarter: 4, earnings: 19000 }
  // ];

  // var testFunction = function (t, y) {
  //   var dydt = 1;
  //   return dydt;
  // }

  // var testFunction = function (t, y) {
  //   var dydt = [0, 0];
  //   dydt[0] = y[1];
  //   dydt[1] = 4 * (1-y[0]*y[0])*y[1] - y[0];
  //   return dydt;
  // }

  // var y0 = 0,
  //     t0 = 0,
  //     dt = 1,
  //     tfinal = 10,
  //     results = ode1(testFunction, t0, dt, tfinal, y0);

  // var y0 = [2, 0],
  //     t0 = 0,
  //     dt = .001,
  //     tfinal = 10,
  //     results = ode1(testFunction, t0, dt, tfinal, y0);

  var y0 = [0, 0],
      results = ode1(yamamotoFunction, t0, dt, tfinal, y0);

  // const data = [];

  // for (var elem of results) {
  //   data.push({x: elem.x, y: elem.y[0]});
  // }

  return <View style={styles.screen}>
    <Text>Data Screen</Text>
    <Plot data={results}/>
    {/* <TestView /> */}
    <Button title="Calculation Results" onPress={() => props.navigation.navigate('Results')} />
  </View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
}); 

export default DataEntryScreen;