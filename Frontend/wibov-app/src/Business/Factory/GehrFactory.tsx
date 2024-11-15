import ContractFactory from '../../Contracts/ContractFactory';
import GehrBusiness from '../Impl/GehrBusiness';
import IGehrBusiness from '../Interfaces/IGehrBusiness';

const gehrContract = ContractFactory.GehrContract;

const gehrBusinessImpl: IGehrBusiness = GehrBusiness;
gehrBusinessImpl.init(gehrContract);

const GehrFactory = {
  GehrBusiness: gehrBusinessImpl
};

export default GehrFactory;
