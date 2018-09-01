import React from 'react';
import { Text, View, StyleSheet, TextInput, Switch, ScrollView, AsyncStorage } from 'react-native';
import { Constants } from 'expo';

const storageKey = 'cloudtech:notesApp';

export default class App extends React.Component {
  state = {
    value: '',
    actions: [],
    notes: [ 
      {title:'note1', text:'text of note1', done:false, timestamp:new Date().getTime(),}, 
      {title:'note2', text:'text of note2. very interesting', done:false, timestamp:new Date().getTime()},
      {title:'note3', text:'this is the text of note 3', done:true, timestamp:new Date().getTime(),},
    ]
  }

  // componentWillMount() {
  //   AsyncStorage.ge
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TextInput
            placeholder="Enter text"
            returnKeyType="done"
            value={this.state.value}
            onChangeText={this.textChanged}
            onSubmitEditing={this.submit}
            
          />
          <View style={styles.container}>
            {this.state.actions.map(({ timestamp, type, value }) => (
              <Text key={timestamp}>
                <Text style={{ fontWeight: 'bold' }}>{type}</Text>
                <Text>{JSON.stringify(value)}</Text>
              </Text>
            ))}
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
        {this.state.notes.map((note)=>(
          <View key={note.title} style={styles.item}>                      
              
              <Text>Note {note.title}</Text>
              <Text>{note.text}</Text>  
              <Text>Created:{note.timestamp}</Text>
              <Switch style={styles.item} value={note.done} 
                onValueChange={(value) => this.noteDoneChanged(value, note)}></Switch>

          </View>
        ))}
        </ScrollView>
        <Text>Shake de phone!</Text>
      </View>
    );
  }
  
  textChanged = text =>
    this.setState(state => ({
      value: text,
      actions: state.actions.concat({
        timestamp: new Date().getTime(),
        type: 'TEXT_CHANGED',
        value: text,
      }),
    }));

  submit = () =>
    this.setState(state => ({
      actions: state.actions.concat({
        timestamp: new Date().getTime(),
        type: 'TEXT_SUBMIT',
      }),
      notes: state.notes.concat({
        title:`note${state.notes.length + 1}`, 
        text:state.value, 
        done:false, 
        timestamp:new Date().getTime(),
      }),
    }));

  noteDoneChanged = (value, note) => {
    console.log(`noteDoneChanged:${note.title}, value:${value}`)
    const newNote = Object.assign({}, note, {done:value});
    
    this.setState(prevState => ({
      notes: prevState.notes.map(n => n.title === newNote.title ? newNote : n),    
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  item: {
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  content: {
    marginBottom: 10,
  }
});
