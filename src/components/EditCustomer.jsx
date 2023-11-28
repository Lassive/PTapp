import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CustomerDialog from "./CustomerDialog";
import DialogTitle from '@mui/material/DialogTitle';


function EditCustomer({ fetchCustomers, data }) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city,
            email: data.email,
            phone: data.phone
        });
    };

    const handleClose = () => {
        setOpen(false);
    }

    const saveCustomer = () => {
        fetch(data.links[0].href, {
            method: 'PUT',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                handleClose();
            }
            else {
                throw new Error("Error when adding customer: " + response.statusText);
            }
        })  
        .catch(err => console.error(err))
    };

    const handleChange = (newValue, customerProps) => {
    setCustomer({ ...customer, [customerProps]: newValue });
};


    return (
        <div>
            <Button size="small" onClick={handleClickOpen}>
                edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <CustomerDialog customer={customer} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditCustomer;