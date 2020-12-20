/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import TextView from '../../components/TextView';
import Colors from '../../components/colors';
import Layouts from '../../components/layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBar from '../../components/HeaderBar';
import {listFavatiteStaff, customers} from '../../redux/selectors';
import {removeFavatiteStaffApiSubmit} from '../../redux/actions/serviceActions';
import Screen, * as AppValues from '../../AppValues';
import {URL_IMAGE} from '../../utils/configApp';
import Button from '../../components/Button';

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  containerView(title, content) {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextView style={{flex: 1}}>{title}</TextView>
        <TextView style={{flex: 1, marginLeft: Screen.width(1)}}>
          {content}
        </TextView>
      </View>
    );
  }

  itemView(item) {
    const {name, code, phone, image, id} = item;
    const {removeFavatiteStaffApiSubmit, customers} = this.props;
    return (
      <View style={mStyles.containerItem}>
        <Image
          style={{
            width: Screen.width(20),
            height: Screen.width(20),
            borderRadius: Screen.width(10),
            marginRight: Screen.width(2),
          }}
          source={{uri: URL_IMAGE + image}}
        />
        <View style={{flex: 1}}>
          <TextView type="bold" style={{textAlign: 'center'}}>
            {name}
          </TextView>
          {this.containerView('Mã nhân viên:', code)}
          {this.containerView('Số điện thoại:', phone)}
          <View
            style={{
              marginHorizontal: Screen.width(5),
              marginTop: Screen.height(1),
            }}>
            <Button
              textButton="Xóa NV yêu thích"
              backgroundColor={Colors.GREEN}
              onPress={() => removeFavatiteStaffApiSubmit(customers.id, id)}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {listFavatiteStaff} = this.props;
    return (
      <View style={{flex: 1}}>
        <HeaderBar title="NV Yêu thích" />
        {listFavatiteStaff.length === 0 ? (
          <View style={mStyles.container}>
            <Icon
              name="heartbeat"
              size={Layouts.screen.width / 3}
              color={Colors.primaryColor}
            />
            <TextView>Hiện tại không có nhân viên yêu thích nào</TextView>
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={listFavatiteStaff}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return this.itemView(item);
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const mStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Screen.width(2),
    padding: Screen.width(2),
    marginTop: Screen.height(1),
    borderRadius: 10,
    borderColor: AppValues.COLOR_BG_GREY,
    borderWidth: 0.5,
  },
  status: {
    padding: 3,
    borderRadius: 3,
    marginRight: Screen.height(1),
  },
});

const mapStateToProps = state => ({
  listFavatiteStaff: listFavatiteStaff(state),
  customers: customers(state),
});
export default connect(
  mapStateToProps,
  {removeFavatiteStaffApiSubmit},
)(Favorite);
