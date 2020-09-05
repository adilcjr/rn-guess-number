import React, { useState, useEffect} from 'react'
import { 
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import DefaultText from '../components/DefaultText'
import DefaultButton from '../components/DefaultButton'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'

const GameOver = props => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  )
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  )

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


  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The game is over!</TitleText>
        <View style={{...styles.imageContainer, ...{
          borderRadius: availableDeviceHeight * 0.5 / 2,
          height: availableDeviceHeight * 0.5,
          marginVertical: availableDeviceHeight / 30,
          width: availableDeviceHeight * 0.5,
        }}} >
          <Image 
            source={require('../assets/success.png')}
            //source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_1280.jpg'}}
            style={styles.image}
            resizeMode='cover'
          />
        </View>
        <View style={{...styles.resultContainer, ...{
          marginVertical: availableDeviceHeight / 60,
        }}}>
          <DefaultText style={{...styles.resultText, ...{
            fontSize: availableDeviceHeight < 400 ? 16 : 20,
          }}}>Your phone needed
            <Text style={styles.highlight}> {props.roundsNumber} </Text> 
            rounds to guess the number 
            <Text style={styles.highlight}> {props.userNumber}</Text>.
          </DefaultText>
        </View>
        <DefaultButton onPress={props.onRestart}>
          New Game
        </DefaultButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    borderColor: 'black',
    borderWidth: 3,
    overflow: 'hidden',
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
  },
  resultText: {
    textAlign: 'center',
  }
})

export default GameOver