import React from 'react';
// import { StyleSheet, View,TextInput } from 'react-native';
import { Container,Item,H1,Input,Subtitle, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';


function mapStateToProps(state, props) {
  return {
    user:state.userReducers.userLoggedIn,
    userName:state.userReducers.ChatName
    
    };
}
function mapDispatchToProps(dispatch){return bindActionCreators(Actions,dispatch);}

class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        uname: '',
        pwd:'',
        rerender:0
    
    };
    }
    
    onLoginButtonPress(){
        this.props.login({
            username:this.state.uname,
            password:this.state.pwd
        });
        this.setState({rerender:1});
    }
    // static navigationOptions = {
    //   title: 'Welcome'
    // };
    render() {
      const {navigate}=this.props.navigation;
      console.log("rishi",this.props.user,this.props)      
      
      if(this.props.user)
      navigate('Profile', { user: this.state.uname });
      return (
        <Container>
          <Header>
          <Body>
              <Title>Header</Title>
              <Subtitle>Subtitle</Subtitle>
  
            </Body>
          </Header>
          <Content>
            <Item regular>
              <Input placeholder='Enter phone number/email address' onChangeText={(uname) => this.setState({uname})}/>
            </Item>
            <Item regular>
              <Input placeholder='Enter Password' onChangeText={(pwd) => this.setState({pwd})}/>
            </Item>
            <Button block light
            onPress={this.onLoginButtonPress.bind(this)}
            
          >
          <Text>Login</Text>
          </Button>
          </Content>

        </Container>
       
      );  
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);