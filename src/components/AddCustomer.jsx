import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerDialog from "./CustomerDialog";

function AddCustomer({ fetchCustomers }) {

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
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveCustomer = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers', {
        method: 'POST',
        headers: { 'Content-type':'application/json' },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (response.ok)
            fetchCustomers();
        else
            throw new Error("Error when adding customer: " + response.statusText);
    })
    .catch(err => console.error(err))
    handleClose();
    };


    const handleChange = (value, field) => {
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [field]: value,
        }));
    };

    return (
        <div>
    <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>

        </div>

    );

}

export default AddCustomer;