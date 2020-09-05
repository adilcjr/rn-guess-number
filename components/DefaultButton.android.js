import React from 'react'
import { 
  Platform,
  StyleSheet,
  Text, 
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native'

import Colors from '../constants/colors'

const DefaultButton = props => {
  let ButtonComponent = TouchableOpacity

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
          <View style={styles.button}>
              <Text style={styles.buttonText}>{props.children}</Text>
          </View>
      </ButtonComponent>
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
