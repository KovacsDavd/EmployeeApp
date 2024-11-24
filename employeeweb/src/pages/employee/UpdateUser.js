import { useEffect, useState } from 'react';
import './UpdateUser.css';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateUSer = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {id} = location.state || {};

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    })

    useEffect(() => {
        const fetchEmployee = async () => {
            try{
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fething User: ", error.message);
            }
        }

        fetchEmployee();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            console.log("User updated: ", data);

            navigate("/", {state: {success: true, action: "edit"}});
        } catch (error) {
            console.error("Error in update: ", error.message);
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }

    return (
        <>
        <div className="center-form">
            <h1>Edit Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" name="name" placeholder="Enter name"
                     value={formData.name} onChange={handleInputChange} required/>
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control type="email" name="email" placeholder="Enter email"
                     value={formData.email} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" name="phone" placeholder="Enter phone"
                     value={formData.phone} onChange={handleInputChange} required/>
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" name="department" placeholder="Enter department"
                     value={formData.department} onChange={handleInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Edit Employee</Button>
            </Form>
        </div>
    </>
    )
}

export default UpdateUSer;