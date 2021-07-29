import React from "react";

import { Text } from "react-native";
import { Auth, Hub } from "aws-amplify";
import Amplify from "@aws-amplify/core";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "../aws-exports";
// import { AuthStateContext, UserContext, UserInfoContext } from '../contexts';
// import { SignUp } from '../pages/SignUp/SignUp';

import SigninForm from "../pages/Singin";
import { SignoutButtonContainer } from "../containers/UserInfo";

// import UserInfoSetter from "../containers/UserInfoSetter";
import { Provider } from "react-redux";
import { createStore } from "redux";
import appReducer from "../Reducer";

import { setUserInfo } from "../actions/UserInfo";

const store = createStore(appReducer);

Amplify.configure(awsconfig);

const AuthStateApp: React.FC = ({ children }) => {
  // const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object>();
  // const [reloadSetUserInfo, setReloadSetUserInfo] = React.useState(false);

  const unsubscribe = store.subscribe(() => {
    setUser(store.getState().setter.value);
  });
  
  React.useEffect(() => {

    if (!user) {
      Auth.currentAuthenticatedUser().then((authData) => {
        store.dispatch(setUserInfo(authData));
        setUserInfo(authData);
      });
    }
    return () => {
      unsubscribe();
    };
  }, []);
  
  return user?.username ? (
    <>
      <Provider store={store}>
        {children}
      </Provider>
    </>
  ) : (
    <Provider store={store}>
      <SigninForm />
    </Provider>
  );
};

export const refreshToken = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    store.dispatch(setUserInfo(user));
    return user.idToken.jwtToken;
  } catch(err) {
    console.error(err);
    return null;
  }
}

export default AuthStateApp;
