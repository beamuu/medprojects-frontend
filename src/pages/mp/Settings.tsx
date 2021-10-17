import { Alert, Button, LinearProgress, TextField } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useContext, useEffect, useState } from "react";
import { HospitalListContext } from "../../contexts/HospitalList";
import useHospital from "../../hooks/useHospital";
import compiledPatient from "../../contracts/Patient.json";
import { AbiItem } from 'web3-utils';
import web3 from "../../providers/web3";
import { sendTransactionToContract } from "../../hooks/useTransaction";

export default function Settings() {
    const { hospitalContractAddress } = useContext(HospitalListContext);
    const { account } = useWeb3React();
    const { patient } = useHospital(hospitalContractAddress, account);
    const [records, setRecords] = useState<number>(0);
    const [approveInput, setApproveInput] = useState<string>("");
    const [approveIndex, setApproveIndex] = useState<number>(0);
    const [removeInput, setRemoveInput] = useState<string>("");
    const [removeIndex, setRemoveIndex] = useState<number>(0);
    const [allowanceInput, setAllowanceInput] = useState<string>("");
    const [allowanceIndex, setAllowanceIndex] = useState<number>(0);
    const [ready, setReady] = useState(false);
    const PatientInstance = new web3.eth.Contract(compiledPatient.abi as AbiItem[]);

    const approve = async () => {
        if (!approveInput) {
            return;
        }
        if (approveIndex < 0) {
            return alert("index can't be negative numbers");
        }
        if (approveIndex + 1 > records) {
            return alert("index out of range!");
        }
        PatientInstance.options.address = patient;
        const data = PatientInstance.methods.approve(approveInput, approveIndex).encodeABI();
        sendTransactionToContract(account, patient, data);
    }

    const remove = async () => {
        if (!removeInput) {
            return;
        }
        if (removeIndex < 0) {
            return alert("index can't be negative numbers");
        }
        if (removeIndex + 1 > records) {
            return alert("index out of range!");
        }
        PatientInstance.options.address = patient;
        const data = PatientInstance.methods.unapprove(approveInput, removeIndex).encodeABI();
        sendTransactionToContract(account, patient, data);
    }

    const getRecords = async () => {
        PatientInstance.options.address = patient;
        const recs = await PatientInstance.methods.getRecords().call();
        setRecords(recs);
    }

    useEffect(() => {
        if (patient) {
            getRecords();
            setReady(true);
        }
        else {
            setReady(false);
        }
    }, [patient])

    if (!ready) {
        return (
            <LinearProgress />
        )
    }

    if (!parseInt(patient, 16)) {
        return (
            <Alert severity="error" className="my-3">
                Please create patient on this hospital first.
            </Alert>

        )
    }

    const allowance = async () => {
        PatientInstance.options.address = patient;
        const recs = await PatientInstance.methods.allowance(allowanceInput, allowanceIndex).call();
        alert(recs);
    }

    return (
        <div>
            <h5 className="my-4">Permissions</h5>
            <p>Add or remove permission to the specific address from the specific record allowances.</p>
            <div className="my-4">
                <div className="d-flex align-items-center my-3">
                    <p>I'm going to allow</p>
                    <TextField
                        label="address"
                        variant="outlined"
                        size="small"
                        className="mx-4"
                        value={approveInput}
                        onChange={(e: any) => setApproveInput(e.target.value)} />
                    <p>to view my record number</p>
                    <TextField
                        value={approveIndex}
                        onChange={(e: any) => setApproveIndex(e.target.value)}
                        id="outlined-number"
                        type="number"
                        size="small"
                        className="mx-4"
                        style={{
                            maxWidth: "80px"
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <Button variant="outlined" onClick={approve}>Add</Button>
                <hr />
                <div className="d-flex align-items-center my-3">
                    <p>I'm going to remove</p>
                    <TextField
                        label="address"
                        variant="outlined"
                        size="small"
                        className="mx-4"
                        value={removeInput}
                        onChange={(e: any) => setRemoveInput(e.target.value)} />
                    <p>from my allowance on record number</p>
                    <TextField
                        value={removeIndex}
                        onChange={(e: any) => setRemoveIndex(e.target.value)}
                        id="outlined-number"
                        type="number"
                        size="small"
                        className="mx-4"
                        style={{
                            maxWidth: "80px"
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <Button variant="outlined" color="error" onClick={remove}>
                    Remove
                </Button>
                <div className="my-5">
                    <h5 className="my-3">Check allowance of address</h5>
                    <div>
                        <TextField
                            label="address"
                            variant="outlined"
                            size="small" className="me-4"
                            value={allowanceInput}
                            onChange={(e: any) => setAllowanceInput(e.target.value)} 
                            />
                        <TextField
                            value={allowanceIndex}
                            onChange={(e: any) => setAllowanceIndex(e.target.value)}
                            id="outlined-number"
                            type="number"
                            size="small"
                            className="me-4"
                            style={{
                                maxWidth: "80px"
                            }}
                        />
                    </div>
                    <Button variant="outlined" onClick={allowance}>Check</Button>
                </div>

            </div>
        </div>
    )
}