export default interface RecordInfo {
    ownerAddr: string;
    recordType: number;
    operatorAddr: string;
    operatorInfo: string;
    addedAt: number;
    agendaAt: number;
    data: string;
    loading: boolean;
}