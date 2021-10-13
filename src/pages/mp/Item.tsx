import { Divider, ListItem, ListItemText } from "@mui/material";

interface IItem {
    name?: string;
    location?: string;
    onClick?: any;
    index?: any;
    address?: string;
}


export default function Item({ name, location, onClick, index, address }: IItem) {
    return (
        <>
            <ListItem onClick={() => onClick(index, address)}>
                <ListItemText primary={name} secondary={location} style={{ cursor: "pointer"}} />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
        </>
    )
}