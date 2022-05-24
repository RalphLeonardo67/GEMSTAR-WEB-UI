import { combineReducers } from 'redux';

import app from './app';
import auth from './authUser';
import employeeList from './employeeList';
import services from './services';
import project from './project';
import projectList from './project_list';
import usersData from './users_data';
import usersList from './users_list';
import userLevels from './user_levels';
import notifList from './notification_list';
import carousels from './carousel';
import carouselData from './carousel_data'
import logManagement from './logManagement';

export default combineReducers({
  app,
  auth,
  employeeList,
  logManagement,
  notifList,
  project,
  projectList,
  services,
  usersData,
  usersList,
  userLevels,
  carousels,
  carouselData
});
