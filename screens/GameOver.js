import React from 'react'
import { StyleSheet, View, Text, Button, Image } from 'react-native'

import DefaultText from '../components/DefaultText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over!</TitleText>
      <View style={styles.imageContainer} >
        <Image 
          source={require('../assets/success.png')}
          //source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_1280.jpg'}}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <View style={styles.resultContainer}>
        <DefaultText style={styles.resultText}>Your phone needed
          <Text style={styles.highlight}> {props.roundsNumber} </Text> 
          rounds to guess the number 
          <Text style={styles.highlight}> {props.userNumber}</Text>.
        </DefaultText>
      </View>
      <Button title='New game' onPress={props.onRestart}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderColor: 'black',
    borderRadius: 150,
    borderWidth: 3,
    height: 300,
    marginVertical: 30,
    overflow: 'hidden',
    width: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  }

})

export default GameOver