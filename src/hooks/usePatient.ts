import web3 from "../providers/web3";
import { AbiItem } from 'web3-utils';
import compiledPatient from "../contracts/Patient.json";
import { useEffect, useState } from "react";

interface IUsePatient {
    hospital: string;
}

export default function usePatient(): IUsePatient {

    var Patient = new web3.eth.Contract(compiledPatient.abi as AbiItem[]);
    const [hospital, setHospital] = useState<string>("");


    return {
        hospital
    }
}