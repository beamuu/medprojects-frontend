import { createContext, useState } from "react";
import { hospitalArray } from "../data/hospital";
import useHospital from "../hooks/useHospital";

interface IHospitalListProvider {
    children: any
}

const defaultContextValue = {
    hospitalIndex: 0,
    setHospitalIndex: () => {},
    hospitalContractAddress: "",
    setHospitalContractAddress: () => {},
}

export interface IHospitalListContext {
    hospitalIndex: number;
    setHospitalIndex: React.Dispatch<React.SetStateAction<number>> | (() => void);
    hospitalContractAddress: string;
    setHospitalContractAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const HospitalListContext = createContext<IHospitalListContext>(defaultContextValue);

export function HospitalListProvider({ children }: IHospitalListProvider) {
    const [hospitalIndex, setHospitalIndex] = useState<number>(0);
    const [hospitalContractAddress, setHospitalContractAddress] = useState<string>(hospitalArray[0].address);

    return (
        <HospitalListContext.Provider value={{
            hospitalIndex,
            setHospitalIndex,
            hospitalContractAddress,
            setHospitalContractAddress
        }}>
            {children}
        </HospitalListContext.Provider>
    )
}
