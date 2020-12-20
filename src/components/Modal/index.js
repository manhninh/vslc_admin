import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalBox from 'react-native-modalbox';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemList from './list';
import TextView from '../TextView';
import Screen, * as AppValues from '../../AppValues';

const styles = StyleSheet.create({
  modal: {
    height: 'auto',
    maxHeight: '70%',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    padding: 5,
    fontSize: 15,
    fontWeight: '500'
  }
});

export default class ModalApp extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    dataView: PropTypes.array.isRequired,
    onClosed: PropTypes.func,
    onClick: PropTypes.func,
    select: PropTypes.string
  };

  static defaultProps = {
    visible: false
  };

  constructor(props) {
    super(props);
    const { visible } = this.props;
    this.state = { visible };
  }


  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  click(txt) {
    const { onClick } = this.props;
    this.setState({ visible: false });
    if (onClick) onClick(txt);
  }

  close() {
    const { onClosed } = this.props;
    this.setState({ visible: false });
    if (onClosed) onClosed();
  }

  render() {
    const { visible } = this.state;
    const { title, dataView, select } = this.props;
    return (
      <ModalBox
        isOpen={visible}
        swipeArea={20}
        position="bottom"
        onClosed={() => this.close()}
        style={styles.modal}
      >
        <View style={{ paddingBottom: Screen.width(3) }}>
          {title ? (
            <View
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <TextView style={styles.title}>{title}</TextView>
            </View>
          ) : (
            undefined
          )}
          <FlatList
            style={{}}
            data={dataView}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <ItemList
                name={item.name}
                select={select}
                button={() => {
                  this.click(item);
                }}
              />
            )}
          />
        </View>
      </ModalBox>
    );
  }
}
