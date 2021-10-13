import { Button, TextField } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { AbiItem } from 'web3-utils';
import { useContext, useState } from "react";
import { HospitalListContext } from "../../contexts/HospitalList";
import compiledPatient from "../../contracts/Patient.json";
import useHospital from "../../hooks/useHospital";
import web3 from "../../providers/web3";
import Record from "./Record";
import { hospitalArray } from "../../data/hospital";

export default function RecordView() {
    const { account } = useWeb3React();
    const { hospitalContractAddress, hospitalIndex } = useContext(HospitalListContext);
    const { patient } = useHospital(hospitalContractAddress, account);


    if (!parseInt(patient, 16)) {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <Button variant="contained">+ new patient</Button>
                </div>
            </>
        )
    }

    return (
        <div>
            <p>You have 2 record(s)</p>

            <div className="my-3 d-flex align-items-center">
                <TextField id="standard-basic" label="index" variant="standard" />
                <Button variant="outlined" size="medium" className="mx-2">Go</Button>
            </div>

            <div className="my-5">
                <Record
                    topic="Megical Surgery"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus ornare accumsan. Nam lobortis, odio at pellentesque porta, mi felis viverra nibh, et ullamcorper elit ipsum vitae odio. Vestibulum consectetur turpis eu massa ultricies elementum. Nunc nec condimentum odio. Quisque rhoncus massa nec imperdiet vestibulum. Nunc auctor viverra quam, id gravida neque."
                />
                <Record />
            </div>
        </div>
    )
}