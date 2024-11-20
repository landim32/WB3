import ContractResponse from "../../DTO/Contracts/ContractResponse";
import PatientInfo from "../../DTO/Domain/PatientInfo";
import RecordInfo from "../../DTO/Domain/RecordInfo";

export default interface IGehrContract {
    getContract: () => Promise<any>;
    mint: (_name: string, _email: string, _birthday: number, _tags: number) => Promise<ContractResponse<boolean>>;
    change: (_patient: string, _name: string, _email: string, _birthday: number, _tags: number) => Promise<ContractResponse<boolean>>;
    burn: () => Promise<ContractResponse<boolean>>;
    addRecord: (_owner: string, _recordType: number, _agendaAt: number, _operatorInfo: string, _data: string) => Promise<ContractResponse<boolean>>;
    getPatientByAddress: (patientAddr: string) => Promise<ContractResponse<PatientInfo>>;
    getPatientOfOperatorByIndex: (index: number) => Promise<ContractResponse<PatientInfo>>;
    getOperatorBalance: () => Promise<ContractResponse<number>>;
    recordPatientByIndex: (patientAddr: string, index: number) => Promise<ContractResponse<RecordInfo>>;
    getRecordPatientBalance: (patientAddr: string) => Promise<ContractResponse<number>>;
}