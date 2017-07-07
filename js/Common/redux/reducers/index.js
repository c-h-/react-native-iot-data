import {
  combineReducers,
} from 'redux';

import AppNavigator from 'Common/components/AppNavigator';

import transient from 'Common/redux/reducers/transient';
import home from 'Common/views/Home/reducer';

export default combineReducers({
  transient,
  nav: (state, action) => AppNavigator.router.getStateForAction(action, state) || state,
  home,
});
