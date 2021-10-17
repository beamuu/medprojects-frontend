import Navbar from "../../components/Navbar";
import Search from "./Search";

export const searchRecord = (address: string, index: number) => {
    if (!address || !index) {
        return alert("please provide both information!");
    }
    window.location.href=`/medscan/${address}/${index}`;
    return;
}

export default function MedScan() {
    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row m-0 my-5">
                    <div className="col-lg p-0" style={{ border: "1px solid #adaba3", borderRadius: "7px"}}>
                        <Search onSearch={searchRecord}/>
                    </div>
                    <div className="col-lg p-0"></div>
                </div>
            </div>
        </>
    )
}

