import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

function Footer({ rounds }) {
  return (
    <View style={styles.footer}>
      <Text style={[styles.text, styles.roundCounter]}>
        {rounds.current}/{rounds.total}
      </Text>
      <Text style={[styles.text]}>Round</Text>
    </View>
  )
}

Footer.propTypes = {
  rounds: PropTypes.object.isRequired,
}

export default Footer
