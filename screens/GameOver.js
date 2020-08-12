import React from 'react'
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
  return (
    <ScrollView>
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
  },
  imageContainer: {
    borderColor: 'black',
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    height: Dimensions.get('window').width * 0.7,
    marginVertical: Dimensions.get('window').height / 30,
    overflow: 'hidden',
    width: Dimensions.get('window').width * 0.7,
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
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  }
})

export default GameOver