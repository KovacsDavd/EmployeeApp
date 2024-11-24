import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"
import Col from "react-bootstrap/Col"
import { useLocation, useNavigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Dashboard = () => {

    const { state } = useLocation();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (state?.success) {
            if (state.action === "add") {
                setToastMessage("Employee added successfully!")
            } else {
                setToastMessage("Employee updated successfully!")
            }
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    }, [state]);

    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await response.json();

                setEmployees(data);
            } catch (error) {
                console.error("Error feching employees", error.message);
            }
        }

        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) =>employee.id !== employeeId)
            )
            }

            console.log("Employee with ID(${employeeId} deleted!");
        } catch (error) {
            console.error("Error deleting employee");
        }
    }

    const handleUpdate = (employeeId) => {
        navigate("/employee/update", { state: {id: employeeId}});
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">employees</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => handleUpdate(employee.id)}>Update</Button>{" "}
                                            <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            <ToastContainer position="top-center" className="mt-5">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default Dashboard;