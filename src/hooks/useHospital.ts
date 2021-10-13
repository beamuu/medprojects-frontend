import web3 from "../providers/web3";
import { AbiItem } from 'web3-utils';
import compiledHospital from "../contracts/Hospital.json";
import { useEffect, useState } from "react";

interface IUseHospital {
    owner: string;
    patient: string;
}

export default function useHospital(contractAddress:string, account: string | null | undefined): IUseHospital {

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

    useEffect(() => {
        if (account) {
            initOwner();
            initPatient();
        }
        
    }, [account])

    return {
        owner,
        patient
    }
}