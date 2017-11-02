import React from 'react';
// import { StyleSheet, View,TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container,Item,H1,Input,Subtitle, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import LoginScreen from './LoginScreen'
import ProfileScreen from './ProfileScreen'



const SimpleApp = StackNavigator({
  Home: { screen: LoginScreen },
  Profile:{screen:ProfileScreen}
});

class Home extends React.Component {
    // Nav options can be defined as a function of the screen's props:
    // static navigationOptions = ({ navigation }) => ({
    //   title: `Chat with ${navigation.state.params.user}`,
    // });
    // static navigationOptions = { title: 'Welcome', header: null };
    
    
    render() {
      // The screen's current route is passed in to `props.navigation.state`:
    //   const { params } = this.props.navigation.state;
      return (
        <SimpleApp/>
      );
    }
  }
  export default Home;