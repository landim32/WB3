import BusinessResult from "../../DTO/Business/BusinessResult";
import AuthSession from "../../DTO/Domain/AuthSession";
import IAuthBusiness from "../Interfaces/IAuthBusiness";
import Web3 from 'web3';
import env from 'react-dotenv';

const LS_KEY = 'login-with-metamask:auth';

//let _authService : IAuthService;

const AuthBusiness : IAuthBusiness = {
  checkNetwork: async () => {
    let ret: BusinessResult<boolean>;

    let web3: Web3 | undefined = undefined;
    let ethereum: any = null;
    let buildErro = (msg: string) => {
      return ret = {
        ...ret,
        sucesso: false,
        mensagem: msg
      };
    };

    if (!(window as any).ethereum) {
      return buildErro('Please install MetaMask first.');
    }

    if (!web3) {
      try {
        await (window as any).ethereum.enable();
        ethereum = (window as any).ethereum;
        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        return buildErro('You need to allow MetaMask.');
      }
    }

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + parseInt(env.REACT_APP_NETWORK).toString(16) }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              { 
                chainId: '0x'+parseInt(env.REACT_APP_NETWORK).toString(16), 
                chainName: env.REACT_APP_CHAIN_NAME,
                rpcUrls: [env.REACT_APP_CHAIN_URL],
                blockExplorerUrls: [env.REACT_APP_CHAIN_EXPLORER],
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
                }
              }
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }

    return {
      ...ret,
      dataResult: true,
      sucesso: true,
    };
  },
  logIn: async () => {
    /*
    let ret: BusinessResult<AuthSession>;
    let web3: Web3 | undefined = undefined;
    let buildErro = (msg: string) => {
      return ret = {
        ...ret,
        sucesso: false,
        mensagem: msg
      };
    };

    if (!(window as any).ethereum) {
      return buildErro('Please install MetaMask first.');
    }

    if (!web3) {
      try {
        await (window as any).ethereum.enable();

        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        return buildErro('You need to allow MetaMask.');
      }
    }

    const publicAddress = await web3.eth.getCoinbase();
    if (!publicAddress) {
      return buildErro('Please activate MetaMask first.');
    }

    try {
      const signature = await web3.eth.personal.sign(
        "Welcome to GEHR!",//userAddressResult.user.hash,
        publicAddress,
        ''
      );
      let userSession: AuthSession;
      userSession.name = "Patient 1";
      userSession.publicAddress = signature;
      //localStorage.setItem(LS_KEY, JSON.stringify(userSession));
      await AuthBusiness.setSession(userSession);
      ret = {
        ...ret,
        sucesso: true,
        dataResult: userSession
      };
    } catch (err) {
      //return buildErro('You need to sign the message to be able to log in.');
      ret = {
        ...ret,
        sucesso: false,
        mensagem: JSON.stringify(err)
      };
    }
    return ret;
    */
    var ret: BusinessResult<boolean>;

    let web3: Web3 | undefined = undefined;

    if (!(window as any).ethereum) {
      return {
        ...ret,
        sucesso: false,
        dataResult: false,
        mensagem: 'Please install MetaMask first.'
      };
    }

    if (!web3) {
      try {
        await (window as any).ethereum.enable();

        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        return {
          ...ret,
          sucesso: false,
          dataResult: false,
          mensagem: 'You need to allow MetaMask.'
        };
      }
    }
    let chainId = await web3.eth.net.getId();
    if(parseInt(chainId.toString()) != parseInt(env.REACT_APP_NETWORK)) {
      return {
        ...ret,
        sucesso: false,
        dataResult: false,
        mensagem: "You need to connect on Binance Mainnet"
      };
    }
    const publicAddress = await web3.eth.getCoinbase();
    console.log("publicAddress: ", publicAddress);
    if (!publicAddress) {
      return {
        ...ret,
        sucesso: false,
        dataResult: false,
        mensagem: 'Please activate MetaMask first'
      };
    }
    let userSession: AuthSession;
    AuthBusiness.setSession({
      ...userSession,
      name: publicAddress.substring(0, 7) + "..." + publicAddress.substring(publicAddress.length - 5, publicAddress.length),
      publicAddress: publicAddress
    });
    return {
      ...ret,
      sucesso: true,
      dataResult: true
    };
  },
  setSession: (authSession: AuthSession) => {
    console.log("Set Session: ", JSON.stringify(authSession));
    localStorage.setItem(LS_KEY, JSON.stringify(authSession));
  },
  logOut: () => {
    localStorage.removeItem(LS_KEY);
  },
  getSession: () => {
    const ls = window.localStorage.getItem(LS_KEY);
    return ls && JSON.parse(ls);
  }/*,
  checkUserRegister: async () => {
    var ret: BusinessResult<boolean>;

    let web3: Web3 | undefined = undefined;

    if (!(window as any).ethereum) {
      return {
        ...ret,
        sucesso: false,
        dataResult: false,
        mensagem: 'Please install MetaMask first.'
      };
    }

    if (!web3) {
      try {
        await (window as any).ethereum.enable();

        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        return {
          ...ret,
          sucesso: false,
          dataResult: false,
          mensagem: 'You need to allow MetaMask.'
        };
      }
    }
    let chainId = await web3.eth.net.getId();
    if(parseInt(chainId.toString()) != parseInt(env.REACT_APP_NETWORK)) {
      return {
        ...ret,
        sucesso: false,
        dataResult: false,
        mensagem: "You need to connect on Binance Mainnet"
      };
    }
    const publicAddress = await web3.eth.getCoinbase();
    if (!publicAddress) {
      return {
        ...ret,
        sucesso: false,
        dataResult: false,
        mensagem: 'Please activate MetaMask first'
      };
    }

    return {
      ...ret,
      sucesso: true,
      dataResult: true
    };
  }*/
}

export default AuthBusiness;