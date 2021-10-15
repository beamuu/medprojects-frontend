import { IconButton, TextField, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormContext } from "../../contexts/Form";

interface IProps {
    topic: string[];
    description: string[];
    setTopic: any;
    setDescription: any;
    title: string;
}

const Container = styled.div`
    background-color: transparent;
    min-height: 100px;
    margin: 30px 0;
    padding: 30px 20px;
    border-radius: 6px;
    border: solid 1px #bfd6f5;
`

export default function DynamicForm({ topic, description, setTopic, setDescription, title }: IProps) {

    const [comps, setComps] = useState<any[]>([]);
    const [re, setRe] = useState<boolean>(false);
    const toggleRender = () => {
        setRe(!re);
    }
    const preRender = () => {
        const tmp = [];
        for (var i = 0; i < topic.length; i++) {
            console.log(i);
            tmp.push(
                <Each
                    for=""
                    index={i}
                />
            )
        }
        setComps(tmp);
    }

    const handleAddField = () => {
        setTopic([...topic, ""]);
        setDescription([...description, ""]);
    }

    useEffect(() => {
        console.log("rendering");
        preRender();
    }, [topic, description])

    useEffect(() => {
        console.log("comps changed")
        console.log(comps);
    }, [comps])

    return (
        <Container>
            <h5 className="mb-3">{title}</h5>
            {
                comps.map((comp: any) => comp)
            }
            <div className="d-flex justify-content-center my-3">
                <Tooltip title="Add field">
                    <IconButton>
                        <AddCircleIcon fontSize="large" sx={{ color: "#3adeaf" }} onClick={handleAddField} />
                    </IconButton>
                </Tooltip>
            </div>

        </Container>
    )
}

interface IEach {
    index: number;
    target: string;
}

function Each({ index, target }: IEach) {

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

    const [topicInput, setTopicInput] = useState();
    const [descriptionInput, setDescriptionInput] = useState();

    const handleTopicChange = async (e: any) => {
        setTopicInput(e.target.value);
    }
    const handleDescriptionChange = (e: any) => {
        setDescriptionInput(e.target.value);
    }
    const handleRemove = () => {
    }




    return (
        <div className="row m-0 my-4">
            <div className="col-3">
                <TextField value={topicInput} onChange={handleTopicChange} label="Topic" error={!topicInput ? true : false} variant="filled" size="small" helperText={!topicInput ? "Topic?" : ""}></TextField>
            </div>
            <div className="col-6">
                <TextField value={descriptionInput} onChange={handleDescriptionChange} error={!descriptionInput ? true : false} label="Details (1 line or more)" size="small" variant="filled" multiline style={{ width: "100%" }} helperText={!descriptionInput ? "Field is empty" : ""}></TextField>
            </div>
            <div className="col-2 d-flex justify-content-end align-items-center">
                <Tooltip title="Delete field">
                    <IconButton onClick={handleRemove}>
                        <DeleteIcon sx={{ color: "#ed215e" }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}