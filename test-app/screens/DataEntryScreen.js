import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import randomNormal from 'random-normal';
import { useDispatch } from 'react-redux';

import yamamotoSteadyStateModel from '../functions/yamamotoSteadyStateModel';
import oneCompartmentSingleDoseSteadyStateModel from '../functions/oneCompartmentSingleDoseSteadyStateModel';
import oneCompartmentMultiDoseModel from '../functions/oneCompartmentMultiDoseModel';
import yamamotoFunctionPartialSSearlyStop from '../functions/yamamotoFunctionPartialSSearlyStop';
import yamamotoFunctionPartial from '../functions/yamamotoFunctionPartial';
import ode1SSearlyStop from '../functions/ode1SSearlyStop';
import ode1 from '../functions/ode1';
import Plot from '../components/Plot';
import PlotTest from '../components/PlotTest';
import TestView from '../components/TestView';
import { calculate } from '../store/actions/calculate';

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
  //     tDarray = [0],
  //     Darray = [1000],
  //     TinfArray = [1],
  //     t0 = 0,
  //     dt = 1,
  //     tfinal = 10,
  //     y0 = [0, 0];

  function fillTDarray(Tau, n) {
    var t = 0;
    var tDarray = [t];
    for (var i = 0; i < n - 1; i++) {
      t = t + Tau;
      tDarray.push(t);
    }
    return tDarray;
  };

  function fillDarray(dose, n) {
    var Darray = [];
    for (var i = 0; i < n; i++) {
      Darray.push(dose);
    }
    return Darray;
  };

  function fillTinfArray(Tinf, n) {
    var TinfArray = [];
    for (var i = 0; i < n; i++) {
      TinfArray.push(Tinf);
    }
    return TinfArray;
  };

  var CRCL = 100,
      WT = 70,
      nPer = 20,
      Tau = 24,
      tDarray = fillTDarray(Tau, nPer),
      Darray = fillDarray(1000, nPer),
      TinfArray = fillTinfArray(1, nPer),
      t0 = 0,
      dt = .1,
      tfinal = nPer*Tau,
      y0 = [0, 0];

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

  var omega = [.375,.182,.192,.728];

  // var randomNormal = require('random-normal');

  // console.log(randomNormal());

  // var testNormalDist = [];

  // for (var i = 0; i < 10000; i++) {
  //   testNormalDist.push(randomNormal());
  // };

  // testNormalDist.sort(function (a, b) {
  //   if (a > b) {
  //       return 1;
  //   }
  //   if (b > a) {
  //       return -1;
  //   }
  //   return 0;
  // });

  // testNormalDist = testNormalDist.map((a) => {
  //   var mu = 0;
  //   var sigma = 1;
  //   var result = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow((a - mu),2) / (2 * Math.pow(sigma,2)));
  //   return {x: a, y: result};
  // });

  var eta = omega.map((a,i) => randomNormal({mean: 0, dev: omega[i]}));

  // const yamamotoFunction = yamamotoFunctionPartial(
  //   CRCL,
  //   WT,
  //   tDarray,
  //   Darray,
  //   TinfArray,
  //   theta,
  //   eta);

  const yamamotoFunction = yamamotoFunctionPartialSSearlyStop(
    CRCL,
    WT,
    tDarray,
    Darray,
    TinfArray,
    theta,
    eta,
    y0);

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

  // var results = ode1(yamamotoFunction, t0, dt, tfinal, y0);

  var results = ode1SSearlyStop(yamamotoFunction, t0, dt, tfinal, y0);

  // var results = [{x: 0, y: 0}, {x: 1, y: 1}];

  const dispatch = useDispatch();

  dispatch(calculate(results));

  // var results = [];

  // var yValues = [];

  // for (var i = 0; i < 20; i++) {
  //   yValues.push(i);
  // }

  // for (var i = 0; i < 10; i++) {
  //     results.push({x: i, y: yValues});
  // }

  // const data = [];

  // for (var elem of results) {
  //   data.push({x: elem.x, y: elem.y[0]});
  // }

  return <View style={styles.screen}>
    <Text>Data Screen</Text>
    {/* <Plot data={results}/> */}
    {/* <PlotTest data={testNormalDist}/> */}
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