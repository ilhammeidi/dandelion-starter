import produce from 'immer';
import MenuContent from 'dan-api/ui/menu';
import {
  TOGGLE_SIDEBAR,
  OPEN_MENU,
  CLOSE_MENU,
  OPEN_SUBMENU,
  CHANGE_THEME,
  CHANGE_RANDOM_THEME,
  CHANGE_MODE,
  CHANGE_GRADIENT,
  CHANGE_DECO,
  CHANGE_BG_POSITION,
  CHANGE_LAYOUT,
  CHANGE_DIRECTION,
  LOAD_PAGE
} from '../constants/uiConstants';

const initialState = {
  /* Settings for Themes and layout */
  theme: 'blueCyanTheme',
  direction: 'ltr',
  type: 'dark', // light or dark
  gradient: true, // true or false
  decoration: true, // true or false
  bgPosition: 'half', // half, header, full
  layout: 'left-sidebar', // big-sidebar, left-sidebar, top-navigation, mega-menu
  /* End settings */
  palette: [
    { name: 'Mint', value: 'blueCyanTheme' },
    { name: 'Monochrome', value: 'greyTheme' }
  ],
  sidebarOpen: true,
  pageLoaded: false,
  subMenuOpen: []
};

const getMenus = menuArray => menuArray.map(item => {
  if (item.child) {
    return item.child;
  }
  return false;
});

const setNavCollapse = (arr, curRoute) => {
  let headMenu = 'not found';
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      if (arr[i][j].link === curRoute) {
        headMenu = MenuContent[i].key;
      }
    }
  }
  return headMenu;
};

/* eslint-disable default-case, no-param-reassign */
const uiReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      draft.sidebarOpen = !state.sidebarOpen;
      break;
    case OPEN_MENU:
      draft.sidebarOpen = true;
      break;
    case CLOSE_MENU:
      draft.sidebarOpen = false;
      draft.subMenuOpen = [];
      break;
    case OPEN_SUBMENU: {
      // Set initial open parent menu
      const activeParent = setNavCollapse(
        getMenus(MenuContent),
        action.initialLocation
      );

      // Once page loaded will expand the parent menu
      if (action.initialLocation) {
        draft.subMenuOpen = [activeParent];
        const path = action.initialLocation.split('/');
        if (path.length <= 3 && action.initialLocation !== '/app') {
          draft.sidebarOpen = false;
        }
        return;
      }

      // Expand / Collapse parent menu
      const menuList = state.subMenuOpen;
      if (menuList.indexOf(action.key) > -1) {
        draft.subMenuOpen = [];
      } else {
        draft.subMenuOpen = [action.key, action.keyParent];
      }
      break;
    }
    case CHANGE_RANDOM_THEME: {
      const paletteArray = state.palette;
      const random = paletteArray[Math.floor(Math.random() * paletteArray.length)];
      draft.theme = random.value;
      break;
    }
    case CHANGE_THEME:
      draft.theme = action.theme;
      break;
    case CHANGE_MODE:
      draft.type = action.mode;
      break;
    case CHANGE_GRADIENT:
      draft.gradient = action.gradient;
      break;
    case CHANGE_DECO:
      draft.decoration = action.deco;
      break;
    case CHANGE_BG_POSITION:
      draft.bgPosition = action.position;
      break;
    case CHANGE_LAYOUT:
      draft.layout = action.layout;
      break;
    case CHANGE_DIRECTION:
      draft.direction = action.direction;
      break;
    case LOAD_PAGE:
      draft.pageLoaded = action.isLoaded;
      break;
    default:
      break;
  }
});

export default uiReducer;
