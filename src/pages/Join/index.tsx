import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";
import Screen from "../../components/Screen";
import UserTypeCard from "./UserTypeCard";

export default function Join() {
    const history = useHistory();
    return (
        <>
            <Navbar />
            <Screen style={{ margin: "0px"}}>
                <div className="container">
                    <div className="row m-0 py-5">
                        <div className="col-lg p-4 d-flex justify-content-center align-items-center" style={{ minHeight: "500px"}}>
                            <div>
                                <h1>First <span style={{ color: "#00bf7c" }}>+</span></h1>
                                <h3>Tell us who you are.</h3>
                            </div>
                        </div>
                        <div className="col-lg d-flex align-items-center">
                            <div className="full-width">
                                <UserTypeCard title="Patients" desc="I am looking for a medical data storage technology." color="#00bf7c" onClick={() => history.push("/mp")}/>
                                <UserTypeCard title="Medical Providers" desc="We need a smart contracts for storing customer's data." color="#0a55f7" onClick={() => history.push("/mh")}/>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <p>Please read the details below and accept the conditions at the end of the page.</p>
                    </div>
                </div>
            </Screen>

            <Screen>
                <div className="container my-5">
                    <hr className="my-5" />
                    <div className="text-center">
                        <h4>What you need for creating your profile on blockchain</h4>
                        <div className="row m-0 my-5">
                            <div className="col-lg d-flex justify-content-center align-items-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png" width="40%"/>
                            </div>
                            <div className="col-lg d-flex align-items-center">
                                <div className="text-start">
                                    <h3>MetaMask</h3>
                                    <p>A crypto wallet & gateway to blockchain apps</p>
                                    <Button variant="contained" className="my-3">Get MetaMask</Button>
                                </div>
                            </div>
                        </div>
                        <div className="row m-0 my-5">
                            <div className="col-lg d-flex justify-content-center align-items-center">
                                <img src="https://cdn.pixabay.com/photo/2021/04/30/16/47/bnb-6219388_640.png" width="40%"/>
                            </div>
                            <div className="col-lg d-flex align-items-center">
                                <div className="text-start">
                                    <h3>BNB</h3>
                                    <p>A cryptocurrency used on Binance Smart Chain</p>
                                    <Button variant="contained" className="my-3">How to buy BNB</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Screen>

            <Screen>
                <div className="container my-5">
                    <hr className="my-5" />
                    <div className="text-center">
                        <h4>Understanding Blockchain</h4>
                        <div className="mt-5">
                            <p>Blockchain is one kind of Distributed Ledger Technology (DLT)</p>
                        </div>
                    </div>
                </div>
            </Screen>
            
        </>
    )
}