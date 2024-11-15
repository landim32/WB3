import React, {useContext, useState} from 'react';
import ProviderResult from '../../DTO/Contexts/ProviderResult'; 
import IAuthProvider from '../Interface/IAuthProvider';
import AuthContext from './AuthContext';
import AuthFactory from '../../Business/Factory/AuthFactory';
import AuthSession from '../../DTO/Domain/AuthSession';

export default function AuthProvider(props : any) {

  const [loading, setLoading] = useState(false);
  //const [sessionInfo, _setSessionInfo] = useState<AuthSession>(null);

  const authProviderValue: IAuthProvider = {
    loading: loading,
    login: async () => {;
      let _ret: ProviderResult;
      setLoading(true);
      //_setSessionInfo(null);
      AuthFactory.AuthBusiness.logOut();
        let retLogin = await AuthFactory.AuthBusiness.logIn();
        if (!retLogin.sucesso) {
          setLoading(false);
          return {
            ..._ret,
            sucesso: false,
            mensagemErro: retLogin.mensagem
          }
        }
      let session = AuthFactory.AuthBusiness.getSession();
      if (!session) {
        setLoading(false);
        return {
          ..._ret,
          sucesso: false,
          mensagemSucesso: "Session is empty"
        }
      }
      //_setSessionInfo(session);
      setLoading(false);
      return {
        ..._ret,
        sucesso: true,
        mensagemSucesso: "Login successful!"
      }
    },
    logout: function (): ProviderResult {
      try {
        AuthFactory.AuthBusiness.logOut();
        //_setSessionInfo(null);
        return {
          sucesso: true,
          mensagemErro: "",
          mensagemSucesso: ""
        };
      } catch (err) {
        return {
          sucesso: false,
          mensagemErro: "Falha ao tenta executar o logout",
          mensagemSucesso: ""
        };
      }


    },
    loadUserSession: async () => {
      let session = AuthFactory.AuthBusiness.getSession();
      //console.log("Session:", session);
      if (session) {
        //console.log("Session:", session.dataResult);
        //_setSessionInfo(session);
      }
    },
    setSessionInfo: (userSession: AuthSession) => {
      AuthFactory.AuthBusiness.setSession(userSession);
    },
    sessionInfo: AuthFactory.AuthBusiness.getSession()
  };

  return (
    <AuthContext.Provider value={authProviderValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
