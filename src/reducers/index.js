import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as shopReducer } from './shop';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    shops: shopReducer
});

export default rootReducer;
