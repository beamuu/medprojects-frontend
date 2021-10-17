import { Topic } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";

export interface IRecord {
    _dateStart: any
    _dateEnd: any
    _department: string
    _treatmentTopics: string[]
    _treatmentDescription: string[]
    _resultTopics: string[]
    _resultDescription: string[]
    _doctor: string[]
    _doctorResponsibility: string[]
}

interface IProps {
    data: IRecord
    patient: string | null | undefined
    contract: string
    index: number
}

interface IRow {
    title: string
    value: string | null | undefined
    key?: number
}

const Conatainer = styled.div`
    margin: 40px 10px;
    background-color: #fff;
    width: 100%;
    min-height: 400px;
    padding: 60px 40px;
    border: 1px solid #ebebeb;
    box-shadow: 0 0 6px rgba(0,0,0,0.07);
`


function Row(props: IRow) {
    return (
        <div className="row m-0 my-3" key={props.key ? props.key.toString() : ""}>
            <div className="col-4 p-0">
                <p><b>{props.title}</b></p>
            </div>
            <div className="col-8 p-0 text-break">{props.value}</div>
        </div>
    )
}

export default function Record({ data, patient, contract, index }: IProps) {

    const [treatments, setTreatments] = useState<IRow[]>([]);
    const [results, setResults] = useState<IRow[]>([]);
    const [doctors, setDoctors] = useState<IRow[]>([]);

    const preRender = () => {
        let _treatments = [];
        let _results = [];
        let _doctors = [];
        for (var i=0 ; i<data._treatmentTopics.length; i++) {
            _treatments.push({title:data._treatmentTopics[i], value:data._treatmentDescription[i]});
        }
        for (var i=0 ; i<data._treatmentTopics.length; i++) {
            _results.push({title:data._resultTopics[i], value:data._resultDescription[i]});
        }
        for (var i=0 ; i<data._treatmentTopics.length; i++) {
            _doctors.push({title:data._doctor[i], value:data._doctorResponsibility[i]});
        }
        setTreatments([..._treatments]);
        setResults([..._results]);
        setDoctors([..._doctors]);
    }

    useEffect(() => {
        if (data._dateStart) {
            preRender();
        }
    }, [data])

    useEffect(() => {
        console.log(data);
    }, [treatments])

    

    return (
        <>
            <Conatainer key={index}>
                <div className="d-flex justify-content-end">record {index}</div>
                <h4>Patient Medical Record</h4>
                <hr className="mb-4" />

                <Row title="Patient" value={patient ? patient : "unknown"}/>
                <Row title="Contract" value={contract}/>
                <Row title="Date of admission (started)" value={new Date(parseInt(data._dateStart)*1000).toLocaleString()}/>
                <Row title="Date of admission (ended)" value={new Date(parseInt(data._dateEnd)*1000).toLocaleString()}/>

                <div className="my-5">
                    <h5 className="my-3">Medical Treatments</h5>
                    { treatments.map((element: any, index: number) => <Row title={element.title} value={element.value} key={index}/>)}
                </div>

                <div className="my-5">
                    <h5 className="my-3">Results</h5>
                    { results.map((element: any, index: number) => <Row title={element.title} value={element.value} key={index}/>)}
                </div>

                <div className="my-5">
                    <h5 className="my-3">Relevant Medical Personnels</h5>
                    { doctors.map((element: any, index: number) => <Row title={element.title} value={element.value} key={index}/>)}
                </div>


            </Conatainer>
            <hr />
        </>
    )
}