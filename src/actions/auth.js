import { firebase, googleAuthProvider, createUser, logInUser } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startCreateUser = (email, password) => () => {
  return createUser(email, password)
}

export const startEmailLogin = (email, password) => () => {
  return logInUser(email, password)
}

export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};