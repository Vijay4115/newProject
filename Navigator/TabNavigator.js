import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../TabScreens/HomeScreen';
import AccountScreen from '../TabScreens/AccountScreen';
import CreateAdScreen from '../TabScreens/CreateAdScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigator = () =>{
  return(
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-list'
            : 'ios-list';
        } else if (route.name === 'Create') {
          iconName = focused ? 'add-circle' : 'add';
        }
        else if (route.name === 'Account') {
          iconName = focused ? 'person' : 'person';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    
    }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{title:"Home"}}/>
        <Tab.Screen name="Create" component={CreateAdScreen}   options={{title:"Create"}}/>
        <Tab.Screen name="Account" component={AccountScreen}   options={{title:"Account"}}/>
      </Tab.Navigator>
  )
}
export default TabNavigator;