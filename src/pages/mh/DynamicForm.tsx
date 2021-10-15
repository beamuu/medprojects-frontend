import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormContext } from "../../contexts/Form";

interface IProps {
    topic: string[];
    description: string[];
    setTopic: React.Dispatch<React.SetStateAction<string[]>>;
    setDescription: React.Dispatch<React.SetStateAction<string[]>>;
    title: string;
    topicLabel: string;
    descriptionLabel: string;
}

const Container = styled.div`
    background-color: transparent;
    min-height: 100px;
    margin: 30px 0;
    padding: 30px 20px;
    border-radius: 6px;
    border: solid 1px #a8aab3;
`

export default function DynamicForm({ topic, description, setTopic, setDescription, title, topicLabel, descriptionLabel }: IProps) {

    const [comps, setComps] = useState<any[]>([]);


    const preRender = () => {
        const tmp = [];
        for (var i = 0; i < topic.length; i++) {

            tmp.push(
                <Each
                    topic={topic}
                    description={description}
                    setTopic={setTopic}
                    setDescription={setDescription}
                    index={i}
                    topicLabel={topicLabel}
                    descriptionLabel={descriptionLabel}
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
        preRender();
    }, [topic])



    return (
        <Container>
            <h5 className="mb-3">{title}</h5>
            {
                comps.map((comp: any) => comp)
            }
            <div className="d-flex justify-content-center mt-3">
                <Tooltip title="Add field">
                    <IconButton>
                        <AddCircleIcon fontSize="large" sx={{ color: "#d5d8e3" }} onClick={handleAddField} />
                    </IconButton>
                </Tooltip>
            </div>

        </Container>
    )
}

interface IEach {
    index: number;
    topic: string[];
    description: string[];
    setTopic: React.Dispatch<React.SetStateAction<string[]>>;
    setDescription: React.Dispatch<React.SetStateAction<string[]>>;
    topicLabel: string;
    descriptionLabel: string;
}

function Each({ index, topic, setTopic, description, setDescription, topicLabel, descriptionLabel }: IEach) {

    const [topicInput, setTopicInput] = useState(topic[index]);
    const [descriptionInput, setDescriptionInput] = useState(description[index]);
    const [deleted, setDeleted] = useState(false);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        let tmp = topic;
        tmp[index] = topicInput;
        setTopic(tmp);
    }, [topicInput]);

    useEffect(() => {
        let tmp = description;
        tmp[index] = descriptionInput;
        setDescription(tmp);
    }, [descriptionInput]);

    const handleTopicChange = async (e: any) => {
        setTopicInput(e.target.value);
    }
    const handleDescriptionChange = (e: any) => {
        setDescriptionInput(e.target.value);
    }
    const handleRemove = () => {
        if (topic.length < 2 || description.length < 2) {
            return handleClickOpen();
        }
        let _topic = topic;
        let _description = description;
        _topic.splice(index, 1);
        _description.splice(index, 1);
        setTopic([..._topic]);
        setDescription([..._description]);
    }

    if (deleted) {
        return null;
    }


    return (
        <div className="row m-0 my-4">
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Can't delete this field
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Every topics need to have at least one field. If you want to leave this blank, use "-" instead.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>I got it</Button>
                </DialogActions>
            </Dialog>
            <div className="col-3">
                <TextField value={topicInput} onChange={handleTopicChange} label={topicLabel} error={!topicInput ? true : false} variant="filled" size="small" helperText={!topicInput ? `${topicLabel}?` : ""}></TextField>
            </div>
            <div className="col-6">
                <TextField value={descriptionInput} onChange={handleDescriptionChange} error={!descriptionInput ? true : false} label={descriptionLabel} size="small" variant="filled" multiline style={{ width: "100%" }} helperText={!descriptionInput ? "Field is empty" : ""}></TextField>
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