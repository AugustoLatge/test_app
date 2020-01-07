import React, { useState, useEffect, useCallback } from 'react';
import {} from 'react-native';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import DataScreen from './screens/DataEntryScreen';
import Navigator from './navigation/Navigator';
import calculateReducer from './store/reducers/calculate';

const rootReducer = combineReducers({
  calculate: calculateReducer
});

const store = createStore(
  rootReducer
);

export default function App() {
 return <Provider store={store}><Navigator /></Provider>;
}