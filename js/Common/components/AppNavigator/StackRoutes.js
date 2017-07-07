import {
  notFoundKey,
  AppRoutes,
} from './AppRoutes';

const StackRoutes = {};
for (const key in AppRoutes) {
  if (key !== notFoundKey) {
    StackRoutes[key] = AppRoutes[key];
  }
}

export default StackRoutes;
