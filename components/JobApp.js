import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button, } from 'react-native';

import ValueProvider from './ValueContext';

import Profile from './Profile'
import Home from './Home'
// import ApplicationBoards from './ApplicationBoards'
import Registration from './Registration'
import JobApplications from "./JobApplications";

const Tab = createBottomTabNavigator();

const App = () => {
  const data =
    {name:"",
     email:"",
     appURL: 'https://glacial-hamlet-05511.herokuapp.com',
     //appURL: 'http://127.0.0.1:3000',
   }

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component= {Home} />
          <Tab.Screen name="JobApplications" component= {JobApplications} />
          <Tab.Screen name="Register" component= {Registration} />
          <Tab.Screen name="Profile" component= {Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  )
}

export default App