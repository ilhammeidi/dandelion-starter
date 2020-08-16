import { fromJS, List } from 'immutable';
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
  type: 'light', // light or dark
  gradient: true, // true or false
  decoration: true, // true or false
  bgPosition: 'half', // half, header, full
  layout: 'left-sidebar', // big-sidebar, left-sidebar, top-navigation, mega-menu
  /* End settings */
  palette: List([
    { name: 'Mint', value: 'blueCyanTheme' },
    { name: 'Monochrome', value: 'greyTheme' },
  ]),
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

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return state.withMutations((mutableState) => {
        mutableState.set('sidebarOpen', !state.get('sidebarOpen'));
      });
    case OPEN_MENU:
      return state.withMutations((mutableState) => {
        mutableState.set('sidebarOpen', true);
      });
    case CLOSE_MENU:
      return state.withMutations((mutableState) => {
        mutableState.set('sidebarOpen', false);
      });
    case OPEN_SUBMENU:
      return state.withMutations((mutableState) => {
        // Set initial open parent menu
        const activeParent = setNavCollapse(
          getMenus(MenuContent),
          action.initialLocation
        );

        // Once page loaded will expand the parent menu
        if (action.initialLocation) {
          mutableState.set('subMenuOpen', List([activeParent]));
          return;
        }

        // Expand / Collapse parent menu
        const menuList = state.get('subMenuOpen');
        if (menuList.indexOf(action.key) > -1) {
          if (action.keyParent) {
            mutableState.set('subMenuOpen', List([action.keyParent]));
          } else {
            mutableState.set('subMenuOpen', List([]));
          }
        } else {
          mutableState.set('subMenuOpen', List([action.key, action.keyParent]));
        }
      });
    case CHANGE_RANDOM_THEME:
      return state.withMutations((mutableState) => {
        const paletteArray = state.get('palette').toJS();
        const random = paletteArray[Math.floor(Math.random() * paletteArray.length)];
        mutableState.set('theme', random.value);
      });
    case CHANGE_THEME:
      return state.withMutations((mutableState) => {
        mutableState.set('theme', action.theme);
      });
    case CHANGE_MODE:
      return state.withMutations((mutableState) => {
        mutableState.set('type', action.mode);
      });
    case CHANGE_GRADIENT:
      return state.withMutations((mutableState) => {
        mutableState.set('gradient', action.gradient);
      });
    case CHANGE_DECO:
      return state.withMutations((mutableState) => {
        mutableState.set('decoration', action.deco);
      });
    case CHANGE_BG_POSITION:
      return state.withMutations((mutableState) => {
        mutableState.set('bgPosition', action.position);
      });
    case CHANGE_LAYOUT:
      return state.withMutations((mutableState) => {
        mutableState.set('layout', action.layout);
      });
    case CHANGE_DIRECTION:
      return state.withMutations((mutableState) => {
        mutableState.set('direction', action.direction);
      });
    case LOAD_PAGE:
      return state.withMutations((mutableState) => {
        mutableState.set('pageLoaded', action.isLoaded);
      });
    default:
      return state;
  }
}
