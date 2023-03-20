import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import db from '../config';

export default class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      oldTransactions: [],
      searchText: '',
      lastVisibleTransaction: null
    };
  }

  componentDidMount = async () => {
    this.getTransactions();
  };

  getTransactions = () => {
    db.collection('transactions')
      .limit(5)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            oldTransactions: [...this.state.oldTransactions, doc.data()],
            lastVisibleTransaction: doc
          });
        });
      });
  };

  handleSearch = async (text) => {
    var enterText = text.toUpperCase().split('');
    text = text.toUpperCase();

    this.setState({
      oldTransactions: [],
    });

    if (!text) {
      this.getTransactions();
    }

    if (enterText[0] == "B") {
      db.collection('transactions')
        .where('book_id', '==', text)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            this.setState({
              oldTransactions: [...this.state.oldTransactions, doc.data()],
              lastVisibleTransaction: doc,
            });
          });
        });
    } else if (enterText[0] == "S") {
      db.collection('transactions')
        .where('student_id', '==', text)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            this.setState({
              oldTransactions: [...this.state.oldTransactions, doc.data()],
              lastVisibleTransaction: doc,
            });
          });
        });
    }
  };

  renderItem = ({ item, i }) => {
    var date = item.date.toDate().toString().split('').splice(0, 4).join('');

    var transactionType =
      item.transaction_type === 'issue' ? 'issued' : 'returned';
    return (
      <View style={{ borderWidth: 1 }}>
        <ListItem key={i} bottomDivider>
          <Icon type={'antdesign'} name={'book'} size={40} />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>
              {`${item.book_name} ( ${item.book_id})`}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {`Este libro fue ${transactionType} por ${item.student_name}`}
            </ListItem.Subtitle>
            <View style={styles.lowerLeftContainer}>
              <View style={styles.transactionContainer}>
                <Text
                  style={[
                    styles.transactionText,
                    {
                      color:
                        item.transaction_type === 'issue' ? 'orange' : 'green',
                    },
                  ]}
                />
              </View>

              <Text style={styles.date}> {date} </Text>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

  render() {
    const { searchText, oldTransactions } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) =>
                this.setState({
                  searchText: text,
                })
              }
              placeholder={'Escribe aquí'}
              placeholderTextColor={'black'}
            />

            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => this.handleSearch(searchText)}>
              <Text style={styles.scanButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            data={oldTransactions}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5653D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Rajdhani_600SemiBold',
  },

  subtitle: {
    fontSize: 16,
    fontFamily: 'Rajdhani_600SemiBold',
  },
  lowerLeftContainer: {
    alignSelf: 'flex-end',
    marginTop: -40,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  transactionText: {
    fontSize: 20,
    fontFamily: 'Rajdhani_600SemiBold',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Rajdhani_600SemiBold',
    paddingTop: 5,
  },
  upperContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#9DFD24',
    borderColor: '#FFFFFF',
  },
  textInput: {
    width: '57%',
    height: 50,
    padding: 10,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: '#5653D4',
    color: '#FFFFFF',
  },
  scanButton: {
    width: 100,
    height: 50,
    backgroundColor: '#9DFD24',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonText: {
    fontSize: 24,
    color: '#0A0101',
  },
  lowerContainer: {
    flex: 0.8,
    backgroundColor: '#FFFFFF',
  },
});
