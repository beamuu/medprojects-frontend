import styled from "styled-components";

export interface IRecord {
    date?: string;
    department?: string;
    topic?: string;
    description?: string;
    doctor?: string;
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

function Row(props: any) {
    return (
        <div className="row m-0">
            <div className="col-4 p-0">
                <p><b>{props.title}</b></p>
            </div>
            <div className="col-8 p-0">{props.value}</div>
        </div>
    )
}

export default function Record({ date, department, topic, description, doctor }: IRecord) {
    return (
        <>
            <Conatainer>
                <h4>Patient Medical Record</h4>
                <hr className="mb-4" />

                <Row title="Patient's address" value="0x0000000000000"/>
                <Row title="Patient's contract address" value="0x0000000000000"/>
                <Row title="Date of admission" value="14/05/2022"/>
                <Row title="Admit" value="no"/>


                <div className="my-5">
                    <h5 className="my-3">Medical Treatments</h5>
                    <p><b>{topic}</b></p>
                    <p>{description}</p>
                </div>

                <div className="my-5">
                    <h5 className="my-3">Results</h5>
                    <p><b>Heart rate: </b>Normal</p>
                </div>


            </Conatainer>
            <hr />
        </>
    )
}