import env from 'react-dotenv';
import IGehrContract from './Interfaces/IGehrContract';
import GehrContract from './Impl/GehrContract';

const gehrContractImpl : IGehrContract = GehrContract;

const ContractFactory = {
  GehrContract: gehrContractImpl
};

export default ContractFactory;