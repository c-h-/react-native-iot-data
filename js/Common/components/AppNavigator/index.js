import StackNavigator from './StackNavigator';
import StackRoutes from './StackRoutes';
import sharedStackOptions from './sharedStackOptions';

const AppNavigator = StackNavigator(StackRoutes, {
  initialRouteName: 'home',
  StackOptions: sharedStackOptions,
});

export default AppNavigator;
