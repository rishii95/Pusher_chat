import React from 'react';
// import { StyleSheet, View,TextInput } from 'react-native';
// import { Container,Item,H1,Input,Subtitle, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    FlatList,
    Image,
    Platform
  } from 'react-native';
  import Pusher from 'pusher-js/react-native';
  import pusherConfig from '../../ChatServer/pusher.json';
  import ChatView from'./ChatView.js'

  import RNPusherPushNotifications from 'react-native-pusher-push-notifications';

  
function mapStateToProps(state, props) {
  return {
    user:state.userReducers.userLoggedIn,
    userName:state.userReducers.ChatName
    
    };
}
function mapDispatchToProps(dispatch){return bindActionCreators(Actions,dispatch);}

// class ProfileScreen extends React.Component {

    

//     // static navigationOptions = {
//     //   title: 'Welcome'
//     // };
//     render() {
//     //   const {navigate}=this.props.navigation;
//       console.log("rishi",this.props.user,this.props,this.props.navigation.state.params.user)      
//     this.props.logout();
    
//     //   if(this.props.user)
//     //   navigate('Profile', { user: this.state.uname });
//       return (
//         <Container>


//         </Container>
       
//       );  
//     }
//   }
//   export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);
const interest = "donuts";

// Set your app key and register for push
RNPusherPushNotifications.setAppKey("935acc7a384edda7cfe8");

if (Platform.OS === 'ios') {
  // iOS must wait for rego
  RNPusherPushNotifications.on('registered', initInterests)
} else {
  // Android is immediate
  initInterests()
}

function initInterests() {
    // Subscribe to push notifications
    if (Platform.OS === 'ios') {
        // iOS callbacks are beta, so dont use them
        RNPusherPushNotifications.subscribe(interest);
    } else {
        // Android is better, so handle faults
        RNPusherPushNotifications.subscribe(
            interest,
            (error) => {
                console.error(error);
            },
            (success) => {
                console.log(success);
            }
        );
    }
}
class ProfileScreen extends React.Component {
    // Nav options can be defined as a function of the screen's props:
    // static navigationOptions = ({ navigation }) => ({
    //   title: `Chat with ${navigation.state.params.user}`


     constructor(props) {
        super(props);
        this.state = {
          messages: []
        };
      
      this.pusher = new Pusher(pusherConfig.key, pusherConfig); // (1)
      
              this.chatChannel = this.pusher.subscribe('chat_channel'); // (2)
              this.chatChannel.bind('pusher:subscription_succeeded', () => { // (3)
                this.chatChannel.bind('join', (data) => { // (4)
                  this.handleJoin(data.name);
                });
                this.chatChannel.bind('part', (data) => { // (5)
                  this.handlePart(data.name);
                });
                this.chatChannel.bind('message', (data) => { // (6)
                  this.handleMessage(data.name, data.message);
                });
              });
      
              this.handleSendMessage = this.onSendMessage.bind(this); // (9)
      }
      
            handleJoin(name) { // (4)
              const messages = this.state.messages.slice();
              messages.push({action: 'join', name: name});
              this.setState({
                messages: messages
              });
            }
      
            handlePart(name) { // (5)
              const messages = this.state.messages.slice();
              messages.push({action: 'part', name: name});
              this.setState({
                messages: messages
              });
            }
      
            handleMessage(name, message) { // (6)
              const messages = this.state.messages.slice();
              messages.push({action: 'message', name: name, message: message});
              this.setState({
                messages: messages
              });
            }
      
            componentDidMount() { // (7)
              fetch(`${pusherConfig.restServer}/users/${this.props.navigation.state.params.user}`, {
                method: 'PUT'
              });
            }
      
            componentWillUnmount() { // (8)
              fetch(`${pusherConfig.restServer}/users/${this.props.navigation.state.params.user}`, {
                method: 'DELETE'
              });
            }
      
            onSendMessage(text) { // (9)
                console.log("wassup",text)
              const payload = {
                  message: text
              };
              fetch(`${pusherConfig.restServer}/users/${this.props.navigation.state.params.user}/messages`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              });
            }
    render() {
        
      // The screen's current route is passed in to `props.navigation.state`:
      console.log("hee",pusherConfig.restServer)
      const { params } = this.props.navigation.state;
      this.props.logout();
      const messages = this.state.messages;
      
      return (

        <ChatView messages={ messages } onSendMessage={ this.handleSendMessage } />
        
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    row: {
      flexDirection: 'row',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    avatar: {
      borderRadius: 20,
      width: 40,
      height: 40,
      marginRight: 10,
    },
    rowText: {
      flex: 1,
    },
    message: {
      fontSize: 18,
    },
    sender: {
      fontWeight: 'bold',
      paddingRight: 10,
    },
    footer: {
      flexDirection: 'row',
      backgroundColor: '#eee',
    },
    input: {
      paddingHorizontal: 20,
      fontSize: 18,
      flex: 1,
    },
    send: {
      alignSelf: 'center',
      color: 'lightseagreen',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 20,
    },
  });
  export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);
  