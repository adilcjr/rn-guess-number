import React, { useState, useRef, useEffect } from 'react'
import { 
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import DefaultButton from '../components/DefaultButton'
import DefaultText from '../components/DefaultText'
import Card from '../components/Card'

import Colors from '../constants/colors'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum
  }
}

const renderListItem = ( listLength, itemData) => (
  <View style={styles.listItem}>
    <DefaultText>#{listLength - itemData.index}</DefaultText>
    <DefaultText>{itemData.item}</DefaultText>
  </View>
)

const Game = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess])
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  )
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  )
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width)
      setAvailableDeviceHeight(Dimensions.get('window').height)
    }
    Dimensions.addEventListener('change', updateLayout)

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie', 'You know that this is wrong ;)', [
        { text: 'Sorry!', style: 'cancel' }
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess +1
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
  }

  let listContainerStyle = styles.listContainer

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig
  }
  
  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Card style={styles.guessContainer}>
          <Text>Opponent's Guess</Text>
          <View style={styles.controls}>
            <DefaultButton onPress={nextGuessHandler.bind(this, 'lower')} >
              <Ionicons name='md-remove' size={24} color='white' />
            </DefaultButton>
            <NumberContainer>{currentGuess}</NumberContainer>
            <DefaultButton onPress={nextGuessHandler.bind(this, 'greater')} >
              <Ionicons name='md-add' size={24} color='white' />
            </DefaultButton>
          </View>
        </Card>
        <View style={listContainerStyle}>
          {/* <ScrollView contentContainerStyle={styles.listContent}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView> */}
          <FlatList 
            keyExtractor={(item) => item} 
            data={pastGuesses} 
            renderItem={ renderListItem.bind(this, pastGuesses.length) }
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.guessContainer}>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
      </Card>
      <Card style={{...styles.buttonContainer, ...{marginTop: availableDeviceHeight > 600 ? 20 : 5,}}}>
        <DefaultButton onPress={nextGuessHandler.bind(this, 'lower')} >
          <Ionicons name='md-remove' size={24} color='white' />
        </DefaultButton>
        <DefaultButton onPress={nextGuessHandler.bind(this, 'greater')} >
          <Ionicons name='md-add' size={24} color='white' />
        </DefaultButton>
      </Card>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.listContent}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList 
          keyExtractor={(item) => item.toString()} 
          data={pastGuesses}
          renderItem={ renderListItem.bind(this, pastGuesses.length) }
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
  guessContainer: {
    alignItems: 'center',
    width: '90%',
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
    maxWidth: '90%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  listContainerBig: {
    flex: 1,
    width: '80%',
  },
  listContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  }
})

export default Game
