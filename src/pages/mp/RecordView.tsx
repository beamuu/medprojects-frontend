import { Alert, Button, CircularProgress, Fab, LinearProgress, TextField, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useWeb3React } from "@web3-react/core";
import { AbiItem } from 'web3-utils';
import { useContext, useEffect, useRef, useState } from "react";
import { HospitalListContext } from "../../contexts/HospitalList";
import compiledPatient from "../../contracts/Patient.json";
import useHospital from "../../hooks/useHospital";
import web3 from "../../providers/web3";
import Record, { IRecord } from "./Record";

export default function RecordView() {
    const { account } = useWeb3React();
    const { hospitalContractAddress, hospitalIndex } = useContext(HospitalListContext);
    const { patient, createPatient } = useHospital(hospitalContractAddress, account);

    const PatientInstance = new web3.eth.Contract(compiledPatient.abi as AbiItem[]);
    const [records, setRecords] = useState<number>(0);
    const [sendCreated, setSendCreated] = useState<boolean>(false);
    const [createFail, setCreateFail] = useState<boolean>(false);

    const [limitation, setLimitation] = useState<number>(0);
    const [recordsArray, setRecordsArray] = useState<IRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getExactRecord = async (index: number) => {
        PatientInstance.options.address = patient;
        const r = await PatientInstance.methods.getExactRecord(index).call();
        return r;
    }



    useEffect(() => {
        console.log(recordsArray);
    }, [recordsArray])

    const loadRecord = async () => {
        setLoading(true);
        const tmp: IRecord[] = []
        for (var i = 0; i < records; i++) {
            const _record = await getExactRecord(i);
            tmp.push(_record)
        }
        setRecordsArray([...tmp]);
        setLoading(false);
    }

    useEffect(() => {
        if (records > 10) {
            setLimitation(10);
        }
        else {
            setLimitation(records);
        }
        loadRecord();

    }, [records]);


    const handleCreateNewPatient = async () => {
        setSendCreated(true);
        const res = await createPatient();
        if (!res) {
            setCreateFail(true);
        }
        else {
            setCreateFail(false);
        }
    }

    const getRecords = async () => {
        const recs = await PatientInstance.methods.getRecords().call();
        setRecords(recs);
    }
    const refresh = () => {
        window.location.reload();
    }
    const retryCreateNewPatient = () => {
        setCreateFail(false);
        setSendCreated(false);
        handleCreateNewPatient();
    }

    useEffect(() => {
        if (parseInt(patient, 16)) {
            PatientInstance.options.address = patient;
            getRecords();
        }
    }, [patient, hospitalContractAddress]);

    if (patient === "") {
        return (
            <LinearProgress />
        )
    }

    if (!parseInt(patient, 16)) {
        return (
            <>
                <div className="d-flex justify-content-center">
                    {sendCreated ?
                        (createFail ?
                            <div>
                                <Alert severity="error" className="my-3">
                                    <h6 className="mb-2">Transaction rejected</h6>
                                    <p>Looks like the transaction has been rejected by user or MetaMask is failed to send transaction.</p>
                                </Alert>
                                <div className="d-flex">
                                    <Button className="me-2" style={{ textTransform: "none" }} onClick={retryCreateNewPatient}>Retry</Button>
                                    <Button className="me-2" style={{ textTransform: "none" }} onClick={refresh}>Refresh</Button>
                                    <Button className="me-2" style={{ textTransform: "none" }}>Report this error</Button>
                                </div>
                            </div>
                            :

                            <div>
                                <Alert severity="info" className="my-3">
                                    <h6 className="mb-2">Confirm your request on MetaMask</h6>
                                    <p>After confirm the transaction in your MetaMask, your request will be sent to the blockchain.</p>
                                    <p>Please wait for the blockchain for the confirmation.</p>
                                </Alert>
                                <div className="d-flex">
                                    <Button className="me-2" style={{ textTransform: "none" }} onClick={retryCreateNewPatient}>Retry</Button>
                                    <Button className="me-2" style={{ textTransform: "none" }} onClick={refresh}>Refresh</Button>
                                </div>
                            </div>
                        )
                        :
                        <Button variant="contained" onClick={handleCreateNewPatient} style={{ textTransform: "none" }}>+ new patient</Button>
                    }
                </div >
            </>
        )
    }

    return (
        <div>
            <p>Your patient contract is : <b>{patient}</b></p>
            <p>You have <b>{records}</b> record(s)</p>

            <div className="my-3 d-flex align-items-center">
                <TextField id="standard-basic" label="index" variant="standard" />
                <Button variant="outlined" size="medium" className="mx-2">Go</Button>
            </div>

            <div className="my-5">
                {
                    recordsArray.map((element: IRecord, index: number) => <Record data={element} patient={account} contract={patient} index={index} />)
                }
            </div>
            <div className="d-flex justify-content-center">
                {
                    loading ? <CircularProgress /> : null
                }
            </div>
        </div>
    )
}