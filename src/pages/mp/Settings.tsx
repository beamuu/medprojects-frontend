import { Button, TextField } from "@mui/material";

export default function Settings() {
    return (
        <div>
            <h5 className="my-4">Permissions</h5>
            <p>Add or remove permission to the specific address from the specific record allowances.</p>
            <div className="my-4">
                <div className="d-flex align-items-center my-3">
                    <p>I'm going to allow</p>
                    <TextField label="address" variant="outlined" size="small" className="mx-4" />
                    <p>to view my record number</p>
                    <TextField
                        id="outlined-number"
                        type="number"
                        size="small"
                        className="mx-4"
                        style={{
                            maxWidth: "80px"
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <Button variant="outlined">Add</Button>
                <hr />
                <div className="d-flex align-items-center my-3">
                    <p>I'm going to remove</p>
                    <TextField label="address" variant="outlined" size="small" className="mx-4" />
                    <p>from my allowance on record number</p>
                    <TextField
                        id="outlined-number"
                        type="number"
                        size="small"
                        className="mx-4"
                        style={{
                            maxWidth: "80px"
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <Button variant="outlined" color="error">
                    Remove
                </Button>
                <div className="my-5">
                    <h5 className="my-3">Check allowance of address</h5>
                    <div>
                        <TextField label="address" variant="outlined" size="small" className="me-4" />
                        <TextField
                            id="outlined-number"
                            type="number"
                            size="small"
                            className="me-4"
                            style={{
                                maxWidth: "80px"
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}