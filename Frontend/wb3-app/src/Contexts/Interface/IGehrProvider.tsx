import ProviderResult from "../../DTO/Contexts/ProviderResult";
import PatientInfo from "../../DTO/Domain/PatientInfo";
import RecordInfo from "../../DTO/Domain/RecordInfo";


interface IGehrProvider {
    loadingPatient: boolean;
    loadingChangePacient: boolean;
    loadingDeletePacient: boolean;
    loadingPatientList: boolean;
    loadingRecordList: boolean;
    loadingInsertRecord: boolean;
    currentPatient: PatientInfo;
    currentRecord: RecordInfo;
    patientCount: number;
    recordCount: number;
    patientList: PatientInfo[];
    recordList: RecordInfo[];
    createPatient: (patient: PatientInfo) => Promise<ProviderResult>;
    changePatient: (patient: PatientInfo) => Promise<ProviderResult>;
    deletePatient: () => Promise<ProviderResult>;
    addRecord: (record: RecordInfo) => Promise<ProviderResult>;
    loadPatient: (patientAddr: string) => Promise<ProviderResult>;
    listPatients: () => Promise<ProviderResult>;
    listRecords: (patientAddr: string) => Promise<ProviderResult>;
}

export default IGehrProvider;