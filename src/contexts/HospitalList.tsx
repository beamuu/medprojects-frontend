import { createContext, useState } from "react";

interface IHospitalListProvider {
    children: any
}

const defaultContextValue = {
    hospitalIndex: 0,
    setHospitalIndex: () => {}
}

export interface IHospitalListContext {
    hospitalIndex: number;
    setHospitalIndex: React.Dispatch<React.SetStateAction<number>> | (() => void);
}

export const HospitalListContext = createContext<IHospitalListContext>(defaultContextValue);

export function HospitalListProvider({ children }: IHospitalListProvider) {
    const [hospitalIndex, setHospitalIndex] = useState<number>(0);
    
    console.log(hospitalIndex)
    return (
        <HospitalListContext.Provider value={{
            hospitalIndex,
            setHospitalIndex
        }}>
            {children}
        </HospitalListContext.Provider>
    )
}
