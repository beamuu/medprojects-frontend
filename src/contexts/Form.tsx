import { createContext, useState } from "react";

interface IProps {
    children: any
}

export interface IForm {
    startDate: any
    endDate: any
    department: string[]
    treatmentTopics: string[]
    treatmentDescription: string[]
    resultTopics: string[]
    doctor: string[]
    doctorResponsibility: string[]
    setStateDate: any
    setEndDate: any
    setDepartment: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
    setTreatmentTopics: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
    setTreatmentDescription: React.Dispatch<React.SetStateAction<string[]>>  | (() => void)
    setResultTopics: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
    setDoctor: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
    setDoctorResponsibility: React.Dispatch<React.SetStateAction<string[]>> | (() => void)
}
const defaultContextValue = {
    startDate: "",
    endDate: "",
    department: [""],
    treatmentTopics: [""],
    treatmentDescription: [""],
    resultTopics: [""],
    doctor: [""],
    doctorResponsibility: [""],
    setStateDate: () => {},
    setEndDate: () => {},
    setDepartment: () => {},
    setTreatmentTopics: () => {},
    setTreatmentDescription: () => {},
    setResultTopics: () => {},
    setDoctor: () => {},
    setDoctorResponsibility: () => {},
}

export const FormContext = createContext<IForm>(defaultContextValue);

export const FormProvider = ({ children }: IProps) => {
    const [startDate, setStateDate] = useState();
    const [endDate, setEndDate] = useState();
    const [department, setDepartment] = useState<string[]>([""]);
    const [treatmentTopics, setTreatmentTopics] = useState<string[]>([""]);
    const [treatmentDescription, setTreatmentDescription] = useState<string[]>([""]);
    const [resultTopics, setResultTopics] = useState<string[]>([""]);
    const [doctor, setDoctor] = useState<string[]>([""]);
    const [doctorResponsibility, setDoctorResponsibility] = useState<string[]>([""]);

    return (
        <FormContext.Provider value={{
            startDate ,
            endDate,
            department,
            treatmentTopics,
            treatmentDescription,
            resultTopics,
            doctor,
            doctorResponsibility,
            setStateDate,
            setEndDate,
            setDepartment,
            setTreatmentTopics,
            setTreatmentDescription,
            setResultTopics,
            setDoctor,
            setDoctorResponsibility,
            
        }}>
            { children }
        </FormContext.Provider>
    )
}
