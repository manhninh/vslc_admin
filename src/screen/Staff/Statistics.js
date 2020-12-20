/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../components/style';
import Colors from '../../components/colors';
import {statisticsStaffApiSubmit} from '../../redux/actions/staff';
import {statistics} from '../../redux/selectors';
import TextView from '../../components/TextView';
import Screen, * as AppValues from '../../AppValues';
import Title from '../../components/Title';
import CustomTouchable from '../../components/CustomTouchable';
import {formatDate, formatDateAPI} from '../../helpers/formatValue';
import DatePicker from '../../components/DatePicker';
import {FORMAT_DATE} from '../../utils/configApp';

const dataView = [
  {
    key: 'total',
    title: 'Tổng nhân viên:',
    backgroundColor: AppValues.primaryColor,
  },
  {
    key: 'staffAssigned',
    title: 'Đã giao việc:',
    backgroundColor: AppValues.COLOR_BG_GREEN,
  },
  {
    key: 'staffCancel',
    title: 'Hủy việc:',
    backgroundColor: AppValues.COLOR_BG_ORANGE,
  },
  {
    key: 'staffNotAssigned',
    title: 'Chưa giao việc:',
    backgroundColor: AppValues.COLOR_BG_BLUE,
  },
  {
    key: 'staffOnLeave',
    title: 'Nghỉ Phép:',
    backgroundColor: AppValues.COLOR_BG_GREY,
  },
  {
    key: 'staffQuit',
    title: 'Nghỉ việc:',
    backgroundColor: AppValues.COLOR_BG_RED,
  },
];

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      dueDate: formatDate(),
      session: 0,
    };
  }

  componentDidMount() {
    this.submitAPI();
  }

  submitAPI() {
    const {dueDate, session} = this.state;
    const {statisticsStaffApiSubmit} = this.props;
    statisticsStaffApiSubmit(formatDateAPI(false, dueDate), session);
  }

  itemStaff(item) {
    const {key, title, backgroundColor} = item;
    const {statistics} = this.props;
    return (
      <View
        style={{
          backgroundColor: backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: Screen.height(2),
          borderRadius: 10,
          width: Screen.width(45.5),
          marginLeft: Screen.width(3),
          marginTop: Screen.height(1),
        }}>
        <TextView type="bold" style={{color: AppValues.COLOR_BG_WHITE}}>
          {title}
        </TextView>
        <TextView type="bold" style={{color: AppValues.COLOR_BG_WHITE}}>
          {Number(statistics[key]) > 0 ? statistics[key] : '0'}
        </TextView>
      </View>
    );
  }

  itemSession(name, index) {
    const {session} = this.state;
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => this.setState({session: index})}>
        <MaterialIcons
          name={
            session === index
              ? 'radio-button-checked'
              : 'radio-button-unchecked'
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

  render() {
    const {dueDate} = this.state;
    return (
      <ScrollView
        style={{
          paddingTop: 10,
          ...styles.white_bg,
        }}>
        <View style={{marginHorizontal: Screen.width(2)}}>
          <Title
            style={{...styles.mt_15}}
            icon="calendar-check"
            text="NGÀY THỐNG KÊ"
          />
          <CustomTouchable
            style={{...styles.mt_10}}
            text={dueDate}
            onPress={() => this.Day.refs.day.onPressDate()}
          />
          <Title style={{...styles.mt_15}} icon="adjust" text="CA LÀM VIỆC" />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: Screen.height(1),
            }}>
            {this.itemSession('Ca sáng', 0)}
            {this.itemSession('Ca chiều', 1)}
            {this.itemSession('Ca Tối', 2)}
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: Screen.height(2)}}>
          <TouchableOpacity
            style={{
              borderColor: AppValues.primaryColor,
              borderWidth: 1,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              padding: Screen.height(1),
            }}
            onPress={() => this.submitAPI()}>
            <TextView type="bold" style={{color: AppValues.primaryColor}}>
              Cập nhật!
            </TextView>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginTop: Screen.height(1)}}
          data={dataView}
          keyExtractor={(item, key) => key.toString()}
          numColumns={2}
          renderItem={({item}) => <View>{this.itemStaff(item)}</View>}
        />
        <DatePicker
          date={dueDate}
          mode="date"
          format={FORMAT_DATE}
          minDate={formatDate()}
          maxDate={moment().add(30, 'days')}
          ref={ref => {
            this.Day = ref;
          }}
          refInner="day"
          onDateChange={date => this.setState({dueDate: date})}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  statistics: statistics(state),
});
export default connect(
  mapStateToProps,
  {statisticsStaffApiSubmit},
)(Statistics);
