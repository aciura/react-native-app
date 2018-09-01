import React from 'react';
import { Text, View, StyleSheet, TextInput, Switch, ScrollView } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {
    notes: [ 
      {title:'note1', text:'text of note1', done:false, timestamp:Date.now(),}, 
      {title:'note2', text:'text of note2. very interesting', done:false, timestamp:Date.now()},
      {title:'note3', text:'this is the text of note 3', done:true, timestamp:Date.now(),},
    ]
  }

  render() {
    return (
      <View style={styles.container}>
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
