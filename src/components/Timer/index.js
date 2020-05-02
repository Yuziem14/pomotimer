import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'

import { formatMinutes, formatSeconds, vibrate } from '../../utils'
import styles from './styles'

import pauseIcon from '../../assets/pause_icon.png'
import playIcon from '../../assets/play_icon.png'

const INITIAL_TIMES = {
  FOCUS_TIME: 25 * 60,
  BREAK_TIME: 5 * 60,
  LONG_BREAK_TIME: 15 * 60,
}

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: INITIAL_TIMES.FOCUS_TIME,
      focusTime: INITIAL_TIMES.FOCUS_TIME,
      breakTime: INITIAL_TIMES.BREAK_TIME,
      isPaused: true,
      isBreakTime: false,
    }
  }

  static propTypes = {
    rounds: PropTypes.object.isRequired,
    updateRoundCount: PropTypes.func.isRequired,
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        ...prevState,
        currentTime: prevState.currentTime - 1,
      }))
    }, 1000)
  }

  handlePausePress() {
    this.setState(
      (prevState) => ({
        ...prevState,
        isPaused: !prevState.isPaused,
      }),
      () => {
        if (!this.state.isPaused) {
          this.startTimer()
        } else {
          clearInterval(this.interval)
        }
      }
    )
  }

  handleInputChange(name, input) {
    const { updateRoundCount } = this.props
    const defaultTime =
      name === 'focusTime' ? INITIAL_TIMES.FOCUS_TIME : INITIAL_TIMES.BREAK_TIME

    const numericInput = input.replace(/[^0-9]/g, '')
    input = !numericInput ? defaultTime / 60 : numericInput

    const newTime = Math.abs(input * 1) * 60

    if (newTime === 0) return

    clearInterval(this.interval)
    this.setState(
      (prevState) => ({
        ...prevState,
        [name]: newTime,
        currentTime: name === 'focusTime' ? newTime : prevState.focusTime,
        isPaused: true,
        isBreakTime: false,
      }),
      () => {
        updateRoundCount(1)
      }
    )
  }

  onTimeOver() {
    const { focusTime, breakTime, isBreakTime } = this.state
    const { rounds, updateRoundCount } = this.props

    const newState = {}

    newState.isBreakTime = !isBreakTime

    if (rounds.current === rounds.total) {
      newState.currentTime = INITIAL_TIMES.LONG_BREAK_TIME
    } else {
      newState.currentTime = newState.isBreakTime ? breakTime : focusTime
    }

    if (rounds.current === 0) newState.isPaused = true

    this.setState(
      (prevState) => ({ ...prevState, ...newState }),
      () => {
        if (!newState.isBreakTime) {
          updateRoundCount()
        }

        if (newState.isBreakTime && rounds.current === rounds.total) {
          updateRoundCount()
        }

        if (rounds.current === 0) {
          updateRoundCount()
          clearInterval(this.interval)
        }
      }
    )
  }

  shouldComponentUpdate() {
    const { currentTime } = this.state

    if (currentTime === 0) {
      vibrate()
      setTimeout(() => {
        this.onTimeOver()
      }, 100)
    }

    return currentTime > 0
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <View>
        <View style={styles.timerContainer}>
          <Text style={[styles.text, styles.counterBox]}>
            {formatMinutes(this.state.currentTime)}
          </Text>
          <Text style={[styles.text]}>:</Text>
          <Text style={[styles.text, styles.counterBox]}>
            {formatSeconds(this.state.currentTime)}
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            placeholder="Minutes/Round"
            style={styles.timeInput}
            keyboardType="numeric"
            onChangeText={(text) => this.handleInputChange('focusTime', text)}
          />
          <TextInput
            placeholder="Minutes/Break"
            style={styles.timeInput}
            keyboardType="numeric"
            onChangeText={(text) => this.handleInputChange('breakTime', text)}
          />
          <TouchableOpacity
            style={styles.timerButton}
            activeOpacity={0.5}
            onPress={() => this.handlePausePress()}
          >
            <Image source={this.state.isPaused ? playIcon : pauseIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Timer
