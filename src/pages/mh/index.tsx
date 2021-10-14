import { Fragment, useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import Screen from "../../components/Screen";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../wallet/connectors";
import { useEffect } from "react";
import { Alert, CircularProgress, LinearProgress, Snackbar } from "@mui/material";
import { green } from "../../styles/colors";
import AddressInput from "./AddressInput";
import { HostContext } from "../../contexts/Host";
import { useHostedHospital } from "../../hooks/useHospital";
import Controls from "./Controls";


declare let window: any;

export default function Admin() {

    const { activate, account, chainId } = useWeb3React();
    const { hostedAddress } = useContext(HostContext);
    const { allow, valid } = useHostedHospital(hostedAddress, account);
    const [open, setOpen] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);
    const [showHostResult, setShowHostResult] = useState<boolean>(false);
    const [hostActive, setHostActive] = useState(false);

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

    useEffect(() => {
        connect();
        if (chainId !== 97) {
            requestChangeNetwork()
        }
    }, [])
    useEffect(() => {
        if (hostedAddress) {
            setShowHostResult(true);
        }
    }, [hostedAddress])
    useEffect(() => {
        if (allow === true) {
            setHostActive(true);
        }
        if (allow === true || allow === false) {
            setLoad(false);
        }
        else if (valid === false) {
            setLoad(false);
        }
    }, [allow, valid])
    console.log(hostActive);
    return (
        <>
            <Navbar />
            {
                load ? <LinearProgress /> : null
            }
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Connected to MetaMask"
                action={action}
            />
            {
                hostActive ?
                    (
                        <Controls />
                    ) :
                    (
                        <>
                            <Screen style={{ backgroundColor: "#636aff", margin: 0 }}>
                                <div className="container">
                                    <div className="mb-5" >
                                        <div className="row m-0" style={{ minHeight: "400px" }}>
                                            <div className="col-lg-6 d-flex justify-content-start align-items-center">
                                                <div>
                                                    <h3 className="text-white">Organize your Hospital</h3>
                                                    <p className="text-white mt-2">Control your hospital contract right in a second</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 d-flex justify-content-center align-items-center">
                                                <img src="https://content.thriveglobal.com/wp-content/uploads/2020/12/Organization-In-Leadership.png" width="100%" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Screen>
                            <Screen>
                                <div className="container">
                                    <div className="mb-5">
                                        <h5 className="mb-3">Enter your hospital address</h5>
                                        <div className="row">
                                            <div className="col">
                                                <div className="d-flex">
                                                    <AddressInput />
                                                </div>
                                            </div>
                                            <div className="col">
                                                {
                                                    showHostResult ? (
                                                        allow === null ? (
                                                            valid ? null : <Alert severity="error">Invalid Hospital address</Alert>
                                                        ) : (
                                                            allow === false ? (
                                                                <Alert severity="error">You dont have permission to host this hospital</Alert>
                                                            ) : (
                                                                allow === true ? (
                                                                    null
                                                                ) : null
                                                            )
                                                        )
                                                    ) :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Screen>
                        </>
                    )
            }

        </>
    )
}