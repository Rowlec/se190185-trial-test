import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Toast, Table, Image } from 'react-bootstrap'
import { deleteLesson, getLessons } from '../services/lesson.services'
import { useNavigate } from 'react-router'
export default function AllLessons() {
    const navigation = useNavigate()
    const [lessons, setLesson] = useState([])
    const [success, setSuccess] = useState(false)
    const [show, setShow] = useState(false)
    useEffect(() => {
        fetchAllLessons()
    }, [success])

    const fetchAllLessons = async () => {
        const lessonsData = await getLessons()
        const sortLessons = await lessonsData.data.sort((a, b) => b.id - a.id)
        setLesson(sortLessons)
    }
    const handleDelete = async (id) => {
        await deleteLesson(id)
        setShow(true)
        setSuccess(true)
    }

    return (
        <Container>
            <Row className='mt-2 g-4' >
                <Toast
                    className='position-fixed top-0 end-0 mx-3'
                    onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Body>Delete successfully!</Toast.Body>
                </Toast>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <td>Image</td>
                                <td>Title</td>
                                <td>Time</td>
                                <td>Level</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((l) => (
                                <tr key={l.id}>
                                    <td><Image src={l.lessonImage} rounded style={{ width: 80 }} /></td>
                                    <td onClick={() => navigation(`/se123456/lessons/${l.id}`)}>{l.lessonTitle}</td>
                                    <td>{l.estimatedTime}</td>
                                    <td>{l.level}</td>
                                    <td>
                                        <span
                                            onClick={() => navigation(`/se123456/lessons/edit/${l.id}`)}
                                            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', marginRight: '10px' }}>
                                            Edit
                                        </span>
                                        |
                                        <span
                                            onClick={() => { if (window.confirm('Are you sure?')) handleDelete(l.id) }}
                                            style={{ cursor: 'pointer', color: 'red', textDecoration: 'underline', marginLeft: '10px' }}>
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
