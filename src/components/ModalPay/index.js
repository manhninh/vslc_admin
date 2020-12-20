/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlurView} from '@react-native-community/blur';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../TextView';
import styles from './styles';
import EditText from '../EditText';

export default class ErrorModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onPress: PropTypes.func,
    close: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    onPress: () => {},
    close: () => {},
  };

  constructor(props) {
    super(props);
    const {visible} = this.props;
    this.state = {
      visible,
      payment: undefined,
      note: undefined,
      err: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {visible} = nextProps;
    this.setState({visible});
  }

  close() {
    const {close} = this.props;
    this.setState({visible: false});
    close();
  }

  onPress() {
    const {onPress} = this.props;
    const {payment, note} = this.state;
    if (!payment || !note) {
      this.setState({err: true});
    } else {
      onPress(payment, note);
      this.setState({visible: false, payment: undefined, note: undefined});
    }
  }

  render() {
    const {visible, payment, note, err} = this.state;
    if (visible) {
      return (
        <View style={styles.container}>
          <BlurView
            viewRef={0}
            style={styles.blurView}
            blurType="light"
            blurRadius={5}
            blurAmount={5}
            overlayColor={AppValues.COLOR_BG_GRB10}
            downsampleFactor={5}
          />
          <View style={styles.view_content}>
            <View style={styles.text_pay}>
              <TextView
                style={{
                  flex: 1,
                  color: AppValues.primaryColor,
                  fontSize: AppValues.normalize(13),
                }}
                type="bold">
                Khách hàng thanh toán
              </TextView>
              <TouchableOpacity
                style={{paddingLeft: 20}}
                onPress={() => this.close()}>
                <MaterialCommunityIcons
                  name="window-close"
                  color={AppValues.primaryColor}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.content_paid}>
              <TextView>Số tiền thanh toán:</TextView>
              <EditText
                value={payment}
                keyboardType="number-pad"
                onChangeText={text =>
                  this.setState({payment: text, err: false})
                }
              />
              <TextView>Nội dung công nợ:</TextView>
              <EditText
                value={note}
                multiline
                numberOfLines={2}
                onChangeText={text => this.setState({note: text, err: false})}
              />
              {err && (
                <TextView
                  style={{
                    color: 'red',
                    fontSize: AppValues.SIZE_TEXT_LABEL_SMALLER,
                  }}>
                  *Thông tin chưa đầy đủ!
                </TextView>
              )}
            </View>
            <View style={styles.View_btn}>
              <TouchableOpacity
                style={styles.btn_view_confirm}
                onPress={() => this.onPress()}>
                <View style={{justifyContent: 'center'}}>
                  <TextView
                    style={{
                      color: AppValues.COLOR_BG_WHITE,
                      padding: Screen.width(3),
                    }}
                    type="bold">
                    Thanh toán
                  </TextView>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }
}
