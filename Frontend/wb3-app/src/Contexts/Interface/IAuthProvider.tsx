import AuthSession from "../../DTO/Domain/AuthSession";
import ProviderResult from "../../DTO/Contexts/ProviderResult";


interface IAuthProvider {
    //bindMetaMaskWallet: (name: string, email: string, fromReferralCode: string) => Promise<ProviderResult>;
    //checkUserRegister: () => Promise<ProviderResult>;
    login: () => Promise<ProviderResult>;
    logout: () => ProviderResult;
    loadUserSession: () => void;
    setSessionInfo: (userSession: AuthSession) => void;
    //updateUser: (name: string, email: string) => Promise<ProviderResult>;
    loading: boolean;
    sessionInfo: AuthSession;
}

export default IAuthProvider;