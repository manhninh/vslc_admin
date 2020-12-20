/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {connect} from 'react-redux';
import styles from '../../components/style';
import Colors from '../../components/colors';
import Title from '../../components/Title';
import CustomTouchable from '../../components/CustomTouchable';
import HeaderBar from '../../components/HeaderBar';
import DatePicker from '../../components/DatePicker';
import TextView from '../../components/TextView';
import Screen, * as AppValues from '../../AppValues';
import {formatDate, formatDateAPI} from '../../helpers/formatValue';
import {FORMAT_TIME, FORMAT_DATE} from '../../utils/configApp';
import {regOrdersApiSubmit} from '../../redux/actions/serviceActions';
import {addressCustomerApiSubmit} from '../../redux/actions/publicActions';
import EditText from '../../components/EditText';
import EditTextIcon from '../../components/EditText/EditTextIcon';
import Button from '../../components/Button';

class CreateOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: this.props.navigation.state.params.service,
      idOrder: this.props.navigation.state.params.service.id,
      address: undefined,
      addressObj: {},
      dueDate: undefined,
      month: 1,
      listDay: [],
      session: [1],
      startTime: '07:30 am',
      endTime: '11:30 am',
      note: undefined,
      isUser: false,
      profileUser: {},
      nameCustomer: '',
      phoneCustomer: '',
      priceApply: '',
    };
  }

  componentDidMount() {
    const {idOrder, service} = this.state;
    this.setState({
      priceApply: (
        service.price -
        service.price * (service.salePercent / 100)
      ).toString(),
    });
    if (idOrder > 6) {
      this.setState({session: [1, 2]});
    }
  }

  itemSession(name, index) {
    const {session} = this.state;
    const result = session.filter(i => i === index);
    const check = result.length > 0;
    let minInNumbers = [];
    let maxInNumbers = [];
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          if (check) {
            const removeItem = session.filter(i => i !== index);
            this.setState({session: removeItem});
            minInNumbers = Math.min.apply(Math, removeItem);
            maxInNumbers = Math.max.apply(Math, removeItem);
          } else {
            this.setState({session: [...session, index]});
            minInNumbers = Math.min.apply(Math, [...session, index]);
            maxInNumbers = Math.max.apply(Math, [...session, index]);
          }
          switch (minInNumbers) {
            case 1:
              this.setState({startTime: '07:30 am'});
              break;
            case 2:
              this.setState({startTime: '01:30 pm'});
              break;
            case 3:
              this.setState({startTime: '06:00 pm'});
              break;
            default:
              break;
          }
          switch (maxInNumbers) {
            case 1:
              this.setState({endTime: '11:30 am'});
              break;
            case 2:
              this.setState({endTime: '05: 30 pm'});
              break;
            case 3:
              this.setState({endTime: '10:00 pm'});
              break;
            default:
              break;
          }
        }}>
        <MaterialIcons
          name={check ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={18}
          color={Colors.primaryColor}
        />
        <TextView type="bold" style={{marginLeft: Screen.width(1)}}>
          {name}
        </TextView>
      </TouchableOpacity>
    );
  }

  itemMonth(name, index, check) {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => this.setState({month: index})}>
        <MaterialIcons
          name={
            index === check ? 'radio-button-checked' : 'radio-button-unchecked'
          }
          size={18}
          color={Colors.primaryColor}
        />
        <TextView type="bold" style={{marginLeft: Screen.width(1)}}>
          {name}
        </TextView>
      </TouchableOpacity>
    );
  }

  itemDay(name, number) {
    const {listDay} = this.state;
    const result = listDay.filter(i => i === number);
    const check = result.length > 0;
    return (
      <TouchableOpacity
        onPress={() => {
          if (check) {
            const removeItem = listDay.filter(i => i !== number);
            this.setState({listDay: removeItem});
          } else {
            this.setState({listDay: [...listDay, number]});
          }
        }}
        style={{
          backgroundColor: check ? Colors.primaryColor : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          width: Screen.width(8),
          height: Screen.width(8),
          borderRadius: Screen.width(4),
          borderColor: Colors.primaryColor,
          borderWidth: 1,
        }}>
        <TextView
          type="bold"
          style={{
            color: check ? AppValues.COLOR_BG_WHITE : AppValues.COLOR_BG_GRB10,
          }}>
          {name}
        </TextView>
      </TouchableOpacity>
    );
  }

  onSelect(item) {
    this.setState({
      address: item.address,
      addressObj: item,
    });
  }

  onSelectCustomer(item) {
    const {addressCustomerApiSubmit} = this.props;
    addressCustomerApiSubmit(item.id);
    this.setState({
      nameCustomer: item.name,
      phoneCustomer: item.phone,
      isUser: true,
      profileUser: item,
      address: undefined,
      addressObj: {},
    });
  }

  submit() {
    const {regOrdersApiSubmit} = this.props;
    const {
      service,
      session,
      startTime,
      endTime,
      dueDate,
      month,
      listDay,
      addressObj,
      note,
      address,
      idOrder,
      isUser,
      profileUser,
      nameCustomer,
      phoneCustomer,
      priceApply,
    } = this.state;
    if (!nameCustomer) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên khách hàng!');
      return;
    }
    if (!phoneCustomer) {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại khách hàng!');
      return;
    }
    if (!address) {
      Alert.alert('Thông báo', 'Vui lòng chọn địa chỉ!');
      return;
    }
    if (idOrder === 2 && listDay.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn lịch làm việc hàng tuần!');
      return;
    }
    if (!dueDate) {
      Alert.alert('Thông báo', 'Vui lòng chọn ngày thực hiện!');
      return;
    }
    if (session.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn ca làm việc!');
      return;
    }
    if ((idOrder === 1 || idOrder === 2) && !startTime) {
      Alert.alert('Thông báo', 'Vui lòng chọn giờ bắt đầu!');
      return;
    }
    if ((idOrder === 1 || idOrder === 2) && !endTime) {
      Alert.alert('Thông báo', 'Vui lòng chọn giờ kết thúc!');
      return;
    }
    if (priceApply === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn đơn giá!');
      return;
    }
    regOrdersApiSubmit(
      isUser
        ? profileUser
        : {
            name: nameCustomer,
            phone: phoneCustomer,
          },
      service.id,
      session,
      formatDateAPI(startTime, dueDate),
      formatDateAPI(endTime, dueDate),
      addressObj,
      note,
      listDay,
      month,
      priceApply,
    );
  }

  render() {
    const {
      idOrder,
      service,
      dueDate,
      session,
      month,
      startTime,
      endTime,
      address,
      note,
      nameCustomer,
      phoneCustomer,
      isUser,
      priceApply,
    } = this.state;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <HeaderBar title={service.name} btnBack navigation={navigation} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
          style={mStyles.container}>
          <ScrollView
            style={{...mStyles.innerContainer}}
            bounces
            showsVerticalScrollIndicator={false}>
            <Title
              style={{...styles.mt_15}}
              icon="address-book"
              text="KHÁCH HÀNG"
            />
            <EditTextIcon
              placeholder="Tên khách hàng"
              value={nameCustomer}
              onChangeText={text =>
                this.setState({
                  nameCustomer: text,
                  isUser: false,
                  address: undefined,
                  addressObj: {},
                })
              }
              onPress={() => {
                navigation.navigate('SearchCustomer', {
                  onSelect: item => this.onSelectCustomer(item),
                });
              }}
            />
            <EditTextIcon
              placeholder="Sđt khách hàng"
              keyboardType="number-pad"
              value={phoneCustomer}
              onChangeText={text =>
                this.setState({
                  phoneCustomer: text,
                  isUser: false,
                  address: undefined,
                  addressObj: {},
                })
              }
              onPress={() => {
                navigation.navigate('SearchCustomer', {
                  onSelect: item => this.onSelectCustomer(item),
                });
              }}
            />
            <Title
              style={{...styles.mt_15}}
              icon="map-marker-alt"
              text="ĐỊA ĐIỂM LÀM VIỆC"
            />
            <CustomTouchable
              style={{...styles.mt_10}}
              text={address || 'Nhấn để chọn địa chỉ'}
              onPress={() => {
                if (isUser) {
                  navigation.navigate('ChoosePlace', {
                    onSelect: item => this.onSelect(item),
                  });
                } else {
                  navigation.navigate('MapCustomer', {
                    onSelect: item => this.onSelect(item),
                  });
                }
              }}
            />
            {/* <Title style={{...styles.mt_15}} icon="home" text="SỐ NHÀ/CĂN HỘ" />
            <EditText
              placeholder="Số nhà, căn hộ"
              value={numberHome}
              onChangeText={text => this.setState({numberHome: text})}
            /> */}
            {idOrder === 2 && (
              <View>
                <Title
                  style={{...styles.mt_15}}
                  icon="hourglass-end"
                  text="Thời gian sử dụng"
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: Screen.height(1),
                  }}>
                  {this.itemMonth('Một tháng', 1, month)}
                  {this.itemMonth('Hai tháng', 2, month)}
                  {this.itemMonth('Ba tháng', 3, month)}
                </View>
                <Title
                  style={{...styles.mt_15}}
                  icon="people-carry"
                  text="Lịch làm việc hàng tuần"
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: Screen.height(1),
                  }}>
                  {this.itemDay('CN', 1)}
                  {this.itemDay('T2', 2)}
                  {this.itemDay('T3', 3)}
                  {this.itemDay('T4', 4)}
                  {this.itemDay('T5', 5)}
                  {this.itemDay('T6', 6)}
                  {this.itemDay('T7', 7)}
                </View>
              </View>
            )}
            <Title
              style={{...styles.mt_15}}
              icon="calendar-check"
              text="NGÀY THỰC HIỆN"
            />
            <CustomTouchable
              style={{...styles.mt_10}}
              text={dueDate}
              onPress={() => this.Day.refs.day.onPressDate()}
            />
            {idOrder < 7 && (
              <View>
                <Title
                  style={{...styles.mt_15}}
                  icon="adjust"
                  text="CA LÀM VIỆC"
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: Screen.height(1),
                  }}>
                  {this.itemSession('Ca sáng', 1)}
                  {this.itemSession('Ca chiều', 2)}
                  {this.itemSession('Ca Tối', 3)}
                </View>
              </View>
            )}
            {/* {(idOrder === 1 || idOrder === 2) && (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Title
                    style={{...styles.mt_15}}
                    icon="clock"
                    text="GIỜ BẮT ĐẦU"
                  />
                  <CustomTouchable
                    style={{...styles.mt_10}}
                    text={startTime}
                    onPress={() => this.Time1.refs.time1.onPressDate()}
                  />
                </View>
                <View style={{flex: 1, marginLeft: Screen.width(2)}}>
                  <Title
                    style={{...styles.mt_15}}
                    icon="clock"
                    text="GIỜ KẾT THÚC"
                  />
                  <CustomTouchable
                    style={{...styles.mt_10}}
                    text={endTime}
                    onPress={() => this.Time2.refs.time2.onPressDate()}
                  />
                </View>
              </View>
            )} */}
            <Title
              style={{...styles.mt_15, marginBottom: Screen.height(1)}}
              icon="yen-sign"
              text="ĐƠN GIÁ"
            />
            <EditText
              placeholder="Đơn giá áp dụng theo công."
              keyboardType="numeric"
              value={priceApply}
              onChangeText={text => this.setState({priceApply: text})}
            />
            <Title
              style={{...styles.mt_15, marginBottom: Screen.height(1)}}
              icon="comment-dots"
              text="GHI CHÚ"
            />
            <EditText
              placeholder="Những điều cần lưu ý"
              value={note}
              onChangeText={text => this.setState({note: text})}
              multiline
              numberOfLines={3}
            />
            <View style={{marginVertical: Screen.height(1)}}>
              <Button
                textButton="ĐĂNG KÝ DỊCH VỤ"
                backgroundColor={Colors.GREEN}
                onPress={() => this.submit()}
              />
            </View>
          </ScrollView>
          <DatePicker
            date={dueDate}
            mode="date"
            format={FORMAT_DATE}
            minDate={moment().add(1, 'days')}
            maxDate={moment().add(30, 'days')}
            ref={ref => {
              this.Day = ref;
            }}
            refInner="day"
            onDateChange={date => this.setState({dueDate: date})}
          />
          <DatePicker
            date={startTime}
            mode="time"
            format={FORMAT_TIME}
            // minDate={'08:08 am'}
            // maxDate={'09:08 am'}
            ref={ref => {
              this.Time1 = ref;
            }}
            refInner="time1"
            onDateChange={date => this.setState({startTime: date})}
          />
          <DatePicker
            date={endTime}
            mode="time"
            format={FORMAT_TIME}
            // minDate={'08:08 am' + startTime}
            // maxDate={moment().add(30, 'days')}
            ref={ref => {
              this.Time2 = ref;
            }}
            refInner="time2"
            onDateChange={date => this.setState({endTime: date})}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 15,
  },
  button: {
    marginVertical: 20,
    backgroundColor: Colors.GREEN,
    height: 50,
  },
});

const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  {regOrdersApiSubmit, addressCustomerApiSubmit},
)(CreateOrderScreen);
