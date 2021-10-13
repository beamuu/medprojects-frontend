import { List } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import Item from "./Item";
import { HospitalListContext } from "../../contexts/HospitalList";
import { hospitalArray } from "../../data/hospital";

export default function HospitalList() {
    
    const { setHospitalIndex, setHospitalContractAddress } = useContext(HospitalListContext);

    const handleChangeHospital = (index: any, address: string) => {
        setHospitalIndex(index);
        setHospitalContractAddress(address);

    }

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
        >    
            {
                hospitalArray.map((element, key) => 
                <Item 
                    name={element.name}
                    location={element.location}
                    onClick={handleChangeHospital}
                    index={key}
                    address={element.address}
                />)
            }
            {/* <Item name="Bangkok Hospital" location="Bangkok, Thailand" onClick={() => setHospitalIndex(0)} />
            <Item name="Bamrungrad Hospital" location="Bangkok, Thailand" onClick={() => setHospitalIndex(1)} />
            <Item name="Siriraj Piyamaharajkarun Hospital" location="Bangkok, Thailand" onClick={() => setHospitalIndex(2)} />
            <Item name="Ramathibodi Hospital" location="Bangkok, Thailand" onClick={() => setHospitalIndex(3)} /> */}
        </List>
    )
}