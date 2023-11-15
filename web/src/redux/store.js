import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { useDispatch as useAppDispatch, useSelector as useAppSelector} from 'react-redux';
import { rootPersistConfig, rootReducer } from './rootReducer';

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    ...applyMiddleware(thunk)
})

const persistor = persistStore(store)

const { dispatch } = store;

const useDispatch = () => useAppDispatch();

const useSelector = useAppSelector;

export { store, persistor, dispatch, useSelector, useDispatch };
