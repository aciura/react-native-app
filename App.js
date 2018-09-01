import React from 'react';
import { Text, View, StyleSheet, TextInput, Switch, ScrollView, AsyncStorage, Button } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';

const storageKey = 'cloudtech:notesApp';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    value: '',
    actions: [],
    notes: [ 
      {title:'note1', text:'text of note1', done:false, timestamp:new Date().getTime(),}, 
      {title:'note2', text:'text of note2. very interesting', done:false, timestamp:new Date().getTime()},
      {title:'note3', text:'this is the text of note 3', done:true, timestamp:new Date().getTime(),},
    ]
  }

  async componentWillMount() {
    let storage = JSON.parse(await AsyncStorage.getItem(storageKey));
    if (storage && storage.notes) { 
      this.setState({notes: storage.notes})
    }
  }

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
              <Button key={note.title}
                title={`Show note ${note.title}`}
                onPress={() => this.props.navigation.navigate('Note', note)}
              />

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
    }), 
    () => {
      AsyncStorage.setItem(storageKey, JSON.stringify(this.state));
    });    
  
  noteDoneChanged = (value, note) => {
    console.log(`noteDoneChanged:${note.title}, value:${value}`)
    const newNote = Object.assign({}, note, {done:value});
    
    this.setState(prevState => ({
      notes: prevState.notes.map(n => n.title === newNote.title ? newNote : n),    
    }));
  }
}

const NoteScreen = ({ navigation }) => (  
  <View>
    <Text>Note {navigation.state.params.id}</Text>
    <Text>Note {navigation.getParam('title', 'no title')}</Text>
    <Text>Text {navigation.getParam('text', 'no text')}</Text>
    <Text>Created: {navigation.getParam('timestamp', 'no time')}</Text>
    <Switch style={styles.item} value={navigation.getParam('done', false)} 
      // onValueChange={(value) => this.noteDoneChanged(value, note)}
    />

    <Button title="Go back" onPress={() => navigation.goBack()} />

  </View>
);
NoteScreen.navigationOptions = ({ navigation }) => ({title: `Item #${navigation.getParam('id')}`});

const Navigator = createStackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Note: {
      screen: NoteScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends React.Component {
  render() {
    return <Navigator />;
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
