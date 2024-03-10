import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as inputsActions from './../actions/inputs';

const styles = (placeholder, correct) =>
  StyleSheet.create({
    letterInput: {
      height: 44,
      borderColor: '#39603d',
      color: '#39603d',
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor:
        placeholder === '' ? '#daded4' : correct ? '#a3bcb6' : 'red',
      fontWeight: placeholder === '' ? 'normal' : 'bold',
      fontSize: 30,
      marginRight: 10,
      paddingHorizontal: 5,
      minWidth: 100,
      textAlignVertical: 'center',
      paddingVertical: 5,
    },
  });

class TypingInput extends Component {
  onFocus = () => {
    const {inputsActions} = this.props;
    inputsActions.updateText('');
  };

  onSubmitEditing = ({nativeEvent: {text}}) => {
    const {inputsActions} = this.props;
    let numberInput = text;
    const {firstNum, secondNum, thirdNum, position} = this.props;
    const {nextVisible, score} = this.props;
    let newScore = score;
    let correct = false;

    if (!nextVisible) {
      if (position === 1 && parseInt(numberInput) === parseInt(firstNum)) {
        correct = true;
        newScore = newScore + 1;
      } else if (
        position === 2 &&
        parseInt(numberInput) === parseInt(secondNum)
      ) {
        correct = true;
        newScore = newScore + 1;
      } else if (
        position === 3 &&
        parseInt(numberInput) === parseInt(thirdNum)
      ) {
        correct = true;
        newScore = newScore + 1;
      }
      inputsActions.updateText(numberInput);
      inputsActions.submitInput(true, correct, newScore, true);
    }
  };

  render() {
    const {inputsActions} = this.props;

    return (
      <View>
        <TextInput
          style={styles(this.props.numInput, this.props.correct).letterInput}
          editable={!this.props.inputDisabled}
          placeholder={this.props.numInput}
          maxLength={this.props.maxLen}
          keyboardType={this.props.keyType}
          textAlign="center"
          textContentType="name"
          placeholderTextColor="#39603d"
          autoCapitalize="none"
          clearTextOnFocus={true}
          blurOnSubmit={true}
          numberOfLines={100}
          onEndEditing={(evt) => {
            this.onSubmitEditing(evt);
          }}
          onSubmitEditing={(evt) => {
            this.onSubmitEditing(evt);
          }}
          onFocus={() => {
            this.onFocus();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  numInput: state.inputs.numInput,
  nextVisible: state.inputs.nextVisible,
  correct: state.inputs.correct,
  score: state.inputs.score,
  inputDisabled: state.inputs.inputDisabled,
  firstNum: state.equation.firstNum,
  secondNum: state.equation.secondNum,
  thirdNum: state.equation.thirdNum,
  position: state.equation.position,
});

const InputsActionCreators = Object.assign({}, inputsActions);
const mapDispatchToProps = (dispatch) => ({
  inputsActions: bindActionCreators(InputsActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypingInput);
