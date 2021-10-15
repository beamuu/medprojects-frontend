import { Button, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { FormContext } from "../../contexts/Form";
import DynamicForm from "./DynamicForm";

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
        startDate,
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

    // useEffect(() => {
    //     console.log(treatmentTopics);
    //     console.log(treatmentDescription);
    // }, [treatmentTopics, treatmentDescription])

    return (
        <RecordContainer>
            <div className="d-flex align-items-center my-2">
                <p>THIS RECORD IS FOR</p>
                <TextField id="standard-basic" label="Patient Address" variant="filled" className="mx-3" />
                <p>(ADDRESS ON PATIENT'S METAMASK)</p>
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
                <DynamicForm 
                    topic={treatmentTopics} 
                    setTopic={setTreatmentTopics} 
                    description={treatmentDescription}
                    setDescription={setTreatmentDescription}
                    title="Treatments"
                    />
                <Button onClick={() => alert(treatmentDescription[0])}>click me</Button>
            </div>
        </RecordContainer>
    )
}