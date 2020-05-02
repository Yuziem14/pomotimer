import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 30,
  },

  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#333',
  },

  counterBox: {
    color: '#ff4444',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 30,
    marginHorizontal: 20,
  },

  inputsContainer: {
    alignItems: 'center',
  },

  timerButton: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30,
  },

  timeInput: {
    alignSelf: 'stretch',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#ff4444',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 30,
  },
})

export default styles
