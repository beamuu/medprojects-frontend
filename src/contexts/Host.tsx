import { createContext, useState } from "react";

interface IProps {
    children: any
}

export interface IHostContext {
    hostedAddress: string;
    setHostedAddress: React.Dispatch<React.SetStateAction<string>> | (() => {});
}
const defaultContextValue = {
    hostedAddress: "",
    setHostedAddress: () => {}
}

export const HostContext = createContext<IHostContext>(defaultContextValue);

export const HostProvider = ({ children }: IProps) => {
    const [hostedAddress, setHostedAddress] = useState<string>("");
    return (
        <HostContext.Provider value={{
            hostedAddress,
            setHostedAddress
        }}>
            { children }
        </HostContext.Provider>
    )
}
