import React, {Component} from 'react';
import DatePickerLib from 'react-native-datepicker';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {refInner} = this.props;
    return (
      <DatePickerLib
        mode="date"
        format="DD/MM/YYYY"
        confirmBtnText="Ok"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            borderWidth: 0,
          },
        }}
        style={{height: 0, width: 0}}
        showIcon={false}
        ref={refInner}
        {...this.props}
      />
    );
  }
}

export default DatePicker;
