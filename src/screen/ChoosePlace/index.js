/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../../components/colors';
import styles from '../../components/style';
import TextView from '../../components/TextView';
import HeaderBar from '../../components/HeaderBar';
import {listAddressCustomer} from '../../redux/selectors';
import Screen, * as AppValues from '../../AppValues';
import Entypo from 'react-native-vector-icons/Entypo';
import Title from '../../components/Title';

class ChoosePlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  itemAddress(item) {
    const {address} = item;
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: Screen.width(3),
          marginTop: Screen.height(1),
        }}
        onPress={() => this.onChoose(item)}>
        <TextView type="bold">{address}</TextView>
      </TouchableOpacity>
    );
  }

  onChoose(item) {
    const {navigation} = this.props;
    navigation.goBack();
    navigation.state.params.onSelect(item);
  }

  render() {
    const {navigation, listAddressCustomer} = this.props;
    return (
      <View style={{flex: 1}}>
        <HeaderBar title="Chọn địa điểm" btnBack navigation={navigation} />
        <ScrollView style={{flex: 1, backgroundColor: Colors.WHITE}}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: Screen.width(2),
              paddingTop: Screen.height(2),
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('MapCustomer', {
                onSelect: item => this.onChoose(item),
              });
            }}>
            <Entypo name="map" size={20} color={Colors.primaryColor} />
            <TextView
              type="bold"
              style={{
                flex: 1,
                color: Colors.primaryColor,
                marginLeft: Screen.width(2),
              }}>
              Chọn địa điểm trên bản đồ
            </TextView>
            <Entypo
              name="chevron-right"
              size={20}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
          <Title
            style={{...styles.mt_15}}
            icon="map-marker-alt"
            text="ĐỊA CHỈ ĐÃ LƯU:"
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listAddressCustomer}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return this.itemAddress(item);
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listAddressCustomer: listAddressCustomer(state),
});
export default connect(
  mapStateToProps,
  {},
)(ChoosePlace);
