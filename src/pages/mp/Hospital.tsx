import { Alert, Button, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import { useContext, useEffect, useState } from "react";
import Address from "../../components/Address";
import { HospitalListContext } from "../../contexts/HospitalList";
import { hospitalArray } from "../../data/hospital";
import useHospital from "../../hooks/useHospital";
import RecordView from "./RecordView";
import Settings from "./Settings";

export default function Hospital() {
    const { account } = useWeb3React();
    const { hospitalIndex, hospitalContractAddress } = useContext(HospitalListContext);
    const [value, setValue] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const { owner, patient } = useHospital(hospitalContractAddress, account);
    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (patient) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }, [patient]);

    if (!show) {
        return (<>
            <Skeleton variant="rectangular" width="100%" height={118} className="my-2"/>
            <Skeleton variant="text" width="60%" height={30} className="my-2"/>
            <Skeleton variant="text" width="40%" height={30} className="my-2"/>
            <Skeleton variant="text" width="40%" height={30} className="my-2"/>
        </>)
    }

    

    return (
        <div>
            <h4>{hospitalArray[hospitalIndex].name}</h4>
            <p>{hospitalArray[hospitalIndex].location}</p>

            <Box sx={{ borderBottom: 1, borderColor: '#dbdbdb', margin: "50px 0 0 0" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="info" />
                    <Tab label="contracts" />
                    <Tab label="records" />
                    <Tab label="settings" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Alert severity="error">This medical privider does not provide us any information.</Alert>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Alert severity="success" className="my-3">Smart Contract verified</Alert>
                <Button variant="text">view contracts source code</Button>
                <div className="row m-0 my-3 d-flex align-items-end">
                    <div className="col-lg-4">
                        <h6>Contract address</h6>
                    </div>
                    <div className="col-lg-8">
                        <Address>{hospitalContractAddress}</Address>
                    </div>
                </div>
                <div className="row m-0 my-3">
                    <div className="col-lg-4">
                        <h6>Owner address</h6>
                    </div>
                    <div className="col-lg-8">
                        <Address>{owner}</Address>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <RecordView />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Settings />
            </TabPanel>
        </div>
    )
}

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
