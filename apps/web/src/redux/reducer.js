import { combineReducers } from 'redux';

// reducer import
import authReducer from './auth.reducer';
import customizationReducer from './customization.reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    auth: authReducer,
});

export default reducer;
