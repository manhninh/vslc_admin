import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../../components/TextView';
import HeaderBar from '../../components/HeaderBar';
import { connect } from 'react-redux';
import { NavigationReset } from '../../redux/actions/anotherActions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: AppValues.COLOR_BG_WHITE,
    padding: Screen.width(2),
  },
  viewBtnOut: {
    backgroundColor: AppValues.COLOR_BG_WHITE,
    marginVertical: Screen.width(5),
    padding: Screen.width(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnItem: {
    flexDirection: 'row',
    backgroundColor: AppValues.COLOR_BG_WHITE,
    padding: Screen.width(2),
    marginBottom: 2,
    alignItems: 'center',
  },
  viewIcon: {
    borderRadius: Screen.width(5),
    width: Screen.width(10),
    height: Screen.width(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentItemPhone: {
    flex: 1,
    marginLeft: Screen.width(2),
    justifyContent: 'center',
  },
  itemSetting: {
    flexDirection: 'row',
    backgroundColor: AppValues.COLOR_BG_WHITE,
    padding: Screen.width(2),
    marginBottom: 2,
    alignItems: 'center',
    flex: 1,
  },
  txtAvatar: {
    backgroundColor: '#d6dde3',
    borderRadius: Screen.width(8),
    width: Screen.width(15),
    height: Screen.width(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    marginLeft: Screen.width(2),
    justifyContent: 'center',
  },
});
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  itemViewPhone(colorIcon, nameIcon, title, content, enabled) {
    return (
      <TouchableOpacity style={styles.viewBtnItem}>
        <View style={[styles.viewIcon, { backgroundColor: colorIcon }]}>
          <MaterialCommunityIcons
            name={nameIcon}
            size={22}
            color={AppValues.COLOR_BG_WHITE}
          />
        </View>
        <View style={styles.contentItemPhone}>
          <TextView numberOfLines={1} type="bold">
            {title}
          </TextView>
          <TextView numberOfLines={1} style={{ marginLeft: Screen.width(1) }}>
            {content}
          </TextView>
        </View>
        <View>{enabled && <TextView>{enabled}</TextView>}</View>
      </TouchableOpacity>
    );
  }


  render() {
    const { NavigationReset } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: AppValues.COLOR_BACKGROUND_APP }}>
        <HeaderBar
          title="Tài khoản"
          onPressSearch={() => navigation.navigate('Search')}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.txtAvatar}>
              <TextView type="bold">VA</TextView>
            </View>
            <View style={styles.name}>
              <TextView numberOfLines={1} type="bold">
                Nguyễn Văn A
              </TextView>
              <TextView numberOfLines={1} style={{ marginLeft: Screen.width(1) }}>
                Kiểm duyệt
              </TextView>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => NavigationReset('SignIn')}
            style={styles.viewBtnOut}>
            <TextView>Đăng xuất</TextView>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  { NavigationReset },
)(Settings);
