import React from 'react';
import { StyleSheet, Text, TextInput, FlatList, KeyboardAvoidingView,View ,Button} from 'react-native';
// import { Constants } from 'expo';

export default class ChatView extends React.Component {
  constructor(props) {
    super(props);
        this.state={
        typing:[]
        }
    this.handleSendMessage = this.onSendMessage.bind(this);
  }

  onSendMessage(e) { // (1)
    console.log("hedd",this.state.typing);
    
    this.props.onSendMessage(this.state.typing);
    this.refs.input.clear();
  }

  render() { // (2)
    
    return (
    //   <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View>
        <FlatList data={ this.props.messages } 
                  renderItem={ this.renderItem }
                  styles={ styles.messages } />
        <TextInput autoFocus
                   keyboardType="default"
                   returnKeyType="done"
                   enablesReturnKeyAutomatically
                   style={ styles.input }
                   blurOnSubmit={ false }
                   onChangeText={text => this.setState({typing: text})}
                   ref="input"
                   />
                    <Button
                        onPress={ this.handleSendMessage }
                        title="Send"
                        color="#841584"
                    />
                   </View>
    //   </KeyboardAvoidingView>
    );
  }

  renderItem({item}) { // (3)
    const action = item.action;
    const name = item.name;

    if (action == 'join') {
        return <Text style={ styles.joinPart }>{ name } has joined</Text>;
    } else if (action == 'part') {
        return <Text style={ styles.joinPart }>{ name } has left</Text>;
    } else if (action == 'message') {
        return <Text>{ name }: { item.message }</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
    // paddingTop: Constants.statusBarHeight
  },
  messages: {
    alignSelf: 'stretch'
  },
  input: {
    alignSelf: 'stretch'
  },
  joinPart: {
    fontStyle: 'italic'
  }
});