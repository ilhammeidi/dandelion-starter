import * as types from './actionConstants';

export const toggleAction = { type: types.TOGGLE_SIDEBAR };
export const openMenuAction = { type: types.OPEN_MENU };

export const openAction = initialLocation => ({
  type: types.OPEN_SUBMENU,
  initialLocation
});
export const changeThemeAction = theme => ({
  type: types.CHANGE_THEME,
  theme
});
export const changeRandomThemeAction = {
  type: types.CHANGE_RANDOM_THEME,
};
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
export const changeDirectionAction = direction => ({
  type: types.CHANGE_DIRECTION,
  direction
});
export const playTransitionAction = isLoaded => ({
  type: types.LOAD_PAGE,
  isLoaded
});
