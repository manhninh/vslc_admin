import moment from 'moment';
import momentTZ from 'moment-timezone';
import {FORMAT_DATE, FORMAT_TIME, FORMAT_DATE_TIME} from '../utils/configApp';

export const formatDate = value => moment(value).format(FORMAT_DATE);
export const formatTime = value => moment(value).format(FORMAT_TIME);
export const formatDateTime = value => moment(value).format(FORMAT_DATE_TIME);
export const formatUnit = value => moment.unix(value);

export const formatDateAPI = (time, day) => {
  if (time) {
    return (
      momentTZ
        .tz(
          time + ' ' + day,
          FORMAT_TIME + ' ' + FORMAT_DATE,
          'Asia/Ho_Chi_Minh',
        )
        .unix() * 1000
    );
  } else {
    return momentTZ.tz(day, FORMAT_DATE, 'Asia/Ho_Chi_Minh').unix() * 1000;
  }
};

export const getDateCurrent = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const year = today.getFullYear();
  return {
    day,
    month,
    year,
    date: moment().format(FORMAT_DATE),
  };
};

export const formatDaySession = date => {
  const convert = momentTZ.tz(date, 'Asia/Ho_Chi_Minh').format('LT');
  const result = convert.split(' ');
  const time = result[0].split(':');
  let hh;
  if (result[1] === 'PM') {
    hh = Number(time[0]) !== 12 ? Number(time[0]) + 12 : '12';
  } else {
    hh = Number(time[0]) !== 12 ? Number(time[0]) : '00';
  }
  if (Number(hh) < 10) {
    return 'sáng';
  }
  if (Number(hh) < 13) {
    return 'trưa';
  }
  if (Number(hh) < 18) {
    return 'chiều';
  }
  return 'tối';
};

export const formatOrderState = value => {
  switch (value) {
    case 0:
      return {
        text: 'Chưa xử lý',
        color: '#4caf50',
      };
    case 1:
      return {
        text: 'Đã giao việc',
        color: '#009688',
      };
    case 2:
      return {
        text: 'Đang thực hiện',
        color: '#cddc39',
      };
    case 3:
      return {
        text: 'Đã thực hiện',
        color: '#ffeb3b',
      };
    case 4:
      return {
        text: 'Đã kết thúc',
        color: '#ffc107',
      };
    case 5:
      return {
        text: 'Hủy do nhân viên',
        color: '#ff5722',
      };
    case 6:
      return {
        text: 'Hủy do khách hàng',
        color: '#e91e63',
      };
    default:
      break;
  }
};

export const formatPaymentState = value => {
  switch (value) {
    case 0:
      return {
        text: 'Chưa thanh toán',
        color: '#4caf50',
      };
    case 1:
      return {
        text: 'Đã thanh toán',
        color: '#3F51B5',
      };
    default:
      break;
  }
};

export const formatShiftState = value => {
  switch (value) {
    case 0:
      return 'Chưa giao';
    case 1:
      return 'Đã giao';
    case 2:
      return 'Đang làm';
    case 3:
      return 'Đã xong';
    default:
      break;
  }
};

export const formatWorkShift = value => {
  switch (value) {
    case 1:
      return 'Ca sáng';
    case 2:
      return 'Ca chiều';
    case 3:
      return 'Ca tối';
    default:
      break;
  }
};

export const formatRole = value => {
  switch (value) {
    case 'ROLE_ADMIN':
      return 'Quản trị hệ thống';
    case 'ROLE_MANAGEMENT':
      return 'Quản lý';
    case 'ROLE_STAFF':
      return 'Nhân viên';
    default:
      break;
  }
};

export const formatSex = value => {
  switch (value) {
    case 'male':
      return 'Nam';
    case 'female':
      return 'Nữ';
    default:
      return 'Chưa chọn';
  }
};

export const formatStaffState = value => {
  switch (value) {
    case 0:
      return {
        text: 'Bình thường',
        color: '#4caf50',
      };
    case 1:
      return {
        text: 'Nghỉ phép',
        color: '#3F51B5',
      };
    case 2:
      return {
        text: 'Nghỉ việc',
        color: 'red',
      };
    default:
      break;
  }
};

export const formatMoney = (
  amount,
  decimalCount = 0,
  decimal = ',',
  thousands = '.',
) => {
  if (Number(amount) >= 0) {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';
      // eslint-disable-next-line radix
      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : '')
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    return amount;
  }
};
