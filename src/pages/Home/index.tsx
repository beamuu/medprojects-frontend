import Button from "@mui/material/Button";
import Navbar from "../../components/Navbar";
import Screen from "../../components/Screen";
import { useHistory } from "react-router";
export default function Home() {
    const history = useHistory();
    return (
        <>
            <Navbar />
            <Screen style={{ backgroundColor: "#f0f2f5", margin: "0px"}}>
                <div className="container">
                    <div className="row m-0 py-5" style={{ minHeight: "600px"}}>
                        <div className="col-lg p-4 full-height d-flex justify-content-center align-items-center">
                            <div>
                                <h3>Access your medical data from everywhere</h3>
                                <p className="mb-5">Store your medical records and data on blockchain.</p>
                                <Button variant="contained" className="me-3" onClick={() => history.push("/join")}>JOIN NOW</Button>
                                <Button variant="outlined">What is medprojects</Button>
                            </div>
                        </div>
                        <div className="col-lg full-height">
                            
                        </div>
                    </div>
                </div>
            </Screen>

            <Screen>
                <div className="container my-5">
                    <div className="text-center">
                        <h4>Tell us who you are</h4>
                    </div>
                </div>
            </Screen>
            
        </>
    )
}