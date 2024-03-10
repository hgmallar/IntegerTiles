import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import TypingInput from './TypingInput';

import {connect} from 'react-redux';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const moreStyles = (correct) =>
  StyleSheet.create({
    answer: {
      fontSize: 30,
      color: correct ? '#39603d' : 'red',
      marginVertical: 10,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

class Equation extends Component {
  render() {
    const {firstNum, secondNum, thirdNum, position, sign} = this.props;
    return (
      <>
        {position === 1 && (
          <View style={styles.row}>
            <TypingInput keyType="numeric" maxLen={10} />
            <Text
              style={
                styles.content
              }>{` ${sign} ${secondNum} = ${thirdNum}`}</Text>
          </View>
        )}
        {position === 2 && (
          <View style={styles.row}>
            <Text style={styles.content}>{`${firstNum} ${sign} `}</Text>
            <TypingInput keyType="numeric" maxLen={10} />
            <Text style={styles.content}>{` = ${thirdNum}`}</Text>
          </View>
        )}
        {position === 3 && (
          <View style={styles.row}>
            <Text
              style={
                styles.content
              }>{`${firstNum} ${sign} ${secondNum} = `}</Text>
            <TypingInput keyType="numeric" maxLen={10} />
          </View>
        )}
        {this.props.nextVisible && (
          <Text
            style={
              moreStyles(this.props.correct).answer
            }>{` ${firstNum} ${sign} ${secondNum} = ${thirdNum}`}</Text>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  firstNum: state.equation.firstNum,
  secondNum: state.equation.secondNum,
  thirdNum: state.equation.thirdNum,
  position: state.equation.position,
  sign: state.equation.sign,
  correct: state.inputs.correct,
  nextVisible: state.inputs.nextVisible,
});

export default connect(mapStateToProps)(Equation);
