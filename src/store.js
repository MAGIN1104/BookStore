import { createStore, combineReducers, compose  } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBsdt4QSbTWQSb5C93v5Flhz--xNT8P5kQ",
    authDomain: "bibliostore-b0ffc.firebaseapp.com",
    databaseURL: "https://bibliostore-b0ffc.firebaseio.com",
    projectId: "bibliostore-b0ffc",
    storageBucket: "bibliostore-b0ffc.appspot.com",
    messagingSenderId: "634899665756",
    appId: "1:634899665756:web:264ffc37af557d76fe6799",
    measurementId: "G-MT43Y55SRW"
}

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore: firestoreReducer, 
})

const initialState = {};

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f   
    )
);
export default store;