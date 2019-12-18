import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import DataEntryScreen from '../screens/DataEntryScreen';
import ResultsScreen from '../screens/ResultsScreen';

const MainNavigator = createStackNavigator({
  DataEntry: DataEntryScreen,
  Results: ResultsScreen
});

export default createAppContainer(MainNavigator);
