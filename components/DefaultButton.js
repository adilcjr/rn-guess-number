import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors'

const DefaultButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: Colors.buttonText,
    fontFamily: 'open-sans',
  }
})

export default DefaultButton
