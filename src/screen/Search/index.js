import React, {Component} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextView from '../../components/TextView';
import Screen, * as AppValues from '../../AppValues';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 7 : AppValues.IS_PHONE_X ? 37 : 20,
    paddingHorizontal: Screen.width(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 7 : 2,
    backgroundColor: AppValues.COLOR_BG_DARK_GREY,
  },
  viewInput: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: AppValues.BORDER_RADIUS_10PX,
    marginTop: AppValues.WIDTH_MARGIN_TOP,
    backgroundColor: '#233038',
  },
  wrapInput: {
    flex: 1,
    color: AppValues.COLOR_BG_WHITE,
    fontSize: AppValues.SIZE_TEXT_PRIMARY,
    fontFamily: AppValues.FONT_TEXT_INPUT,
    marginLeft: Screen.width(4),
    paddingVertical:
      Platform.OS === 'android' ? Screen.width(1.5) : Screen.width(3),
  },
  itemBtnList: {
    flexDirection: 'row',
    backgroundColor: AppValues.COLOR_BG_WHITE,
    padding: Screen.width(3),
    borderBottomColor: AppValues.COLOR_BACKGROUND_APP,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  viewAvatar: {
    backgroundColor: '#d6dde3',
    borderRadius: Screen.width(6),
    width: Screen.width(12),
    height: Screen.width(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: undefined,
    };
  }

  viewItem() {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.itemBtnList}>
        <View style={styles.viewAvatar}>
          <TextView type="bold">FU</TextView>
        </View>
        <TextView
          style={{
            flex: 1,
            marginLeft: Screen.width(2),
            justifyContent: 'center',
          }}
          numberOfLines={1}>
          Follow Up Boss
        </TextView>
        <MaterialCommunityIcons name="chevron-right" size={30} />
      </TouchableOpacity>
    );
  }

  render() {
    const {navigation} = this.props;
    const {textSearch} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="Search people"
              placeholderTextColor="#a8a8a8"
              style={styles.wrapInput}
              returnKeyType="done"
              value={textSearch}
              onChangeText={txt => this.setState({textSearch: txt})}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <TextView
              style={{
                marginLeft: Screen.width(2),
                color: AppValues.COLOR_BG_WHITE,
              }}>
              Cancel
            </TextView>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.viewItem()}
          {this.viewItem()}
          {this.viewItem()}
        </ScrollView>
      </View>
    );
  }
}

export default Search;
