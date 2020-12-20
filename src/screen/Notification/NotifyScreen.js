/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import NotificationItem from '../../components/NotificationItem';
import styles from '../../components/style';
import {
  listNotificationsApiSubmit,
  readNotificationsApiSubmit,
} from '../../redux/actions/publicActions';
import {ordersIdApiSubmit} from '../../redux/actions/serviceActions';
import {listNotifications, isLoadListNotifi} from '../../redux/selectors';
import HeaderBar from '../../components/HeaderBar';
import FlatListCustoms from '../../components/FlatListCustoms';
import ButtonMore from '../../components/ButtonMore';

class NotificationTabScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  submitAPI = (page, loadMore = false) => {
    const {listNotificationsApiSubmit} = this.props;
    listNotificationsApiSubmit(page, loadMore);
  };

  componentDidMount() {
    this.submitAPI(1);
  }

  onLoadRefresh = () => {
    this.submitAPI(1);
  };

  loadMore(page) {
    this.submitAPI(page, true);
    this.setState({page});
  }

  render() {
    const {page} = this.state;
    const {
      listNotifications,
      ordersIdApiSubmit,
      readNotificationsApiSubmit,
      isLoadListNotifi,
    } = this.props;
    const checkMore = listNotifications.list.length !== listNotifications.count;
    return (
      <View style={{flex: 1}}>
        <HeaderBar title="Thông báo" />
        <View style={{flex: 1, paddingBottom: 10, ...styles.white_bg}}>
          <FlatListCustoms
            refreshing={isLoadListNotifi}
            data={listNotifications.list}
            onRefresh={this.onLoadRefresh}
            renderItem={({item}) => {
              return (
                <NotificationItem
                  data={item}
                  onPress={() => {
                    ordersIdApiSubmit(item.orderId);
                    if (item.state === 0) {
                      readNotificationsApiSubmit(item);
                    }
                  }}
                />
              );
            }}
            textEmpty="Danh sách trống"
            ListFooterComponent={() =>
              checkMore ? (
                <ButtonMore onPress={() => this.loadMore(page + 1)} />
              ) : null
            }
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listNotifications: listNotifications(state),
  isLoadListNotifi: isLoadListNotifi(state),
});
export default connect(
  mapStateToProps,
  {listNotificationsApiSubmit, ordersIdApiSubmit, readNotificationsApiSubmit},
)(NotificationTabScreen);
