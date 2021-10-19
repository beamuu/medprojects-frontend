import { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Screen from "../../components/Screen";
import HospitalList from "./HospitalSelect";
import { HospitalListProvider } from "../../contexts/HospitalList";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MenuIcon from '@mui/icons-material/Menu';
import Hospital from "./Hospital";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../wallet/connectors";

import { Snackbar, SpeedDial, SpeedDialAction } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';

declare let window: any;

export default function Setup() {

    const { activate, active, account, chainId } = useWeb3React();
    const [open, setOpen] = useState(false);

    const connect = async () => {
        try {
            activate(injected);
        } catch (error) {
            alert("Can't connect to your wallet.");
        }
    }
    const requestChangeNetwork = () => {
        window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x61" }]
        }).then(() => setOpen(true));
    }


    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <Fragment>
        </Fragment>
    );

    const scrollToTop = () => {
        var objDiv: any = document.getElementById("top");
        objDiv.scrollIntoView();
        
    }
    const scrollToHospitalList = () => {
        var objDiv: any = document.getElementById("hospital-list");
        objDiv.scrollIntoView();
    }
    const actions = [
        { icon: <ArrowUpwardIcon />, name: 'Go to top', do: scrollToTop},
        { icon: <LocalHospitalIcon />, name: 'See hospital list', do: scrollToHospitalList },
    ];
    useEffect(() => {
        connect();
        if (chainId !== 97) {
            requestChangeNetwork()
        }
    }, [chainId])
    return (
        <>
            <Navbar />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Connected to MetaMask"
                action={action}
            />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<MenuIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.do}
                    />
                ))}
            </SpeedDial>
            <HospitalListProvider>
                <Screen style={{ margin: "0px" }}>
                    <div className="container mt-5" id="top">
                        <div className="row m-0">
                            <div className="col-lg-8">
                                <Hospital />
                            </div>
                            <div className="col-lg-4" id="hospital-list">
                                <h5 className="mt-4">Verified Medical Providers</h5>
                                <hr className="mb-3" />
                                <HospitalList />
                            </div>
                        </div>
                    </div>
                </Screen>
            </HospitalListProvider>
        </>
    )
}