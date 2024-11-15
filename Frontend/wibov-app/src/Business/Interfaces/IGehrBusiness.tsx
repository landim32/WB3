import IGehrContract from "../../Contracts/Interfaces/IGehrContract";
import BusinessResult from "../../DTO/Business/BusinessResult";
import PatientInfo from "../../DTO/Domain/PatientInfo";
import RecordInfo from "../../DTO/Domain/RecordInfo";
import StatusRequest from "../../DTO/Services/StatusRequest";

export default interface IGehrBusiness {
  init: (gehrContract: IGehrContract) => void;
  mint: (patient: PatientInfo) => Promise<StatusRequest>;
  change: (patient: PatientInfo) => Promise<StatusRequest>;
  burn: () => void;
  addRecord: (record: RecordInfo) => Promise<StatusRequest>;
  getPatient: (patientAddr: string) => Promise<BusinessResult<PatientInfo>>;
  getPatientOfOperatorByIndex: (index: number) => Promise<BusinessResult<PatientInfo>>;
  getOperatorBalance: () => Promise<BusinessResult<number>>;
  getRecordsOfPatientByIndex: (patientAddr: string, index: number) => Promise<BusinessResult<RecordInfo>>;
  getRecordBalance: (patientAddr: string) => Promise<BusinessResult<number>>;
}