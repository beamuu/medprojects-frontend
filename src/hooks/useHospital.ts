import web3 from "../providers/web3";
import { AbiItem } from 'web3-utils';
import compiledHospital from "../contracts/Hospital.json";
import { useEffect, useState } from "react";
import { sendTransactionToContract } from "./useTransaction";

interface IUseHospital {
    owner: string;
    patient: string;
    createPatient: () => Promise<string>;
}

export default function useHospital(contractAddress: string, account: string | null | undefined): IUseHospital {

    const Hospital = new web3.eth.Contract(compiledHospital.abi as AbiItem[], contractAddress);
    const [owner, setOwner] = useState<string>("");
    const [patient, setPatient] = useState<string>("");

    const initOwner = async () => {
        const _owner = await Hospital.methods.owner().call();
        setOwner(_owner);
    }

    const initPatient = async () => {
        const _patient = await Hospital.methods.getPatient(account).call();
        setPatient(_patient);
    }

    const createPatient = async () => {
        const data = await Hospital.methods.createPatient().encodeABI();
        return await sendTransactionToContract(account, contractAddress, data)
            .then((txHash: string) => {
                initPatient();
                return txHash;
            })
            .catch(() => {
                return "";
            })
            ;
    }

    useEffect(() => {
        initOwner();
        if (account) {
            initPatient();
        }
    }, [contractAddress])

    useEffect(() => {
        if (account) {
            initOwner();
            initPatient();
        }

    }, [account])

    return {
        owner,
        patient,
        createPatient
    }
}

interface IUseHostedHospital {
    owner: string;
    allow: boolean | null;
    valid: boolean;
}

export function useHostedHospital(contractAddress: string, account: string | null | undefined): IUseHostedHospital {


    const Hospital = new web3.eth.Contract(compiledHospital.abi as AbiItem[]);
    const [owner, setOwner] = useState<string>("");
    const [allow, setAllow] = useState<boolean | null>(null);
    const [valid, setValid] = useState<boolean>(true);

    const initOwner = async () => {
        try {
            Hospital.options.address = contractAddress;
            const _owner = await Hospital.methods.owner().call();
            setOwner(_owner);
            setValid(true);
        } catch (error) {
            setValid(false);
        }
        
    }

    const createPatient = async () => {
        const data = await Hospital.methods.createPatient().encodeABI();
        return await sendTransactionToContract(account, contractAddress, data)
            .then((txHash: string) => {
                return txHash;
            })
            .catch(() => {
                return "";
            })
            ;
    }

    useEffect(() => {
        if (contractAddress) {
            initOwner();
        }
    }, [contractAddress, account]);
    useEffect(() => {
        if (owner) {
            if (owner === account) {
                setAllow(true);
            }
            else {
                setAllow(false);
            }
        }
    }, [owner]);

    return {
        owner,
        allow,
        valid
    }
}

export interface IHospital {
    name: string;
    id: string;
    license: string;
    location: string;
}

export const getHospitalInfo = async (hospitalAddress: string): Promise<IHospital> => {
    const Hospital = new web3.eth.Contract(compiledHospital.abi as AbiItem[], hospitalAddress);
    const hospitalInfo: IHospital = {
        name: "",
        id: "",
        license: "",
        location: "",
    }

    hospitalInfo.name = await Hospital.methods.hospitalName().call();
    hospitalInfo.id = await Hospital.methods.hospitalId().call();
    hospitalInfo.license = await Hospital.methods.hospitalLicense().call();
    hospitalInfo.location = await Hospital.methods.hospitalLocation().call();

    return hospitalInfo;
}