/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../../components/colors';
import TextView from '../../components/TextView';
import TextViewCustoms from '../../components/TextViewCustoms';
import HeaderBar from '../../components/HeaderBar';
import {
  ordersId,
  ordersDetailId,
  customers,
  listFreeWork,
} from '../../redux/selectors';
import {
  addFavatiteStaffApiSubmit,
  evaluationStaffApiSubmit,
} from '../../redux/actions/serviceActions';
import {
  paymentApiSubmit,
  paymentDetailApiSubmit,
  changeStateApiSubmit,
  changeStateDetailApiSubmit,
  asignApiSubmit,
  updateExtraApiSubmit,
  newPriceApiSubmit,
} from '../../redux/actions/publicActions';
import {listFreeWorkApiSubmit} from '../../redux/actions/publicActions';
import {
  formatDate,
  formatTime,
  formatOrderState,
  formatMoney,
  formatWorkShift,
  formatPaymentState,
} from '../../helpers/formatValue';
import Screen, * as AppValues from '../../AppValues';
import Entypo from 'react-native-vector-icons/Entypo';
import EditText from '../../components/EditText';
import Title from '../../components/Title';
import ModalStaff from '../../components/ModalStaff';
import Button from '../../components/Button';
import ModalPay from '../../components/ModalPay';
import ModalNewPrice from '../../components/ModalNewPrice';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexShift: 0,
      staff: undefined,
      arrayStaff: [],
      showModalStaff: false,
      overtime: undefined,
      showModalPayment: false,
      showModalPaymentDetail: false,
      isUpdateStaff: 0,
      showModalNewPrice: false,
    };
  }

  componentDidMount() {
    const {listFreeWorkApiSubmit, ordersDetailId} = this.props;
    const {indexShift} = this.state;
    const dataDayWord = ordersDetailId.list[indexShift];
    listFreeWorkApiSubmit(dataDayWord.workTimeStart, dataDayWord.workTimeEnd);
    this.setState({
      staff: dataDayWord.lstStaff.map(i => i.name).join(', '),
      arrayStaff: dataDayWord.lstStaff || [],
      overtime: String(dataDayWord.extraTime || ''),
    });
  }

  listShift(item, index) {
    const {indexShift} = this.state;
    const {listFreeWorkApiSubmit} = this.props;
    return (
      <TouchableOpacity
        style={{
          borderRadius: 10,
          borderColor: AppValues.COLOR_BG_GREY,
          borderWidth: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
          margin: Screen.width(1),
          padding: Screen.width(1),
          backgroundColor:
            index === indexShift ? AppValues.primaryColor : 'transparent',
        }}
        onPress={() => {
          this.setState({indexShift: index});
          this.setState({
            staff: item.lstStaff.map(i => i.name).join(', '),
            arrayStaff: item.lstStaff.map(i => i.staff) || [],
            overtime: String(item.extraTime || ''),
            isUpdateStaff: 0,
          });
          listFreeWorkApiSubmit(item.workTimeStart, item.workTimeEnd);
        }}>
        <TextView
          type="bold"
          style={{
            color:
              index === indexShift
                ? AppValues.COLOR_BG_WHITE
                : AppValues.COLOR_BG_BLACK,
          }}>
          {formatDate(item.workTimeStart)}
        </TextView>
        <TextView
          style={{
            fontSize: AppValues.SIZE_TEXT_LABEL_SMALLER,
            color:
              index === indexShift
                ? AppValues.COLOR_BG_WHITE
                : AppValues.COLOR_BG_BLACK,
          }}>
          {formatOrderState(item.orderState).text}
        </TextView>
      </TouchableOpacity>
    );
  }

  itemContainer(title, content, colorText = AppValues.COLOR_BG_BLACK) {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextView style={{flex: 3}}>{title}</TextView>
        <TextView style={{flex: 4, color: colorText}}>{content}</TextView>
      </View>
    );
  }

  itemDay(name, number) {
    const {lstDay} = this.props.ordersId;
    const result = lstDay.search(number);
    const check = result > 0;
    return (
      <View
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
      </View>
    );
  }

  clickChangeState(id, state, status) {
    const {changeStateApiSubmit} = this.props;
    Alert.alert(status, 'Bạn thực sự muốn thực hiện!', [
      {
        text: 'ĐỒNG Ý',
        onPress: () => {
          changeStateApiSubmit(id, state);
        },
      },
      {
        text: 'HUỶ',
        style: 'cancel',
      },
    ]);
  }

  clickUpdate(orderId, orderDetailId) {
    const {isUpdateStaff, arrayStaff, overtime} = this.state;
    const {asignApiSubmit, updateExtraApiSubmit} = this.props;
    if (isUpdateStaff === 1) {
      asignApiSubmit(orderId, orderDetailId, arrayStaff);
    } else {
      Alert.alert(
        'Xác nhận',
        'Cập nhật này có thể làm thay đổi giá trị phiếu dịch vụ. Bạn có đồng ý cập nhật lại đơn giá?',
        [
          {
            text: 'ĐÓNG',
            style: 'cancel',
          },
          {
            text: 'ĐỒNG Ý',
            onPress: () => {
              updateExtraApiSubmit(orderId, orderDetailId, 1, overtime);
            },
          },
          {
            text: 'KHÔNG',
            onPress: () => {
              updateExtraApiSubmit(orderId, orderDetailId, 0, overtime);
            },
          },
        ],
      );
    }
  }

  changeStateDetail(orderId, orderDetailId, state) {
    const {changeStateDetailApiSubmit} = this.props;
    Alert.alert(
      'Xác nhận',
      'Trạng thái này có thể làm thay đổi giá trị phiếu dịch vụ. Bạn có đồng ý cập nhật lại đơn giá?',
      [
        {
          text: 'ĐÓNG',
          style: 'cancel',
        },
        {
          text: 'ĐỒNG Ý',
          onPress: () => {
            changeStateDetailApiSubmit(orderId, orderDetailId, 1, state);
          },
        },
        {
          text: 'KHÔNG',
          onPress: () => {
            changeStateDetailApiSubmit(orderId, orderDetailId, 0, state);
          },
        },
      ],
    );
  }

  render() {
    const {
      indexShift,
      staff,
      overtime,
      showModalStaff,
      showModalPayment,
      showModalPaymentDetail,
      arrayStaff,
      isUpdateStaff,
      showModalNewPrice,
    } = this.state;
    const {
      ordersId,
      ordersDetailId,
      navigation,
      listFreeWork,
      paymentApiSubmit,
      paymentDetailApiSubmit,
      newPriceApiSubmit,
    } = this.props;
    const dataDayWord = ordersDetailId.list[indexShift];
    const {
      orderCode,
      category,
      startTime,
      endTime,
      orderState,
      paymentState,
      address,
      totalPrice,
      paymentValue,
      months,
      customer,
      description,
      paymentNote,
      id,
      priceApplied,
    } = ordersId;
    return (
      <View style={{flex: 1}}>
        <HeaderBar
          title="Chi tiết phiếu dịch vụ"
          btnBack
          navigation={navigation}
        />
        <ScrollView style={mStyles.service}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={[
                mStyles.status,
                {backgroundColor: formatOrderState(orderState).color},
              ]}>
              <TextView style={{color: AppValues.COLOR_BG_WHITE}}>
                {formatOrderState(orderState).text}
              </TextView>
            </View>
            <View
              style={[
                mStyles.status,
                {backgroundColor: formatPaymentState(paymentState).color},
              ]}>
              <TextView style={{color: AppValues.COLOR_BG_WHITE}}>
                {formatPaymentState(paymentState).text}
              </TextView>
            </View>
          </View>
          {this.itemContainer('Khách hàng:', customer.name)}
          {this.itemContainer('Mã phiếu:', orderCode)}
          {this.itemContainer('Số điện thoại:', customer.phone)}
          {this.itemContainer('Loại dịch vụ:', category.name)}
          {category.id === 2 &&
            this.itemContainer('Thời gian làm:', months + ' tháng')}
          {this.itemContainer(
            'Đã thanh toán:',
            formatMoney(paymentValue) + ' đ',
          )}
          {this.itemContainer(
            'Đơn giá theo công:',
            formatMoney(priceApplied) + ' đ',
          )}
          {this.itemContainer('ND công nợ:', paymentNote)}
          {this.itemContainer(
            'Ca làm việc:',
            formatTime(startTime) + ' - ' + formatTime(endTime),
          )}
          {description && this.itemContainer('Mô tả:', description)}
          {category.id === 2 && (
            <View>
              <Title icon="people-carry" text="Lịch làm việc hàng tuần" />
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: Screen.height(1),
            }}>
            <Entypo name="location" size={24} color={Colors.primaryColor} />
            <TextView style={{flex: 1, marginLeft: Screen.width(2)}}>
              {address.address}
            </TextView>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MapGoogle', {
                  address,
                });
              }}>
              <TextView type="bold" style={{color: AppValues.primaryColor}}>
                Xem vị trí
              </TextView>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: Screen.width(1),
              alignItems: 'center',
            }}>
            <TextView
              type="bold"
              style={{flex: 1, color: AppValues.COLOR_BG_BLUE}}>
              {formatMoney(totalPrice) + 'đ'}
            </TextView>
            {orderState === 0 && (
              <TouchableOpacity
                onPress={() => this.setState({showModalNewPrice: true})}>
                <TextView type="bold" style={{color: AppValues.primaryColor}}>
                  Cập nhật đơn giá theo công
                </TextView>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {paymentState === 0 && (
              <Button
                textButton={'Thu tiền'}
                styleBtn={mStyles.btn}
                backgroundColor={AppValues.primaryColor}
                onPress={() => {
                  this.setState({showModalPayment: true});
                }}
              />
            )}
            {orderState === 0 && category.id !== 2 && (
              <Button
                textButton={'Báo hết nhân viên'}
                styleBtn={mStyles.btn}
                backgroundColor={AppValues.primaryColor}
                onPress={() => {
                  this.clickChangeState(id, 5, 'Báo hết nhân viên');
                }}
              />
            )}
            {(orderState === 0 || orderState === 1) && (
              <Button
                textButton={'Khách hàng hủy lịch'}
                styleBtn={mStyles.btn}
                backgroundColor={AppValues.primaryColor}
                onPress={() => {
                  this.clickChangeState(id, 6, 'Khách hàng hủy lịch');
                }}
              />
            )}
          </View>
          <TextView
            type="bold"
            style={{
              textAlign: 'center',
              color: AppValues.primaryColor,
              fontSize: AppValues.SIZE_TEXT_SMALL,
              marginTop: Screen.height(1),
            }}>
            Danh sách ca làm
          </TextView>
          <FlatList
            data={ordersDetailId.list}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            style={{
              marginHorizontal: Screen.width(2),
              paddingBottom: Screen.width(2),
            }}
            renderItem={({item, index}) => this.listShift(item, index)}
          />
          <TextView
            type="bold"
            style={{
              textAlign: 'center',
              color: AppValues.primaryColor,
              fontSize: AppValues.SIZE_TEXT_SMALL,
              marginTop: Screen.height(1),
            }}>
            Chi tiết ca làm
          </TextView>
          <View
            style={{
              borderRadius: 10,
              borderColor: AppValues.COLOR_BG_GREY,
              borderWidth: 0.5,
              margin: Screen.width(1),
              padding: Screen.width(1),
              marginBottom: Screen.height(2),
            }}>
            {this.itemContainer(
              'Ngày làm:',
              formatDate(dataDayWord.workTimeStart),
            )}
            {this.itemContainer(
              'Ca làm:',
              formatWorkShift(dataDayWord.workShift),
            )}
            {this.itemContainer(
              'Trạng thái:',
              formatOrderState(dataDayWord.orderState).text,
              formatOrderState(dataDayWord.orderState).color,
            )}
            {category.id === 2 &&
              this.itemContainer(
                'Đơn giá:',
                formatMoney(dataDayWord.price) + ' đ',
              )}
            {this.itemContainer(
              'Đã thanh toán:',
              formatMoney(dataDayWord.paymentValue) + ' đ',
            )}
            {/* Chỉ có status chưa xử lý và đã giao việc mới edit được */}
            <TextView
              type="bold"
              style={{
                color: AppValues.primaryColor,
              }}>
              Nhân viên được giao:
            </TextView>
            <TextViewCustoms
              icon={
                dataDayWord.orderState === 0 || dataDayWord.orderState === 1
              }
              disabled={
                dataDayWord.orderState !== 0 && dataDayWord.orderState !== 1
              }
              value={staff || 'trống'}
              onPress={() => this.setState({showModalStaff: true})}
            />
            {/* Chỉ có status đang thực hiện mới edit được */}
            <TextView
              type="bold"
              style={{
                color: AppValues.primaryColor,
              }}>
              Thời gian làm thêm giờ:
            </TextView>
            <EditText
              editable={dataDayWord.orderState === 2}
              value={overtime}
              keyboardType="number-pad"
              onChangeText={text =>
                this.setState({overtime: text, isUpdateStaff: 2})
              }
            />
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {dataDayWord.orderState !== 5 &&
                dataDayWord.orderState !== 6 &&
                dataDayWord.paymentState === 0 &&
                category.id === 2 && (
                  <Button
                    textButton={'Khách hàng thanh toán'}
                    styleBtn={mStyles.btn}
                    backgroundColor={AppValues.primaryColor}
                    onPress={() => {
                      this.setState({showModalPaymentDetail: true});
                    }}
                  />
                )}
              {dataDayWord.orderState === 0 && category.id === 2 && (
                <Button
                  textButton={'Hết nhân viên'}
                  styleBtn={mStyles.btn}
                  backgroundColor={AppValues.primaryColor}
                  onPress={() => {
                    this.changeStateDetail(id, dataDayWord.id, 5);
                  }}
                />
              )}
              {(dataDayWord.orderState === 0 || dataDayWord.orderState === 1) &&
                category.id === 2 && (
                  <Button
                    textButton={'Khách hủy lịch'}
                    styleBtn={mStyles.btn}
                    backgroundColor={AppValues.primaryColor}
                    onPress={() => {
                      this.changeStateDetail(id, dataDayWord.id, 6);
                    }}
                  />
                )}
              {isUpdateStaff > 0 && (
                <Button
                  textButton={'Cập nhật'}
                  styleBtn={mStyles.btn}
                  backgroundColor={AppValues.primaryColor}
                  onPress={() => {
                    this.clickUpdate(id, dataDayWord.id);
                    // this.setState({isUpdateStaff: 0});
                  }}
                />
              )}
              {dataDayWord.orderState === 1 && (
                <Button
                  textButton={'Bắt đầu ca làm'}
                  styleBtn={mStyles.btn}
                  backgroundColor={AppValues.primaryColor}
                  onPress={() => {
                    this.changeStateDetail(id, dataDayWord.id, 2);
                  }}
                />
              )}
              {dataDayWord.orderState === 2 && (
                <Button
                  textButton={'Kết thúc ca làm'}
                  styleBtn={mStyles.btn}
                  backgroundColor={AppValues.primaryColor}
                  onPress={() => {
                    this.changeStateDetail(id, dataDayWord.id, 3);
                    this.setState({isUpdateStaff: 0});
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <ModalStaff
          title="Chọn nhân viên được giao"
          visible={showModalStaff}
          select={arrayStaff}
          onClosed={() =>
            this.setState({
              showModalStaff: false,
            })
          }
          onClick={value =>
            this.setState({
              showModalStaff: false,
              staff: value.map(i => i.name).join(', '),
              arrayStaff: value || [],
              isUpdateStaff: 1,
            })
          }
          dataView={listFreeWork}
        />
        <ModalPay
          visible={showModalPayment}
          close={() => this.setState({showModalPayment: false})}
          onPress={(payment, note) => {
            this.setState({showModalPayment: false});
            paymentApiSubmit(id, note, payment);
          }}
        />
        <ModalPay
          visible={showModalPaymentDetail}
          close={() => this.setState({showModalPaymentDetail: false})}
          onPress={(payment, note) => {
            this.setState({showModalPaymentDetail: false});
            paymentDetailApiSubmit(id, dataDayWord.id, note, payment);
          }}
        />
        <ModalNewPrice
          visible={showModalNewPrice}
          close={() => this.setState({showModalNewPrice: false})}
          onPress={newPrice => {
            this.setState({showModalNewPrice: false});
            newPriceApiSubmit(id, newPrice);
          }}
        />
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
  service: {
    flex: 1,
    padding: Screen.width(2),
    backgroundColor: AppValues.COLOR_BG_WHITE,
  },
  status: {
    paddingHorizontal: Screen.width(1),
    borderRadius: 3,
    marginRight: Screen.height(1),
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
  btn: {
    marginLeft: Screen.width(2),
    marginTop: Screen.height(1),
  },
});

const mapStateToProps = state => ({
  ordersId: ordersId(state),
  ordersDetailId: ordersDetailId(state),
  customers: customers(state),
  listFreeWork: listFreeWork(state),
});
export default connect(
  mapStateToProps,
  {
    addFavatiteStaffApiSubmit,
    evaluationStaffApiSubmit,
    listFreeWorkApiSubmit,
    paymentApiSubmit,
    paymentDetailApiSubmit,
    asignApiSubmit,
    updateExtraApiSubmit,
    changeStateApiSubmit,
    changeStateDetailApiSubmit,
    newPriceApiSubmit,
  },
)(Order);
