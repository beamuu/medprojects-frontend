import { Divider, ListItem, ListItemText } from "@mui/material";

interface IItem {
    name?: string;
    location?: string;
    onClick?: any;
}


export default function Item({ name, location, onClick }: IItem) {
    return (
        <>
            <ListItem onClick={onClick}>
                <ListItemText primary={name} secondary={location} style={{ cursor: "pointer"}} />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
        </>
    )
}