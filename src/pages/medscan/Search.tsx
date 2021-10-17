import { IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styled from "styled-components";
import { useState } from "react";

const CustomInput = styled.input`
    width: 100%;
    border: none;
    background-color: transparent;
    height: 50px;
    padding: 0 20px;
`
const IndexInput = styled.input`
    max-width: 70px;
    border: none;
    background-color: transparent;
    height: 50px;
    padding: 0 20px;
    border: 1px #adaba3 solid;
    border-width: 0 0 0 1px;
`

interface IProps {
    onSearch: any;
}

export default function Search({onSearch}: IProps) {
    const [address, setAddress] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSearch(address, index);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center justify-content-between">
                <CustomInput type="text" placeholder="Patient's contract address" value={address} onChange={(e: any) => setAddress(e.target.value)}/>
                <IndexInput 
                    type="number" 
                    placeholder="Record index" 
                    value={index} 
                    onChange={(e: any) => {
                        if (e.target.value < 0) {
                            return;
                        }
                        setIndex(e.target.value)
                    }} 
                    />
                <IconButton color="primary" onClick={handleSubmit}>
                    <SearchIcon />
                </IconButton>
            </div>
        </form>
    )
}

