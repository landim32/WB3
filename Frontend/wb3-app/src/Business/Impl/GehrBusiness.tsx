import IGehrContract from "../../Contracts/Interfaces/IGehrContract";
import IGehrBusiness from "../Interfaces/IGehrBusiness";
import BusinessResult from "../../DTO/Business/BusinessResult";
import PatientInfo from "../../DTO/Domain/PatientInfo";
import RecordInfo from "../../DTO/Domain/RecordInfo";
import StatusRequest from "../../DTO/Services/StatusRequest";

let _gehrContract: IGehrContract;

const GehrBusiness: IGehrBusiness = {
    init: (gehrContract: IGehrContract) => {
        _gehrContract = gehrContract;
    },
    mint: async (patient: PatientInfo) => {
        let _ret: StatusRequest;
        if (!patient.name) {
            return {
                ..._ret,
                sucesso: false,
                mensagem: "Patient name is empty"
            };
        }
        let ret = await _gehrContract.mint(patient.name, patient.email, patient.birthday, patient.tags);
        if (ret.success) {
            return {
                ..._ret,
                sucesso: true
            };
        }
        return {
            ..._ret,
            sucesso: false,
            mensagem: ret.message
        }
    },
    change: async (patient: PatientInfo) => {
        let _ret: StatusRequest;
        if (!patient.name) {
            return {
                ..._ret,
                sucesso: false,
                mensagem: "Patient name is empty"
            };
        }
        let ret = await _gehrContract.change(patient.owner, patient.name, patient.email, patient.birthday, patient.tags);
        if (ret.success) {
            return {
                ..._ret,
                sucesso: true
            };
        }
        return {
            ..._ret,
            sucesso: false,
            mensagem: ret.message
        }
    },
    burn: async () => {
        await _gehrContract.burn();
    },
    addRecord: async (record: RecordInfo) => {
        let _ret: StatusRequest;
        if (!record.data) {
            return {
                ..._ret,
                sucesso: false,
                mensagem: "Record data is empty"
            };
        }
        console.log("record: ", JSON.stringify(record, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
        let ret = await _gehrContract.addRecord(record.ownerAddr, record.recordType, record.agendaAt, record.operatorInfo, record.data);
        if (ret.success) {
            return {
                ..._ret,
                sucesso: true
            };
        }
        return {
            ..._ret,
            sucesso: false,
            mensagem: ret.message
        }
    },
    getPatient: async (patientAddr: string) => {
        let _ret: BusinessResult<PatientInfo>;
        let ret = await _gehrContract.getPatientByAddress(patientAddr);
        if (ret.success) {
            return {
                ..._ret,
                dataResult: ret.data,
                sucesso: true
            };
        }
        else {
            return {
                ..._ret,
                sucesso: false,
                mensagem: ret.message
            };
        }
    },
    getPatientOfOperatorByIndex: async (index: number) => {
        let _ret: BusinessResult<PatientInfo>;
        let ret = await _gehrContract.getPatientOfOperatorByIndex(index);
        if (ret.success) {
            return {
                ..._ret,
                dataResult: ret.data,
                sucesso: true
            };
        }
        else {
            return {
                ..._ret,
                sucesso: false,
                mensagem: ret.message
            };
        }
    },
    getOperatorBalance: async () => {
        let _ret: BusinessResult<number>;
        let ret = await _gehrContract.getOperatorBalance();
        if (ret.success) {
            return {
                ..._ret,
                dataResult: ret.data,
                sucesso: true
            };
        }
        else {
            return {
                ..._ret,
                sucesso: false,
                mensagem: ret.message
            };
        }
    },
    getRecordsOfPatientByIndex: async (patientAddr: string, index: number) => {
        let _ret: BusinessResult<RecordInfo>;
        let ret = await _gehrContract.recordPatientByIndex(patientAddr, index);
        if (ret.success) {
            return {
                ..._ret,
                dataResult: ret.data,
                sucesso: true
            };
        }
        else {
            return {
                ..._ret,
                sucesso: false,
                mensagem: ret.message
            };
        }
    },
    getRecordBalance: async (patientAddr: string) => {
        let _ret: BusinessResult<number>;
        let ret = await _gehrContract.getRecordPatientBalance(patientAddr);
        if (ret.success) {
            return {
                ..._ret,
                dataResult: ret.data,
                sucesso: true
            };
        }
        else {
            return {
                ..._ret,
                sucesso: false,
                mensagem: ret.message
            };
        }
    }
}

export default GehrBusiness;