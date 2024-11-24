import { Button } from "react-bootstrap";
import "./PostUser.css";
import Form from "react-bootstrap/Form"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const PostUser = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    })

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formData);

        try {
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate("/", {state: {success: true, action: "add"}});
            }

            const data = await response.json();
            console.log("Employee created: ", data);
        

        } catch (error) {
            console.log("Error creating employee: ", error.message);
        }
    }

    return(
        <>
            <div className="center-form">
                <h1>Post New Employee</h1>
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

                    <Button variant="primary" type="submit" className="w-100">Post Employee</Button>
                </Form>
            </div>
        </>
    )
}

export default PostUser;