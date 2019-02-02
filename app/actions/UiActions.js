import * as types from './actionConstants';

export const toggleAction = { type: types.TOGGLE_SIDEBAR };
export const openAction = initialLocation => ({
  type: types.OPEN_SUBMENU,
  initialLocation
});
export const closeAllAction = { type: types.CLOSE_ALL_SUBMENU };
export const changeThemeAction = theme => ({
  type: types.CHANGE_THEME,
  theme
});
export const changeModeAction = mode => ({
  type: types.CHANGE_MODE,
  mode
});
export const changeGradientAction = gradient => ({
  type: types.CHANGE_GRADIENT,
  gradient
});
export const changeDecoAction = deco => ({
  type: types.CHANGE_DECO,
  deco
});
export const changeLayoutAction = layout => ({
  type: types.CHANGE_LAYOUT,
  layout
});
export const changeBgPositionAction = position => ({
  type: types.CHANGE_BG_POSITION,
  position
});
export const playTransitionAction = isLoaded => ({
  type: types.LOAD_PAGE,
  isLoaded
});
