import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Screen, * as AppValues from '../../../AppValues';
import TextView from '../../../components/TextView';
import {connect} from 'react-redux';
import {NavigationRouter} from '../../../redux/actions/anotherActions';
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {NavigationRouter} = this.props;
    return (
      <ScrollView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => NavigationRouter('Information')}
          style={{
            flexDirection: 'row',
            backgroundColor: AppValues.COLOR_BG_WHITE,
            padding: Screen.width(3),
          }}>
          <View
            style={{
              backgroundColor: '#d6dde3',
              borderRadius: Screen.width(6),
              width: Screen.width(12),
              height: Screen.width(12),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextView type="bold">FU</TextView>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: Screen.width(2),
              justifyContent: 'center',
            }}>
            <TextView numberOfLines={1} type="bold">
              Follow Up Boss
            </TextView>
            <TextView numberOfLines={1} style={{marginLeft: Screen.width(1)}}>
              via Referral
            </TextView>
          </View>
          <TextView>14h</TextView>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps, {NavigationRouter})(Events);
