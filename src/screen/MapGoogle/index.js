import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import HeaderBar from '../../components/HeaderBar';
import styles from '../../components/style';
import Title from '../../components/Title';
import TextView from '../../components/TextView';

class MapGoogle extends Component {
  constructor(props) {
    super(props);
    const {address} = this.props.navigation.state.params;
    this.state = {
      region: {
        latitude: address.latNumber,
        longitude: address.longNumber,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      x: {
        latitude: address.latNumber,
        longitude: address.longNumber,
      },
      address: address.address,
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <HeaderBar title="Địa điểm làm việc" btnBack navigation={navigation} />
        <View style={{marginHorizontal: 10}}>
          <Title icon="home" text="ĐỊA CHỈ:" />
          <TextView style={{marginLeft: 10}}>{this.state.address}</TextView>
          <Title
            style={{...styles.mt_10}}
            icon="map-marker-alt"
            text="VỊ TRÍ:"
          />
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1, margin: 10}}
          region={this.state.region}>
          <MapView.Marker
            draggable
            coordinate={this.state.x}
            title={this.state.address}
          />
        </MapView>
      </View>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  {},
)(MapGoogle);
