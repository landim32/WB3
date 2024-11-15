import React, {useContext, useState} from 'react';
import ProviderResult from '../../DTO/Contexts/ProviderResult'; 
import IGehrProvider from '../Interface/IGehrProvider';
import PatientInfo from '../../DTO/Domain/PatientInfo';
import RecordInfo from '../../DTO/Domain/RecordInfo';
import GehrFactory from '../../Business/Factory/GehrFactory';
import GehrContext from './GehrContext';

export default function GehrProvider(props : any) {

  const [loadingPatient, setLoadingPatient] = useState<boolean>(false);
  const [loadingChangePacient, setLoadingChangePacient] = useState<boolean>(false);
  const [loadingInsertRecord, setLoadingInsertRecord] = useState<boolean>(false);
  const [loadingDeletePacient, setLoadingDeletePacient] = useState<boolean>(false);
  const [loadingPatientList, setLoadingPatientList] = useState<boolean>(false);
  const [loadingRecordList, setLoadingRecordList] = useState<boolean>(false);
  const [currentPatient, setCurrentPatient] = useState<PatientInfo>(null);
  const [currentRecord, setCurrentRecord] = useState<RecordInfo>(null);
  const [patientCount, setPatientCount] = useState<number>(0);
  const [recordCount, setRecordCount] = useState<number>(0);
  const [patientList, setPatientList] = useState<PatientInfo[]>([]);
  const [recordList, setRecordList] = useState<RecordInfo[]>([]);

  const gehrProviderValue: IGehrProvider = {
    loadingPatient: loadingPatient,
    loadingChangePacient: loadingChangePacient,
    loadingDeletePacient: loadingDeletePacient,
    loadingInsertRecord: loadingInsertRecord,
    loadingPatientList: loadingPatientList,
    loadingRecordList: loadingRecordList,
    currentPatient: currentPatient,
    currentRecord: currentRecord,
    patientCount: patientCount,
    recordCount: recordCount,
    patientList: patientList,
    recordList: recordList,
    createPatient: async (patient: PatientInfo) => {
        let _ret: ProviderResult;
        setLoadingChangePacient(true);
        let ret = await GehrFactory.GehrBusiness.mint(patient);
        if (ret.sucesso) {
            setLoadingChangePacient(false);
            return {
                ..._ret,
                sucesso: true,
                mensagemSucesso: "Account successful created!"
            };
        }
        else {
            setLoadingChangePacient(false);
            return {
                ..._ret,
                sucesso: false,
                mensagemErro: ret.mensagem
            };
        }
    },
    changePatient: async (patient: PatientInfo) => {
        let _ret: ProviderResult;
        setLoadingChangePacient(true);
        let ret = await GehrFactory.GehrBusiness.change(patient);
        if (ret.sucesso) {
            setLoadingChangePacient(false);
            return {
                ..._ret,
                sucesso: true,
                mensagemSucesso: "Account successful changed!"
            };
        }
        else {
            setLoadingChangePacient(false);
            return {
                ..._ret,
                sucesso: false,
                mensagemErro: ret.mensagem
            };
        }
    },
    deletePatient: async () => {
        let _ret: ProviderResult;
        setLoadingDeletePacient(false);
        await GehrFactory.GehrBusiness.burn();
        setLoadingDeletePacient(true);
        return {
            ..._ret,
            sucesso: true,
            mensagemSucesso: "Account successful deleted!"
        };
    },
    addRecord: async (record: RecordInfo) => {
        let _ret: ProviderResult;
        setLoadingInsertRecord(true);
        let ret = await GehrFactory.GehrBusiness.addRecord(record);
        if (!ret.sucesso) {
            setLoadingInsertRecord(false);
            return {
                ..._ret,
                sucesso: false,
                mensagemErro: ret.mensagem
            };            
        }
        setLoadingInsertRecord(false);
        return {
            ..._ret,
            sucesso: true,
            mensagemSucesso: "Record successful created!"
        };
    },
    loadPatient: async (patientAddr: string) => {
        let _ret: ProviderResult;
        setLoadingPatient(true);
        let ret = await GehrFactory.GehrBusiness.getPatient(patientAddr);
        if (ret.sucesso) {
            setLoadingPatient(false);
            setCurrentPatient(ret.dataResult);
            return {
                ..._ret,
                sucesso: true
            };
        }
        else {
            setLoadingPatient(false);
            return {
                ..._ret,
                sucesso: false,
                mensagemErro: ret.mensagem
            };
        }
    },
    listPatients: async () => {
        let _ret: ProviderResult;
        setLoadingPatientList(true);
        setPatientCount(0);
        setPatientList([]);
        let _patients: PatientInfo[];
        let ret = await GehrFactory.GehrBusiness.getOperatorBalance();
        if (ret.sucesso) {
            let _patientCount = ret.dataResult;
            for (let i = 0; i < _patientCount; i++) {
                let ret2 = await GehrFactory.GehrBusiness.getPatientOfOperatorByIndex(i);
                if (ret2.sucesso) {
                    _patients.push(ret2.dataResult);
                }
                else {
                    _ret = {
                        ..._ret,
                        sucesso: false,
                        mensagemErro: ret2.mensagem
                    };
                    break;
                }
            }
            setPatientCount(_patientCount);
            setPatientList(_patients);
        }
        else {
            _ret = {
                ..._ret,
                sucesso: false,
                mensagemErro: ret.mensagem
            };
        }
        setLoadingPatientList(false);
        return _ret;
    },
    listRecords: async (patientAddr: string) => {
        let _ret: ProviderResult;
        setRecordCount(0);
        setRecordList([]);
        let _records = [...recordList];
        _records = [];
        setLoadingRecordList(true);
        let ret = await GehrFactory.GehrBusiness.getRecordBalance(patientAddr);
        if (ret.sucesso) {
            console.log("_records: ", JSON.stringify(_records.length));
            let _recordCount = ret.dataResult;
            for (let i = 0; i < _recordCount; i++) {
                let rec: RecordInfo;
                //console.log("_records: ", JSON.stringify(_records));
                _records.push({
                    ...rec,
                    loading: true
                });
            }
            setRecordCount(_recordCount);
            setRecordList(_records);
            for (let i = 0; i < _recordCount; i++) {
                let ret2 = await GehrFactory.GehrBusiness.getRecordsOfPatientByIndex(patientAddr, i);
                if (ret2.sucesso) {
                    ret2.dataResult.loading = false;
                    _records[i] = ret2.dataResult;
                    setRecordList(_records);
                }
                else {
                    _ret = {
                        ..._ret,
                        sucesso: false,
                        mensagemErro: ret2.mensagem
                    };
                    break;
                }
            }
            setRecordCount(_recordCount);
            setRecordList(_records);
            _ret = {
                ..._ret,
                sucesso: true,
                mensagemSucesso: ret.mensagem
            };
        }
        else {
            _ret = {
                ..._ret,
                sucesso: true,
                mensagemSucesso: "Records listed"
            };
        }
        setLoadingRecordList(false);
        return _ret;
    }
  };

  return (
    <GehrContext.Provider value={gehrProviderValue}>
      {props.children}
    </GehrContext.Provider>
  );
}
