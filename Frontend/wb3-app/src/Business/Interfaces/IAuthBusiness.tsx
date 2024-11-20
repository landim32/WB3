import BusinessResult from "../../DTO/Business/BusinessResult";
import AuthSession from "../../DTO/Domain/AuthSession";

export default interface IAuthBusiness {
  //init: (authService: IAuthService) => void;
  checkNetwork: () => Promise<BusinessResult<boolean>>;
  //bindMetaMaskWallet: (name: string) => Promise<BusinessResult<AuthSession>>;
  logIn: () => Promise<BusinessResult<boolean>>;
  setSession: (authSession: AuthSession) => void;
  logOut: () => void;
  getSession: () => AuthSession;
}