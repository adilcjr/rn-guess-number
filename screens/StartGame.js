import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert 
} from 'react-native'

import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import Colors from '../constants/colors'
import DefaultText from '../components/DefaultText'
import DefaultButton from '../components/DefaultButton'
import TitleText from '../components/TitleText'

const StartGame = props => {

  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'It has to be a number between 1 and 99.', 
      [{text: 'Ok', style: 'destructive', onPress: resetInputHandler}])
      return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
    Keyboard.dismiss();
  }

  let confirmedOutput 

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <DefaultButton onPress={ () => props.onStartGame(selectedNumber) }>
          Let me guess!
        </DefaultButton>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a new Game!</TitleText>
        <Card style={styles.inputContainer}>
          <DefaultText>Select a number</DefaultText>
          <Input 
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <DefaultButton 
              style={styles.button}
              onPress={ resetInputHandler }
              color={Colors.secundary}
            >
              Reset
            </DefaultButton>
            <DefaultButton 
              style={styles.button}
              onPress={ confirmInputHandler}
              color={Colors.primary}
            >
              Confirm
            </DefaultButton>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
  title: {
    fontSize: 20,
    marginVertical: 25,
  },
  inputContainer: {
    alignItems: 'center',
    maxWidth: '80%',
    width: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 120,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  }
})

export default StartGame