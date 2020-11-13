import { combineReducers } from 'redux';

import authReducer  from './auth-reducer';
import appReducer from './app-reducer';
import newsReducer from './news-reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer,
    app: appReducer
});

export default rootReducer;