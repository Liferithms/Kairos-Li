import React, { Component } from 'react';
import PropTypes from 'prop-type';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default class Forward extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity>
        <View style={StyleSheet.button}>
         <Icon 
          name="md-arrow-forward-outline"
          size={20}
          color="#ffff"
         />
        </View>
      </TouchableOpacity>
    );
  }
}


export default class Backward extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity>
        <View style={StyleSheet.button}>
         <Icon 
          name="md-arrow-back-outline"
          size={20}
          color="#ffff"
         />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    height: 70,
    width: 70,
    color: 'darkbrown',
    paddingHorizontal: 5,
    paddingvertical: 5,
  },
});