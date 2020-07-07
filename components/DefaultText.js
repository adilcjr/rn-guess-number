import React from 'react'
import {Text, StyleSheet} from 'react-native';

const DefaultText = props => <Text style={styles.default}>{props.children}</Text>

const styles = StyleSheet.create({
  default: {
    fontFamily: 'open-sans'
  }
})

export default DefaultText
