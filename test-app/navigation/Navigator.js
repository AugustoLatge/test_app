import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import DataEntryScreen from '../screens/DataEntryScreen';
import ResultsScreen from '../screens/ResultsScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: "#0080fe"
  },
  headerTintColor: "white"
};

const MainNavigator = createStackNavigator({
  DataEntry: DataEntryScreen,
  Results: ResultsScreen
}, {
  defaultNavigationOptions: defaultNavOptions
});

export default createAppContainer(MainNavigator);
