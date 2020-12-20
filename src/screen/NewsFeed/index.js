/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, AppState, Dimensions, FlatList} from 'react-native';
import {Avatar} from 'react-native-elements';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../../components/TextView';
import {connect} from 'react-redux';
import {NavigationRouter} from '../../redux/actions/anotherActions';
import {listCategoryApiSubmit} from '../../redux/actions/categoryActions';
import {listCategory, dataUser} from '../../redux/selectors';
import styles from '../../components/style';
import ServiceItem from '../../components/ServiceItem/ServiceItem';
import {formatDaySession} from '../../helpers/formatValue';
import {URL_IMAGE} from '../../utils/configApp';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daySession: formatDaySession(),
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    const {listCategoryApiSubmit} = this.props;
    listCategoryApiSubmit();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    const {appState} = this.state;
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.setState({daySession: formatDaySession()});
      console.warn('davaoday');
    }
    this.setState({appState: nextAppState});
  };

  renderItem(item) {
    const {width} = Dimensions.get('window');
    const {navigation} = this.props;
    const {armorial, image, name, note} = item;
    return (
      <View
        style={{
          width: (width - 20) / 3,
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <View style={{height: 120, width: 120}}>
          <ServiceItem
            title={name}
            badge={armorial ? armorial : ''}
            img={{uri: URL_IMAGE + image}}
            onPress={() => {
              navigation.navigate('CreateOrder', {
                service: item,
              });
            }}
          />
        </View>
        <View>
          <TextView
            type="bold"
            style={{
              ...styles.center_txt,
              color: AppValues.primaryColor,
              marginTop: 2,
            }}>
            {name}
          </TextView>
          <TextView
            style={{
              ...styles.center_txt,
              fontSize: AppValues.SIZE_TEXT_LABEL_SMALLER,
            }}>
            {note}
          </TextView>
        </View>
      </View>
    );
  }

  render() {
    const {NavigationRouter, dataUser, listCategory} = this.props;
    const {daySession} = this.state;
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: '10%',
            minHeight: 80,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: AppValues.primaryColor,
          }}>
          <Avatar
            size={60}
            rounded
            source={require('../../image/avatar.png')}
            containerStyle={{
              borderWidth: 2,
              borderColor: '#ffffff',
              margin: 10,
            }}
            onPress={() => {
              NavigationRouter('UserProfile');
            }}
          />
          <TextView type="bold" style={{color: AppValues.COLOR_BG_WHITE}}>
            {`Chào buổi ${daySession}, ${dataUser.username}!`}
          </TextView>
        </View>
        <FlatList
          data={listCategory}
          keyExtractor={(item, index) => index.toString()}
          style={{marginHorizontal: 10}}
          renderItem={({item}) => this.renderItem(item)}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  listCategory: listCategory(state),
  dataUser: dataUser(state),
});
export default connect(
  mapStateToProps,
  {NavigationRouter, listCategoryApiSubmit},
)(NewsFeed);
