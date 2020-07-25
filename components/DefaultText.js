import React from 'react'
import {Text} from 'react-native';

import styles from '../constants/defaultStyles'

const DefaultText = props => <Text style={{...styles.defaultText, ...props.style}}>{props.children}</Text>

export default DefaultText
