import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  state = {
    notes: [ 
      {title:'note1', text:'text of note1'}, 
      {title:'note2', text:'text of note2. very interesting'},
      
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>&nbsp;</Text>
        <Text>Note</Text>
        <Text>Shake phone!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
