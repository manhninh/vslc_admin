/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';
import Colors from '../../components/colors';
import TextView from '../../components/TextView';
import ListStaff from './ListStaff';
import Calendar from './Calendar';
import Statistics from './Statistics';
import HeaderBar from '../../components/HeaderBar';
import {dataUser} from '../../redux/selectors';

const initialLayout = {width: Dimensions.get('window').width};

const NotifyScreen = props => {
  const role = props.dataUser.role === 'ROLE_STAFF';
  const [index, setIndex] = useState(0);

  const [routes] = useState(
    role
      ? [
          // {key: 'first', title: 'Danh sách'},
          {key: 'second', title: 'Lịch làm việc'},
        ]
      : [
          {key: 'first', title: 'Danh sách'},
          {key: 'second', title: 'Lịch làm việc'},
          {key: 'statis', title: 'Thống kê'},
        ],
  );

  const renderScene = SceneMap(
    role
      ? {
          // first: ListStaff,
          second: Calendar,
        }
      : {
          first: ListStaff,
          second: Calendar,
          statis: Statistics,
        },
  );

  return (
    <View style={{flex: 1}}>
      {console.log('props.dataUser.role', props.dataUser.role)}
      <HeaderBar title="Quản lý nhân viên" />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: Colors.primaryColor}}
            style={{
              backgroundColor: Colors.WHITE,
              // height: Dimensions.get('window').height / 12,
              height: 50,
              justifyContent: 'center',
            }}
            renderLabel={({route, focused}) => (
              <TextView
                type="bold"
                style={{
                  color: focused ? Colors.primaryColor : Colors.BACKDROP,
                }}>
                {route.title}
              </TextView>
            )}
          />
        )}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  dataUser: dataUser(state),
});
export default connect(
  mapStateToProps,
  {},
)(NotifyScreen);
