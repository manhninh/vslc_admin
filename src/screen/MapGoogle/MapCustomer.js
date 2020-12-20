import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {connect} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import HeaderBar from '../../components/HeaderBar';
import styles from '../../components/style';
import Title from '../../components/Title';
import EditText from '../../components/EditText';

class MapGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 22.487575355755045,
        longitude: 103.97777724343764,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      x: {
        latitude: 22.487575355755045,
        longitude: 103.97777724343764,
      },
      address: undefined,
    };
  }

  onChoose() {
    const {navigation} = this.props;
    const {address, x} = this.state;
    if (!address) {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ!');
      return;
    }
    if (x.longitude === 103.97777724343764) {
      Alert.alert('Thông báo', 'Vui lòng chọn tọa độ trên Map!');
      return;
    }
    navigation.goBack();
    navigation.state.params.onSelect({
      address: address,
      latNumber: x.latitude,
      longNumber: x.longitude,
    });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <HeaderBar
          title="Chọn địa điểm"
          btnBack
          navigation={navigation}
          textBtnRight="Xong"
          onPressRight={() => this.onChoose()}
        />
        <View style={{marginHorizontal: 10}}>
          <Title icon="home" text="ĐỊA CHỈ NƠI LÀM VIỆC" />
          <EditText
            placeholder="Nhập địa chỉ"
            value={this.state.address}
            onChangeText={text => this.setState({address: text})}
          />
          <Title
            style={{...styles.mt_10}}
            icon="map-marker-alt"
            text="CHỌN VỊ TRÍ"
          />
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1, margin: 10}}
          region={this.state.region}
          // onRegionChange={region => this.setState({region})}
        >
          <MapView.Marker
            draggable
            coordinate={this.state.x}
            onDragEnd={e => {
              this.setState({
                x: e.nativeEvent.coordinate,
                region: {
                  ...this.state.region,
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                },
              });
            }}
            title={this.state.address}
            description="Nhấn và giữ để chọn địa điểm"
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
