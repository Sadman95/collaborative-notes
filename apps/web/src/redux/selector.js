import { createSelector } from 'reselect';

const selectUser = (state) => state.auth;
const selectCustomization = (state) => state.customization;

export const selectCurrentUser = createSelector([selectUser], (auth) => {
    return auth ? auth.user : null;
});
export const selectCurrentMode = createSelector([selectCustomization], (data) => data);
