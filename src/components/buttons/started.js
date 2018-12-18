import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Button extends Component {
  

  render({onPress} = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
           <Text style={styles.text}>{this.props.text}</Text>
          </View>
      </TouchableOpacity>
    );
  }
}

const styles=StyleSheet.create({
    button: {
        borderRadius: 20,
        color: 'grey',
        paddingHorizontal: 50,
        paddingVertical: 10,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'SFProDisplay',
    },
});

export default Button;
