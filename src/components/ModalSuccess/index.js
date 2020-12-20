import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlurView} from '@react-native-community/blur';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../TextView';
import styles from './styles';

export default class SuccessModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onPress: PropTypes.func,
    txtTitle: PropTypes.string,
    txtContent: PropTypes.string,
  };

  static defaultProps = {
    visible: false,
    onPress: () => {},
    txtTitle: undefined,
    txtContent: undefined,
  };

  constructor(props) {
    super(props);
    const {visible} = this.props;
    this.state = {visible};
  }

  componentWillReceiveProps(nextProps) {
    const {visible} = nextProps;
    this.setState({visible});
  }

  close() {
    const {onPress} = this.props;
    this.setState({visible: false});
    if (onPress) onPress();
  }

  render() {
    const {visible} = this.state;
    const {txtContent, txtTitle} = this.props;
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
                {txtTitle}
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
              <TextView style={{marginTop: Screen.width(2)}}>
                {txtContent}
              </TextView>
            </View>
            <View style={styles.View_btn}>
              <TouchableOpacity
                style={styles.btn_view_confirm}
                onPress={() => this.close()}>
                <View style={{justifyContent: 'center'}}>
                  <TextView
                    style={{
                      color: AppValues.COLOR_BG_WHITE,
                      padding: Screen.width(3),
                    }}
                    type="bold">
                    Đóng
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
