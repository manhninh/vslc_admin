/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../../components/TextView';
import {connect} from 'react-redux';
import {NavigationRouter} from '../../redux/actions/anotherActions';
import {listCategoryApiSubmit} from '../../redux/actions/categoryActions';
import {listCategory, dataUser} from '../../redux/selectors';
import styles from '../../components/style';
import ServiceItem from '../../components/ServiceItem/ServiceItem';
import {URL_IMAGE} from '../../utils/configApp';
import HeaderBar from '../../components/HeaderBar';

class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {listCategoryApiSubmit} = this.props;
    listCategoryApiSubmit();
  }

  renderItem(item) {
    const {width} = Dimensions.get('window');
    const {navigation} = this.props;
    const {armorial, image, name, note} = item;
    return (
      <View
        style={{
          width: (width - 20) / 3,
          alignItems: 'center',
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
    const {listCategory} = this.props;
    return (
      <View style={{flex: 1}}>
        <HeaderBar title="Thêm phiếu dịch vụ" />
        <FlatList
          data={listCategory}
          keyExtractor={(item, index) => index.toString()}
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: AppValues.COLOR_BG_WHITE,
          }}
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
)(AddService);
