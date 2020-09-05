import React from 'react'
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View, 
} from 'react-native'

import Colors from '../constants/colors'

const DefaultButton = props => {

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
          <View style={styles.button}>
              <Text style={styles.buttonText}>{props.children}</Text>
          </View>
      </ TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius:25,
    overflow: 'hidden',
  },
  button: {
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
