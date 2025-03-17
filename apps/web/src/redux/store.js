// redux/store.js
import { persistReducer } from 'redux-persist';
import reducer from './reducer';
import storage from 'redux-persist/lib/storage';
import { legacy_createStore as createStore } from 'redux';

const persistConfig = {
    key: 'collaborative-notes',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);

export default store;
