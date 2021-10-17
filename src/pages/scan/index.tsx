import { useHistory, useParams } from "react-router";
import Navbar from "../../components/Navbar";
import web3 from "../../providers/web3";
import { searchRecord } from "../medscan";
import Search from "../medscan/Search";
import compiledPatient from "../../contracts/Patient.json";
import { AbiItem } from "web3-utils";
import { useEffect, useState } from "react";
import Record, { IRecord } from "../mp/Record";


export default function Scan() {
    const history = useHistory();
    const { patientAddress, index }: any = useParams();
    const PatientInstance = new web3.eth.Contract(compiledPatient.abi as AbiItem[]);
    const [data, setData] = useState<IRecord | null>(null);
    const [load, setLoad] = useState<boolean>(true);
    const [fail, setFail] = useState<boolean>(false);
    const [error, setError] = useState();
    
    console.log(patientAddress, index);

    if (!patientAddress || !index) {

        alert("Invalid arguments");
        history.push("/medscan");
    }

    const init = async () => {
        try {
            PatientInstance.options.address = patientAddress
            const data = await PatientInstance.methods.getExactRecord(parseInt(index)).call();
            setData(data);
        } catch (err: any) {
            setFail(true);
            setError(err);
        }
        setLoad(false);
    }

    useEffect(() => {
        init();
    }, [])

    

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row m-0 my-5">
                    <div className="col-lg p-0" style={{ border: "1px solid #adaba3", borderRadius: "7px" }}>
                        <Search onSearch={searchRecord} />
                    </div>
                    <div className="col-lg p-0"></div>
                </div>
                <div className="mt-5">
                    {
                        data !== null ? (
                            <Record
                                data={data}
                                patient=""
                                contract={patientAddress}
                                index={index}
                            />
                        ): 
                        (
                            fail ? (
                                null
                            ):
                            null
                        )
                    }

                </div>
            </div>
        </>
    )
}