import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from './swiper'

export default class Onboarding extends Component { //screens.js
    componentDidMount() {
        StatusBar.setHidden(true);
    }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View>
        <Swiper>
            {/* first sscreen */}
            <View style={[styles.slide, {backgroundColor: '#ffff'}]}></View>
            {/* second */}
            <View style={[styles.slide, {backgroundColor: '#ffff'}]}></View>
            {/* Third */}
            <View style={[styles.slide, {backgroundColor: '#ffff'}]}></View>
            {/* Fourth */}
            <View style={[styles.slide, {backgroundColor: '#ffff'}]}></View>
            {/* Fifth */}
            <View style={[styles.slide, {backgroundColor: '#ffff'}]}></View>
        </Swiper>
        <View style={styles.below}>
            <Text> Already have an account? </Text>
            <TouchableOpacity>Log In</TouchableOpacity>
        </View>
        </View>
    );
  }
}

const iconStyles = {
    size: 100,
    color: '#0000',
}

const style = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontFamily: 'SFProDisplay',
        color: '#d2d2d2',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    text: {
        color: 'dimgrey',
        fontFamily: 'SFProDisplay',
        fontSize: 18,
        marginHorizontal: '40',
        textAlign: 'center',
    },
    below: {
        flex: 1,
        flexDirection: 'row',

    },
    
});