'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var actionsPrefix = exports.actionsPrefix = '@@reactReduxFirebase';

var actionTypes = exports.actionTypes = {
  START: actionsPrefix + '/START',
  SET: actionsPrefix + '/SET',
  REMOVE: actionsPrefix + '/REMOVE',
  MERGE: actionsPrefix + '/MERGE',
  SET_PROFILE: actionsPrefix + '/SET_PROFILE',
  LOGIN: actionsPrefix + '/LOGIN',
  LOGOUT: actionsPrefix + '/LOGOUT',
  LOGIN_ERROR: actionsPrefix + '/LOGIN_ERROR',
  NO_VALUE: actionsPrefix + '/NO_VALUE',
  UNAUTHORIZED_ERROR: actionsPrefix + '/UNAUTHORIZED_ERROR',
  ERROR: actionsPrefix + '/ERROR',
  CLEAR_ERRORS: actionsPrefix + '/CLEAR_ERRORS',
  SET_LISTENER: actionsPrefix + '/SET_LISTENER',
  UNSET_LISTENER: actionsPrefix + '/UNSET_LISTENER',
  AUTHENTICATION_INIT_STARTED: actionsPrefix + '/AUTHENTICATION_INIT_STARTED',
  AUTHENTICATION_INIT_FINISHED: actionsPrefix + '/AUTHENTICATION_INIT_FINISHED',
  SESSION_START: actionsPrefix + '/SESSION_START',
  SESSION_END: actionsPrefix + '/SESSION_END',
  FILE_UPLOAD_START: actionsPrefix + '/FILE_UPLOAD_START',
  FILE_UPLOAD_ERROR: actionsPrefix + '/FILE_UPLOAD_ERROR',
  FILE_UPLOAD_PROGRESS: actionsPrefix + '/FILE_UPLOAD_PROGRESS',
  FILE_UPLOAD_COMPLETE: actionsPrefix + '/FILE_UPLOAD_COMPLETE',
  FILE_DELETE_START: actionsPrefix + '/FILE_DELETE_START',
  FILE_DELETE_ERROR: actionsPrefix + '/FILE_DELETE_ERROR',
  FILE_DELETE_COMPLETE: actionsPrefix + '/FILE_DELETE_COMPLETE',
  AUTH_UPDATE_START: actionsPrefix + '/AUTH_UPDATE_START',
  AUTH_UPDATE_SUCCESS: actionsPrefix + '/AUTH_UPDATE_SUCCESS',
  AUTH_UPDATE_ERROR: actionsPrefix + '/AUTH_UPDATE_ERROR',
  PROFILE_UPDATE_START: actionsPrefix + '/PROFILE_UPDATE_START',
  PROFILE_UPDATE_SUCCESS: actionsPrefix + '/PROFILE_UPDATE_SUCCESS',
  PROFILE_UPDATE_ERROR: actionsPrefix + '/PROFILE_UPDATE_ERROR',
  EMAIL_UPDATE_START: actionsPrefix + '/EMAIL_UPDATE_START',
  EMAIL_UPDATE_SUCCESS: actionsPrefix + '/EMAIL_UPDATE_SUCCESS',
  EMAIL_UPDATE_ERROR: actionsPrefix + '/EMAIL_UPDATE_ERROR',
  AUTH_RELOAD_START: actionsPrefix + '/AUTH_RELOAD_START',
  AUTH_RELOAD_ERROR: actionsPrefix + '/AUTH_RELOAD_ERROR',
  AUTH_RELOAD_SUCCESS: actionsPrefix + '/AUTH_RELOAD_SUCCESS',
  AUTH_LINK_START: actionsPrefix + '/AUTH_LINK_START',
  AUTH_LINK_ERROR: actionsPrefix + '/AUTH_LINK_ERROR',
  AUTH_LINK_SUCCESS: actionsPrefix + '/AUTH_LINK_SUCCESS',
  AUTH_EMPTY_CHANGE: actionsPrefix + '/AUTH_EMPTY_CHANGE'
};

var defaultConfig = exports.defaultConfig = {
  userProfile: null,
  presence: null,
  sessions: 'sessions',
  enableLogging: false,
  logErrors: true,
  preserveOnLogout: null,
  preserveOnEmptyAuthChange: null,
  resetBeforeLogin: true,
  updateProfileOnLogin: true,
  enableRedirectHandling: true,
  autoPopulateProfile: false,
  setProfilePopulateResults: false,
  dispatchOnUnsetListener: true,
  dispatchRemoveAction: false,
  enableEmptyAuthChanges: true,
  firebaseStateName: 'firebase',
  attachAuthIsReady: false,
  keysToRemoveFromAuth: ['appName', 'apiKey', 'authDomain', 'redirectEventId', 'stsTokenManager', 'uid'],
  keysToPreserveFromProviderData: ['email', 'phoneNumber', 'photoURL', 'providerId', 'uid']
};

var supportedAuthProviders = exports.supportedAuthProviders = ['google', 'github', 'twitter', 'facebook'];

var topLevelPaths = exports.topLevelPaths = ['auth', 'profile', 'ordered', 'data'];

var v3ErrorMessage = exports.v3ErrorMessage = 'Context from react-redux not found. If you are using react-redux v6 a v3.*.* version of react-redux-firebase is required. Please checkout the v3 migration guide: http://bit.ly/2SRNdiO';

exports.default = {
  actionTypes: actionTypes,
  defaultConfig: defaultConfig
};