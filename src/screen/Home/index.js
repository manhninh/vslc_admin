/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Screen, * as AppValues from '../../AppValues';
import HistoryScreen from '../History';
import TextView from '../../components/TextView';
import NewsFeed from '../NewsFeed';
import AddService from '../AddService';
import Staff from '../Staff';
import NotifyScreen from '../Notification/NotifyScreen';
import Customer from '../Customer';
import ListService from '../ListService';

const ROUTE_NAME = {
  LIST_SERVICE: 'ListService',
  ADD_SERVICE: 'AddService',
  CUSTOMER: 'Customer',
  STAFF: 'Staff',
  NOTIFY: 'NotifyScreen',
};

const TabNavigator = createBottomTabNavigator(
  {
    ListService: {screen: ListService},
    AddService: {screen: AddService},
    Staff: {screen: Staff},
    Customer: {screen: Customer},
    NotifyScreen: {screen: NotifyScreen},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        let label;
        switch (routeName) {
          case ROUTE_NAME.LIST_SERVICE:
            label = 'Phiếu DV';
            iconName = 'list-ul';
            // Sometimes we want to add badges to some icons.
            // You can check the implementation below
            // IconComponent = HomeIconWithBadge;
            break;
          case ROUTE_NAME.ADD_SERVICE:
            label = 'Thêm DV';
            iconName = 'edit';
            break;
          case ROUTE_NAME.STAFF:
            label = 'Nhân viên';
            iconName = 'users';
            break;
          case ROUTE_NAME.NOTIFY:
            label = 'Thông báo';
            iconName = 'bell-o';
            break;
          case ROUTE_NAME.CUSTOMER:
            label = 'Qlkh';
            iconName = 'handshake-o';
            break;
          default:
            break;
        }

        // You can return any component that you like here!
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconComponent name={iconName} size={25} color={tintColor} />
            <TextView
              style={{
                textAlign: 'center',
                color: tintColor,
                fontSize: AppValues.SIZE_TEXT_LABEL_SMALLER,
              }}>
              {label}
            </TextView>
          </View>
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: AppValues.primaryColor,
      inactiveTintColor: AppValues.COLOR_BG_GREY,
      showLabel: false,
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    lazy: true,
  },
);

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(TabNavigator);
