import React from 'react';
// import { StyleSheet, View,TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container,Item,H1,Input,Subtitle, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import Home from './src/components/Home';

import userReducers from './src/reducers/user';

import {combineReducers,createStore} from 'redux';
import {Provider} from 'react-redux'

let store=createStore(combineReducers({userReducers}));


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  // async componentWillMount() {
  //   await Expo.Font.loadAsync({
  //     'Roboto': require('native-base/Fonts/Roboto.ttf'),
  //     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  //   });
  //   this.setState({ isReady: true });
  // }
  render() {
    // if (!this.state.isReady) {
    //   return <Expo.AppLoading />;
    // }
    // else
    return <Provider store={store}>
              <Home />
           </Provider>;
  }
}

