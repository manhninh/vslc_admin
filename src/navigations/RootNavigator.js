import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Welcome from '../screen/Welcome';
import Home from '../screen/Home';
import HomeAdminNotify from '../screen/Home/HomeAdminNotify';
import HomeStaff from '../screen/Home/homeStaff';
import HomeStaffNotify from '../screen/Home/homeStaffNotify';
import Search from '../screen/Search';
import SignIn from '../screen/SignIn';
import Register from '../screen/Register';
import Favorite from '../screen/Favorite';
import NotifyScreen from '../screen/Notification/NotifyScreen';
import UserProfile from '../screen/UserProfile';
import CreateOrder from '../screen/CreateOrder';
import Order from '../screen/Order';
import ChoosePlace from '../screen/ChoosePlace';
import MapGoogle from '../screen/MapGoogle';
import MapCustomer from '../screen/MapGoogle/MapCustomer';
import SearchCustomer from '../screen/SearchCustomer';
import StaffDetail from '../screen/StaffDetail';
import CustomerDetail from '../screen/CustomerDetail';

export const RootNavigator = createAppContainer(
  createStackNavigator(
    {
      Welcome: {
        screen: Welcome,
      },
      Home: {
        screen: Home,
      },
      HomeAdminNotify: {
        screen: HomeAdminNotify,
      },
      HomeStaff: {
        screen: HomeStaff,
      },
      HomeStaffNotify: {
        screen: HomeStaffNotify,
      },
      Search: {
        screen: Search,
      },
      SignIn: {
        screen: SignIn,
      },
      Register: {
        screen: Register,
      },
      Favorite: {
        screen: Favorite,
      },
      NotifyScreen: {
        screen: NotifyScreen,
      },
      UserProfile: {
        screen: UserProfile,
      },
      CreateOrder: {
        screen: CreateOrder,
      },
      Order: {
        screen: Order,
      },
      ChoosePlace: {
        screen: ChoosePlace,
      },
      MapGoogle: {
        screen: MapGoogle,
      },
      MapCustomer: {
        screen: MapCustomer,
      },
      SearchCustomer: {
        screen: SearchCustomer,
      },
      StaffDetail: {
        screen: StaffDetail,
      },
      CustomerDetail: {
        screen: CustomerDetail,
      },
    },
    {
      headerMode: 'none',
      initialRouteName: 'Welcome',
    },
  ),
);
