import React from 'react'
import {Text} from 'react-native';

import styles from '../constants/defaultStyles'

const TitleText = props => (
  <Text style={{...styles.titleText, ...props.style}}>
    {props.children}
  </Text>
)

export default TitleText
