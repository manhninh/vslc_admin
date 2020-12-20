import React, {Component} from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import * as AppValues from '../../AppValues';
import NewLeads from './NewLeads';
import Tasks from './Tasks';
import Reminders from './Reminders';
import Events from './Events';
import HeaderBar from '../../components/HeaderBar';

const TabScreen = createMaterialTopTabNavigator(
  {
    'New Leads': {screen: NewLeads},
    Tasks: {screen: Tasks},
    Reminders: {screen: Reminders},
    Events: {screen: Events},
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      tabStyle: {
        width: AppValues.WIDTH_DEVICE / 3.7,
      },
      scrollEnabled: true,
      activeTintColor: AppValues.COLOR_BG_WHITE,
      inactiveTintColor: AppValues.COLOR_BG_GREY,
      style: {
        backgroundColor: AppValues.COLOR_BG_DARK_GREY,
      },
      indicatorStyle: {
        borderBottomColor: AppValues.COLOR_BG_BLUE,
        borderBottomWidth: 2,
      },
      labelStyle: {
        textAlign: 'center',
        fontSize: AppValues.SIZE_TEXT_LABEL_SMALLER,
        fontFamily: 'NotoSans',
        fontWeight: '400',
      },
    },
  },
);
const TabContent = createAppContainer(TabScreen);

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <HeaderBar
          title="Activity"
          onPressSearch={() => navigation.navigate('Search')}
        />
        <TabContent />
      </View>
    );
  }
}

export default Activity;
