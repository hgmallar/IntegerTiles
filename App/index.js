/**
 * Integer Tiles
 *
 */

import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Header, Button, CheckBox } from 'react-native-elements';
import { Table, Cell, TableWrapper } from 'react-native-table-component';

import Equation from './components/Equation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signsActions from './actions/signs';
import * as equationActions from './actions/equation';
import * as inputsActions from './actions/inputs';

const windowWidth = Dimensions.get('window').width;
const numberOfColumns = 10;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#daded4',
    color: '#3c403d',
  },
  headerContainer: {
    backgroundColor: '#daded4',
    color: '#3c403d',
    borderBottomColor: '#daded4',
    paddingVertical: 0,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3c403d',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#a3bcb6',
  },
  btn: {
    width: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: '#39603d',
    paddingVertical: 0,
  },
  submitTxt: {
    color: '#daded4',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  directions: {
    color: '#3c403d',
    fontSize: 18,
    textAlign: 'center',
  },
  options: {
    color: '#3c403d',
    fontWeight: 'bold',
    fontSize: 20,
  },
  checkboxes: {
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: '#daded4',
    borderColor: '#daded4',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: {
    color: '#3c403d',
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 5,
  },
  scoreBtn: {
    width: 105,
    marginRight: 5,
    marginBottom: 5,
  },
  scoreBckgd: {
    backgroundColor: '#a3bcb6',
    paddingVertical: 0,
  },
  scoreTxt: {
    color: '#daded4',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#3c403d',
  },
  tableContainer: {
    marginBottom: 5,
  },
  adContainer: {
    marginHorizontal: 'auto',
  },
});

const moreStyles = (text) =>
  StyleSheet.create({
    head: {
      width: windowWidth / numberOfColumns,
      height: windowWidth / numberOfColumns,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#3c403d',
      backgroundColor:
        text === '' ? '#daded4' : text === '\u002b' ? 'black' : 'red',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: text === '' ? '#3c403d' : '#fff',
      textAlign: 'center',
    },
  });

class App extends Component {
  state = {
    dataTable: [
      ['', '\u002b', '', '', '', '', '', '', '', ''],
      ['', '\u2212', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ],
  };

  componentDidMount() {
    this.createNewProblem();
  }

  updateSign = async (sign) => {
    const { signs, signsActions } = this.props;
    if (signs.indexOf(sign) > -1 && signs.length > 1) {
      await signsActions.deleteSigns(sign);
      if (sign === this.props.sign) {
        this.createNewProblem();
      }
    } else if (signs.indexOf(sign) <= -1) {
      signsActions.addSigns(sign);
    }
  };

  createNewProblem = () => {
    const { equationActions } = this.props;
    const { inputsActions } = this.props;
    const { signs } = this.props;
    let newFirstNum = Math.floor(Math.random() * 21) - 10;
    let newSecondNum = Math.floor(Math.random() * 21) - 10;
    const newSign = signs[Math.floor(Math.random() * signs.length)];
    //remove divide by 0.
    if (newSign === '\u00f7' && newSecondNum === 0) {
      while (newSecondNum === 0) {
        newSecondNum = Math.floor(Math.random() * 21) - 10;
      }
    }
    let newThirdNum = newFirstNum * newSecondNum;
    if (newSign === '\u002b') {
      newThirdNum = newFirstNum + newSecondNum;
    } else if (newSign === '\u2212') {
      newThirdNum = newFirstNum - newSecondNum;
    } else if (newSign === '\u00f7') {
      newFirstNum = newThirdNum;
      newThirdNum = newFirstNum / newSecondNum;
    }
    let newPosition = Math.floor(Math.random() * 3) + 1;
    //check position on multiply by 0
    if (newPosition === 1 && newSecondNum === 0) {
      while (newPosition === 1) {
        newPosition = Math.floor(Math.random() * 3) + 1;
      }
    } else if (newPosition === 2 && newFirstNum === 0) {
      while (newPosition === 2) {
        newPosition = Math.floor(Math.random() * 3) + 1;
      }
    }
    equationActions.newEquation(
      newFirstNum,
      newSecondNum,
      newThirdNum,
      newPosition,
      newSign,
    );
    inputsActions.resetEquation(false, false, '');
  };

  onTileClicked = (row, col) => {
    let newData = this.state.dataTable;
    if (newData[row][col] === '') {
      newData[row][col] = '\u002b';
    } else if (newData[row][col] === '\u002b') {
      newData[row][col] = '\u2212';
    } else {
      newData[row][col] = '';
    }
    this.setState({ dataTable: newData });
  };

  resetDataTable = () => {
    this.setState({
      dataTable: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
      ],
    });
  };

  render() {
    const element = (data, row, col) => (
      <TouchableOpacity onPress={() => this.onTileClicked(row, col)}>
        <View style={moreStyles(data).head}>
          <Text style={moreStyles(data).text}>{data}</Text>
        </View>
      </TouchableOpacity>
    );

    const { inputsActions } = this.props;

    return (
      <SafeAreaProvider style={styles.container}>
        <ScrollView>
          <Header
            placement="center"
            containerStyle={styles.headerContainer}
            leftContainerStyle={{ flex: 1 }}
            centerContainerStyle={{ flex: 6 }}
            rightContainerStyle={{ flex: 1 }}
            centerComponent={{ text: 'Integer Tiles', style: styles.header }}
          />
          <View style={styles.row}>
            {['\u002b', '\u2212', '\u00d7', '\u00f7'].map((data, index) => (
              <CheckBox
                key={index}
                checkedColor="#39603d"
                uncheckedColor="#3c043d"
                checked={this.props.signs.indexOf(data) > -1}
                onPress={() => this.updateSign(data)}
                containerStyle={styles.checkboxes}
                title={data}
                textStyle={styles.options}
              />
            ))}
          </View>
          <Text style={styles.score}>
            Complete the equation by filling in the box.
          </Text>
          <Equation />
          {this.props.nextVisible && (
            <Button
              raised
              title="NEXT"
              containerStyle={styles.btn}
              buttonStyle={styles.submitBtn}
              titleStyle={styles.submitTxt}
              onPress={() => {
                this.createNewProblem();
              }}
            />
          )}
          <View style={styles.scoreRow}>
            <Text style={styles.score}>Score: {this.props.score}</Text>
            <View style={styles.row}>
              <Button
                raised
                title="Reset Score"
                containerStyle={styles.scoreBtn}
                buttonStyle={styles.scoreBckgd}
                titleStyle={styles.scoreTxt}
                onPress={() => {
                  inputsActions.resetEquation(false, false, '');
                  inputsActions.resetScore(0);
                }}
              />
              <Button
                raised
                title="Reset Tiles"
                containerStyle={styles.scoreBtn}
                buttonStyle={styles.scoreBckgd}
                titleStyle={styles.scoreTxt}
                onPress={() => {
                  this.resetDataTable();
                }}
              />
            </View>
          </View>
          <Text style={styles.directions}>
            Use the integer tiles to help you solve the equation. Touch the
            tiles to flip them.
          </Text>
          <View>
            <Table style={styles.tableContainer}>
              {this.state.dataTable.map((rowData, rowIndex) => (
                <TableWrapper key={rowIndex} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={element(cellData, rowIndex, cellIndex)}
                    />
                  ))}
                </TableWrapper>
              ))}
            </Table>
          </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  signs: state.signs,
  firstNum: state.equation.firstNum,
  secondNum: state.equation.secondNum,
  thirdNum: state.equation.thirdNum,
  position: state.equation.position,
  sign: state.equation.sign,
  numInput: state.inputs.numInput,
  nextVisible: state.inputs.nextVisible,
  score: state.inputs.score,
  inputDisabled: state.inputs.inputDisabled,
});

const SignsActionCreators = Object.assign({}, signsActions);
const EquationActionCreators = Object.assign({}, equationActions);
const InputsActionCreators = Object.assign({}, inputsActions);
const mapDispatchToProps = (dispatch) => ({
  signsActions: bindActionCreators(SignsActionCreators, dispatch),
  equationActions: bindActionCreators(EquationActionCreators, dispatch),
  inputsActions: bindActionCreators(InputsActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
