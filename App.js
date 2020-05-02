import React from 'react'
import {
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'
import Constants from 'expo-constants'

import Header from './src/components/Header'
import Timer from './src/components/Timer'
import Footer from './src/components/Footer'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rounds: { current: 1, total: 4 } }
  }

  updateRoundCount(newValue = undefined) {
    const { rounds } = this.state
    const newState = { rounds: {} }

    if (!newValue) {
      newValue = rounds.current === rounds.total ? 0 : rounds.current + 1
    }

    newState.rounds.current = newValue
    newState.rounds.total = rounds.total

    this.setState((prevState) => ({ ...prevState, ...newState }))
  }

  render() {
    return (
      <View style={[styles.container, styles.fill]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.fill} contentContainerStyle={styles.fill}>
            <Header />
            <Timer
              rounds={this.state.rounds}
              updateRoundCount={(value = undefined) =>
                this.updateRoundCount(value)
              }
            />
            <Footer rounds={this.state.rounds} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FABE46',
    marginTop: Constants.statusBarHeight,
  },

  fill: {
    flex: 1,
  },
})
