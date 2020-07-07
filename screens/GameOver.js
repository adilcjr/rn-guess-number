import React from 'react'
import { StyleSheet, View, Text, Button, Image } from 'react-native'

import DefaultText from '../components/DefaultText'
import TitleText from '../components/TitleText'

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over!</TitleText>
      <View style={styles.imageContainer} >
        <Image 
          // source={require('../assets/success.png')}
          source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_1280.jpg'}}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <DefaultText>Number of round: { props.roundsNumber }</DefaultText>
      <DefaultText>User number: { props.userNumber }</DefaultText>
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
    overflow: 'hidden',
    width: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  }
})

export default GameOver