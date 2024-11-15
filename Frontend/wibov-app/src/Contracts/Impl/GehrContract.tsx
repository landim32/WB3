import Web3, { Web3EthInterface } from "web3";
import ContractResponse from "../../DTO/Contracts/ContractResponse";
import PatientInfo from "../../DTO/Domain/PatientInfo";
import RecordInfo from "../../DTO/Domain/RecordInfo";
import IGehrContract from "../Interfaces/IGehrContract";
import env from "react-dotenv";
import GEHR_ABI from "../ABIs/GEHRABI.json";

const GehrContract: IGehrContract = {
    getContract: async () => {
        let web3: Web3 | undefined = undefined;
        if (!(window as any).ethereum) {
            throw new Error(`No MetaMask found!`);
        }


        if (!web3) {
            await (window as any).ethereum.enable();
            web3 = new Web3((window as any).ethereum);
        }
        const accounts = await web3.eth.requestAccounts();
        if (!accounts || !accounts.length) {
            throw new Error('Wallet not found/allowed!');
        }

        return new web3.eth.Contract(GEHR_ABI, env.GEHR_CONTRACT, { from: accounts[0] });
    },
    mint: async (_name: string, _email: string, _birthday: number, _tags: number) => {
        let _ret: ContractResponse<boolean>;
        let _contract = await GehrContract.getContract();
        try {
            //let ret = await _contract.methods.mint(_name, _email, _birthday, _tags).send();
            let ret = await _contract.methods.mint(_name, _email, 0, 0).send();
            console.log("mint: ", JSON.stringify(ret, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
            ));
            _ret = {
                ..._ret,
                success: true
            };
        }
        catch (err: any) {
            let msg = "";
            if (err.data?.message) {
                msg = err.data?.message;
            }
            else if (err.message) {
                msg = err.message;
            }
            else {
                msg = JSON.stringify(err);
            }

            _ret = {
                ..._ret,
                success: false,
                message: msg
            };
        }
        return _ret;
    },
    change: async (_patient: string, _name: string, _email: string, _birthday: number, _tags: number) => {
        let _ret: ContractResponse<boolean>;
        let _contract = await GehrContract.getContract();
        try {
            //let ret = await _contract.methods.change(_patient, _name, _email, _birthday, _tags).send();
            let ret = await _contract.methods.change(_patient, _name, _email, 0, 0).send();
            console.log("mint: ", JSON.stringify(ret, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
            ));
            return {
                ..._ret,
                success: true,
                data: true
            };
        }
        catch (err: any) {
            let msg = "";
            if (err.data?.message) {
                msg = err.data?.message;
            }
            else if (err.message) {
                msg = err.message;
            }
            else {
                msg = JSON.stringify(err);
            }

            _ret = {
                ..._ret,
                success: false,
                message: msg
            };
        }
        return _ret;
    },
    burn: async () => {
        let _ret: ContractResponse<boolean>;
        let _contract = await GehrContract.getContract();
        try {
            let ret = await _contract.methods.burn().send();
            console.log("burn: ", JSON.stringify(ret, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
            ));
            _ret = {
                ..._ret,
                success: true,
                data: true
            };
        }
        catch (err: any) {
            let msg = "";
            if (err.data?.message) {
                msg = err.data?.message;
            }
            else if (err.message) {
                msg = err.message;
            }
            else {
                msg = JSON.stringify(err);
            }

            _ret = {
                ..._ret,
                success: false,
                message: msg
            };
        }
        return _ret;
    },
    addRecord: async (_owner: string, _recordType: number, _agendaAt: number, _operatorInfo: string, _data: string) => {
        let _ret: ContractResponse<boolean>;
        let _contract = await GehrContract.getContract();
        try {
            //let ret = await _contract.methods.addRecord(_owner, _recordType, _agendaAt, _operatorInfo, _data).send();
            let ret = await _contract.methods.addRecord(_owner, _recordType, 0, _operatorInfo, _data).send();
            console.log("addRecord: ", JSON.stringify(ret, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
            ));
            _ret = {
                ..._ret,
                success: true,
                data: true
            };
        }
        catch (err: any) {
            let msg = "";
            if (err.data?.message) {
                msg = err.data?.message;
            }
            else if (err.message) {
                msg = err.message;
            }
            else {
                msg = JSON.stringify(err);
            }

            _ret = {
                ..._ret,
                success: false,
                message: msg
            };
        }
        return _ret;
    },
    getPatientByAddress: async (patientAddr: string) => {
        let _ret: ContractResponse<PatientInfo>;
        let _patient: PatientInfo;
        let _contract = await GehrContract.getContract();
        try {
            let ret = await _contract.methods.patientByAddress(patientAddr).call();
            console.log("patientByAddress: ", JSON.stringify(ret, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
            ));
            _ret = {
                ..._ret,
                success: true,
                data: {
                    ..._patient,
                    name: ret.name,
                    email: ret.email,
                    birthday: ret.birthday,
                    addedAt: ret.addedAt,
                    lastChange: ret.lastChange,
                    tags: ret.tags
                }
            };
        }
        catch (err: any) {
            _ret = {
                ..._ret,
                success: false,
                message: err.data?.message ?? JSON.stringify(err)
            };
        }
        return _ret;
    },
    getPatientOfOperatorByIndex: async (index: number) => {
        let _ret: ContractResponse<PatientInfo>;
        let _contract = await GehrContract.getContract();
        let ret = await _contract.methods.getPatientOfOperatorByIndex(index).call();
        console.log("getPatientOfOperatorByIndex: ", JSON.stringify(ret));
        return _ret;
    },
    getOperatorBalance: async () => {
        let _ret: ContractResponse<number>;
        let _contract = await GehrContract.getContract();
        let ret = await _contract.methods.getOperatorBalance().call();
        console.log("getOperatorBalance: ", JSON.stringify(ret));
        return _ret;
    },
    recordPatientByIndex: async (patientAddr: string, index: number) => {
        let _ret: ContractResponse<RecordInfo>;
        let _record: RecordInfo;
        let _contract = await GehrContract.getContract();
        try {
            let ret = await _contract.methods.recordPatientByIndex(patientAddr, index).call();
            console.log("recordPatientByIndex: ", JSON.stringify(ret, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
            ));
            _ret = {
                ..._ret,
                success: true,
                data: {
                    ..._record,
                    loading: false,
                    ownerAddr: ret.ownerAddr,
                    operatorAddr: ret.operatorAddr,
                    operatorInfo: ret.operatorInfo,
                    addedAt: ret.addedAt,
                    agendaAt: ret.agendaAt,
                    recordType: ret.recordType,
                    data: ret.data
                }
            };
        }
        catch (err: any) {
            let msg = "";
            if (err.data?.message) {
                msg = err.data?.message;
            }
            else if (err.message) {
                msg = err.message;
            }
            else {
                msg = JSON.stringify(err);
            }

            _ret = {
                ..._ret,
                success: false,
                message: msg
            };
        }
        return _ret;
    },
    getRecordPatientBalance: async (patientAddr: string) => {
        let _ret: ContractResponse<number>;
        let _contract = await GehrContract.getContract();
        try {
            let ret = await _contract.methods.getRecordPatientBalance(patientAddr).call();
            console.log("getRecordPatientBalance: ", JSON.stringify(ret, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
            ));
            _ret = {
                ..._ret,
                success: true,
                data: ret
            };
        }
        catch (err: any) {
            let msg = "";
            if (err.data?.message) {
                msg = err.data?.message;
            }
            else if (err.message) {
                msg = err.message;
            }
            else {
                msg = JSON.stringify(err);
            }

            _ret = {
                ..._ret,
                success: false,
                message: msg
            };
        }
        return _ret;
    }
}

export default GehrContract;