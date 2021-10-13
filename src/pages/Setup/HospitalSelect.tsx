import { List } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import Item from "./Item";
import { HospitalListContext } from "../../contexts/HospitalList";

export default function HospitalList() {
    
    const { setHospitalIndex } = useContext(HospitalListContext);

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
        >    
            <Item name="Bangkok Hospital" location="Bangkok, Thailand" onClick={() => setHospitalIndex(0)} />
            <Item name="Bamrungrad Hospital" location="Bangkok, Thailand" onClick={() => setHospitalIndex(1)} />
            <Item name="Siriraj Piyamaharajkarun Hospital" location="Bangkok, Thailand" onClick={() => setHospitalIndex(2)} />
            <Item name="Ramathibodi Hospital" location="Bangkok, Thailand" onClick={() => setHospitalIndex(3)} />
        </List>
    )
}