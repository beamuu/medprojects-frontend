import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { HostContext } from "../../contexts/Host";

export default function AddressInput() {

    const { hostedAddress ,setHostedAddress } = useContext(HostContext);
    const [inputAddress, setInputAddress] = useState<string>("");
    const host = () => {
        setHostedAddress(inputAddress);
    }
    const handleChange = (e: any) => {
        setInputAddress(e.target.value);
    }
    return (
        <div className="d-flex align-items-end">
            <TextField onChange={handleChange} value={inputAddress} label="Hospital Address" variant="standard" style={{ width: "300px" }} />
            <Button onClick={host} className="ms-4" variant="contained" disableElevation size="medium" style={{ textTransform: "none" }}>Host</Button>
        </div>
    )
}