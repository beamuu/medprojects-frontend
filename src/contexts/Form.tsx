import { createContext, useState } from "react";
import web3 from "../providers/web3";
import compiledHospital from "../contracts/Hospital.json";
import { AbiItem } from 'web3-utils';
import { sendTransactionToContract } from "../hooks/useTransaction";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
interface IProps {
    children: any
}

export interface IForm {
    startDate: any
    endDate: any
    department: string
    treatmentTopics: string[]
    treatmentDescription: string[]
    resultTopics: string[]
    resultDescription: string[]
    doctor: string[]
    doctorResponsibility: string[]
    setStartDate: any
    setEndDate: any
    setDepartment: React.Dispatch<React.SetStateAction<string>> | (() => void)
    setTreatmentTopics: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
    setTreatmentDescription: React.Dispatch<React.SetStateAction<string[]>>  | (() => void)
    setResultTopics: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
    setResultDescription: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
    setDoctor: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
    setDoctorResponsibility: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
    addRecordTo: (hospital: string, address: string, from: string | undefined | null) => void
}
const defaultContextValue = {
    startDate: "",
    endDate: "",
    department: "",
    treatmentTopics: [""],
    treatmentDescription: [""],
    resultTopics: [""],
    resultDescription: [""],
    doctor: [""],
    doctorResponsibility: [""],
    setStartDate: () => {},
    setEndDate: () => {},
    setDepartment: () => {},
    setTreatmentTopics: () => {},
    setTreatmentDescription: () => {},
    setResultTopics: () => {},
    setResultDescription: () => {},
    setDoctor: () => {},
    setDoctorResponsibility: () => {},
    addRecordTo: (hospital: string, address: string, from: string | undefined | null) => {}
}

export const FormContext = createContext<IForm>(defaultContextValue);

export const FormProvider = ({ children }: IProps) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [department, setDepartment] = useState<string>("");
    const [treatmentTopics, setTreatmentTopics] = useState<string[]>([""]);
    const [treatmentDescription, setTreatmentDescription] = useState<string[]>([""]);
    const [resultTopics, setResultTopics] = useState<string[]>([""]);
    const [resultDescription, setResultDescription] = useState<string[]>([""]);
    const [doctor, setDoctor] = useState<string[]>([""]);
    const [doctorResponsibility, setDoctorResponsibility] = useState<string[]>([""]);
    const [open, setOpen] = useState(false);

    const HospitalInstance = new web3.eth.Contract(compiledHospital.abi as AbiItem[]);

    const addRecordTo = (hospital: string, address: string, from: string | undefined | null) => {
        console.log(address);
        HospitalInstance.options.address = hospital;
        if (!department) return handleClickOpen();
        if (treatmentTopics.includes("")) return handleClickOpen();
        if (treatmentDescription.includes("")) return handleClickOpen();
        if (resultTopics.includes("")) return handleClickOpen();
        if (resultDescription.includes("")) return handleClickOpen();
        if (doctor.includes("")) return handleClickOpen();
        if (doctorResponsibility.includes("")) return handleClickOpen();
        if (!startDate || !endDate) return handleClickOpen();
        console.log(
            address,
            new Date(startDate/1000).getTime().toString(),
            new Date(endDate/1000).getTime().toString(),
            department,
            treatmentTopics,
            treatmentDescription,
            resultTopics,
            resultDescription,
            doctor,
            doctorResponsibility
        );
        const data = HospitalInstance.methods.addRecord(
            address,
            new Date(startDate/1000).getTime(),
            new Date(endDate/1000).getTime(),
            department,
            treatmentTopics,
            treatmentDescription,
            resultTopics,
            resultDescription,
            doctor,
            doctorResponsibility
        ).encodeABI();
        
        sendTransactionToContract(from, hospital, data);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <FormContext.Provider value={{
            startDate ,
            endDate,
            department,
            treatmentTopics,
            treatmentDescription,
            resultTopics,
            resultDescription,
            doctor,
            doctorResponsibility,
            setStartDate,
            setEndDate,
            setDepartment,
            setTreatmentTopics,
            setTreatmentDescription,
            setResultTopics,
            setResultDescription,
            setDoctor,
            setDoctorResponsibility,
            addRecordTo,
        }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Some field still empty
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please fill all of the field on your screen. You can delete the one you don't want to use. But remember, Each topic need to have at least one more field.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>back</Button>
                </DialogActions>
            </Dialog>
            { children }
        </FormContext.Provider>
    )
}
