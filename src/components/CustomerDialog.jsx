import { DialogContent, TextField } from "@mui/material";


function CustomerDialog({ customer, handleChange }) {

    return (
        <DialogContent>
            <TextField 
                margin="dense"
                label="Firstname"
                fullWidth
                variant="standard"
                value={customer.firstname}
                onChange={(e) => handleChange(e.target.value, 'firstname')}
            />
            <TextField
                margin="dense"
                label="Lastname"
                fullWidth
                variant="standard"
                value={customer.lastname}
                onChange={(e) => handleChange(e.target.value, 'lastname')}
            />
            <TextField
                margin="dense"
                label="Streetaddress"
                fullWidth
                variant="standard"
                value={customer.streetaddress}
                onChange={(e) => handleChange(e.target.value, 'streetaddress')}
            />
            <TextField
                margin="dense"
                label="Postcode"
                fullWidth
                variant="standard"
                value={customer.postcode}
                onChange={(e) => handleChange(e.target.value, 'postcode')}
            />
            <TextField
                margin="dense"
                label="City"
                fullWidth
                variant="standard"
                value={customer.city}
                onChange={(e) => handleChange(e.target.value, 'city')}
            />
            <TextField
                margin="dense"
                label="Email"
                fullWidth
                variant="standard"
                value={customer.email}
                onChange={(e) => handleChange(e.target.value, 'email')}
            />
            <TextField
                margin="dense"
                label="Phone"
                fullWidth
                variant="standard"
                value={customer.phone}
                onChange={(e) => handleChange(e.target.value, 'phone')}
            />

        </DialogContent>
    );
}

export default CustomerDialog;