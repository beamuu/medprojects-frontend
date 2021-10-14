import { useContext, useEffect, useState } from "react"
import { HostContext } from "../../contexts/Host"
import { getHospitalInfo, IHospital, useHostedHospital } from "../../hooks/useHospital"
import Screen from "../../components/Screen";
import { useWeb3React } from "@web3-react/core";
import { Button, Skeleton, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Form from "./Form";
import { FormProvider } from "../../contexts/Form";





export default function Controls() {
    const { account } = useWeb3React();
    const { hostedAddress } = useContext(HostContext);
    const { owner } = useHostedHospital(hostedAddress, account);
    const [ready, setReady] = useState<boolean>(false);
    const [hospital, setHospital] = useState<IHospital | null>(null);

    const [time1, setTime1] = useState(new Date(Date.now()));
    const [time2, setTime2] = useState(new Date(Date.now()));

    const initHospital = async () => {
        const g = await getHospitalInfo(hostedAddress);
        setHospital(g);
    }
    const handleTimeChange1 = (newValue: any) => {
        setTime1(newValue);
    };
    const handleTimeChange2 = (newValue: any) => {
        setTime2(newValue);
    };
    console.log(time1, time2);
    useEffect(() => {
        if (hostedAddress && owner && account) {
            initHospital();
        }
    }, [hostedAddress, owner, account])

    useEffect(() => {
        if (hospital !== null && hospital?.name && hospital.id) {
            setReady(true);
        }
        else {
            setReady(false);
        }
    }, [hospital])

    return (
        <Screen>
            {
                <div className="container mt-5">
                    {
                        !ready ? (
                            <div className="full-width">
                                <Skeleton variant="rectangular" width="100%" height={118} className="my-2" />
                                <Skeleton width="80%" height="40px" className="my-2" />
                                <Skeleton width="60%" height="40px" className="my-2" />
                                <Skeleton width="60%" height="40px" className="my-2" />
                                <Skeleton width="60%" height="40px" className="my-2" />
                            </div>
                        ) :
                            (
                                <div>
                                    <h3>{hospital?.name}</h3>
                                    <p className="mb-5"><LocationOnIcon /> {hospital?.location}</p>
                                    <div className="d-flex align-items-center">
                                        <TextField id="standard-basic" label="New patient address" variant="standard" />
                                        <Button variant="contained" className="mx-3">add</Button>
                                    </div>
                                    <FormProvider>
                                        <Form />
                                    </FormProvider>
                                </div>
                            )
                    }

                </div>
            }

        </Screen>
    )
}