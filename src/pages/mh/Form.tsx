import { Button, TextField } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FormContext } from "../../contexts/Form";
import { HostContext } from "../../contexts/Host";
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

    const { account } = useWeb3React();
    const { hostedAddress } = useContext(HostContext);
    const {
        startDate,
        endDate,
        department,
        treatmentTopics,
        treatmentDescription,
        resultTopics,
        resultDescription,
        doctor,
        doctorResponsibility,
        setStartDate,
        setEndDate,
        setDepartment,
        setTreatmentTopics,
        setTreatmentDescription,
        setResultTopics,
        setResultDescription,
        setDoctor,
        setDoctorResponsibility,
        addRecordTo
    } = useContext(FormContext);

    const [patientAddress, setPatientAddress] =  useState<string>("");
    
    const handleStartDateChange = (e: any) => {
        var _date = new Date(e.target.value);
        setStartDate(_date.getTime())
    }

    const handleEndDateChange = (e: any) => {
        var _date = new Date(e.target.value);
        setEndDate(_date.getTime())
    }

    const handleUpload = (e: any) => {
        addRecordTo(hostedAddress, patientAddress, account);
    }

    return (
        <RecordContainer>
            <div className="d-flex align-items-center my-2">
                <p>THIS RECORD IS FOR</p>
                <TextField id="standard-basic" label="Patient Address" variant="filled" className="mx-3" onChange={(e: any) => setPatientAddress(e.target.value)}/>
                <p>(ADDRESS ON PATIENT'S METAMASK)</p>
            </div>
            <div className="d-flex align-items-center my-2">
                <p>BY</p>
                <TextField id="standard-basic" label="Department" variant="filled" className="mx-3" onChange={(e: any) => setDepartment(e.target.value)}/>
            </div>
            <div className="mt-5">
                <h4 className="mb-4">Patient Medical Record</h4>

                <div className="row mx-0 my-3" style={{ maxWidth: "500px"}}>
                    <div className="col d-flex align-items-center">
                        <p>Start date</p> 
                    </div>
                    <div className="col">
                        <input type="datetime-local" onChange={handleStartDateChange}/>
                    </div>
                </div>

                <div className="row mx-0 my-3" style={{ maxWidth: "500px"}}>
                    <div className="col d-flex align-items-center">
                        <p>End date</p> 
                    </div>
                    <div className="col">
                        <input type="datetime-local" onChange={handleEndDateChange}/>
                    </div>
                </div>
                <DynamicForm 
                    topic={treatmentTopics} 
                    setTopic={setTreatmentTopics} 
                    description={treatmentDescription}
                    setDescription={setTreatmentDescription}
                    title="Treatments"
                    topicLabel="treatment"
                    descriptionLabel="details (1 line or more)"
                    />
                <DynamicForm 
                    topic={resultTopics} 
                    setTopic={setResultTopics} 
                    description={resultDescription}
                    setDescription={setResultDescription}
                    title="Results"
                    topicLabel="result"
                    descriptionLabel="details (1 line or more)"
                    />
                <DynamicForm 
                    topic={doctor} 
                    setTopic={setDoctor} 
                    description={doctorResponsibility}
                    setDescription={setDoctorResponsibility}
                    title="Medical Personnels"
                    topicLabel="name"
                    descriptionLabel="responsibility"
                    />
                <div className="d-flex">
                    <Button onClick={handleUpload} size="large" variant="contained" className="mx-2">Upload record</Button>
                    <Button onClick={() => {}} size="large" variant="outlined" className="mx-2">Check</Button>
                    <Button onClick={() => {}} size="large" variant="outlined" className="mx-2" color="error">Clear</Button>
                </div>
                
            </div>
        </RecordContainer>
    )
}