import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Switch } from 'react-native';
import randomNormal from 'random-normal';
import { useDispatch } from 'react-redux';


import yamamotoFunctionPartialSSearlyStop from '../functions/yamamotoFunctionPartialSSearlyStop';
import yamamotoFunctionPartial from '../functions/yamamotoFunctionPartial';
import ode1SSearlyStop from '../functions/ode1SSearlyStop';
import ode1 from '../functions/ode1';

import { calculate } from '../store/actions/calculate';

const DataEntryScreen = props => {  

  const [earlyStop, setEarlyStop] = useState(false);

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

  var eta = omega.map((a,i) => randomNormal({mean: 0, dev: omega[i]}));

  if (!earlyStop) {

    const yamamotoFunction = yamamotoFunctionPartial(
      CRCL,
      WT,
      tDarray,
      Darray,
      TinfArray,
      theta,
      eta);

      var results = ode1(yamamotoFunction, t0, dt, tfinal, y0);
  } else {
    
    const yamamotoFunction = yamamotoFunctionPartialSSearlyStop(
    CRCL,
    WT,
    tDarray,
    Darray,
    TinfArray,
    theta,
    eta,
    y0);

    var results = ode1SSearlyStop(yamamotoFunction, t0, dt, tfinal, y0);
  }

  const dispatch = useDispatch();

  dispatch(calculate(results));

  return (
    <View style={styles.screen}>
      <View style={styles.earlyStopSwitch}>
        <Text>Early Stop:</Text>
        <Switch
          value={earlyStop}
          onValueChange={() => {
            setEarlyStop(!earlyStop);
          }}
        />
      </View>
      
      <Button
        title="Go To Calculation Results"
        onPress={() => props.navigation.navigate("Results")}
      />
    </View>
  );
}

DataEntryScreen.navigationOptions = {
  headerTitle: "Data Entry"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  earlyStopSwitch: {
    flexDirection: 'row'
  }
}); 

export default DataEntryScreen;