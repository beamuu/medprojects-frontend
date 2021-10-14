import { TextField } from "@mui/material";
import { useContext } from "react";
import styled from "styled-components";
import { FormContext } from "../../contexts/Form";

const RecordContainer = styled.div`
    min-height: 400px;
    margin: 40px;
    padding: 40px;
    background-color: #fff;
    border 1px solid #dbdbdb;
    box-shadow: 0 0 6px rgba(0,0,0,0.07);
`

export default function Form() {
    
    const {
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
        
    } = useContext(FormContext);

    return (
        <RecordContainer>
            <div className="d-flex align-items-center my-2">
                <p>RECORD FOR</p>
                <TextField id="standard-basic" label="Patient Address" variant="filled" className="mx-3" />
            </div>
            <div className="d-flex align-items-center my-2">
                <p>BY</p>
                <TextField id="standard-basic" label="Department" variant="filled" className="mx-3" />
            </div>
            <div className="mt-5">
                <h4 className="mb-4">Patient Medical Record</h4>

                <div className="row mx-0 my-3" style={{ maxWidth: "500px"}}>
                    <div className="col d-flex align-items-center">
                        <p>Start date</p> 
                    </div>
                    <div className="col">
                        <input type="datetime-local"/>
                    </div>
                </div>

                <div className="row mx-0 my-3" style={{ maxWidth: "500px"}}>
                    <div className="col d-flex align-items-center">
                        <p>End date</p> 
                    </div>
                    <div className="col">
                        <input type="datetime-local"/>
                    </div>
                </div>

            </div>
        </RecordContainer>
    )
}