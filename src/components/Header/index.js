import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

import styles from './styles'

import pomodoroImage from '../../assets/pomodoro.png'

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>POMOTIMER</Text>
        <Image style={styles.image} source={pomodoroImage} />
      </View>
    )
  }
}

export default Header
