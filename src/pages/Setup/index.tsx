import Navbar from "../../components/Navbar";
import Screen from "../../components/Screen";
import HospitalList from "./HospitalSelect";
import { HospitalListContext, HospitalListProvider } from "../../contexts/HospitalList";
import { useContext } from "react";
import Hospital from "./Hospital";
export default function Setup() {
    return (
        <>
            <Navbar />
            <HospitalListProvider>
                <Screen style={{ margin: "0px" }}>
                    <div className="container mt-5">
                        <div className="row m-0">
                            <div className="col-lg-8">
                                <Hospital/>
                            </div>
                            <div className="col-lg-4">
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