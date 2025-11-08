import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button, Toast, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { createLesson, getLessons } from '../services/lesson.services'
import { useFormik } from 'formik'
import * as Yup from 'yup';

export default function AllLesson() {
    const [lessons, setLessons] = useState([])
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false) //chưa làm thì mặc định là false
    const [show, setShow] = useState(false)
    const schema = {
        lessonTitle: Yup.string().required('Required').matches(/^[a-zA-Z0-9\s]+$/, 'Only alphanumeric characters and spaces are allowed'),
        lessonImage: Yup.string().url('Invalid URL').required('Required'),
        estimatedTime: Yup.number().min(0, 'Must be non-negative').required('Required'),
        isCompleted: Yup.boolean().required('Required'),
        level: Yup.string().oneOf(['N1', 'N2', 'N3', 'N4', 'N5'], 'Invalid level').required('Required')
    }

    const formik = useFormik({
        initialValues: {
            lessonTitle: '',
            lessonImage: '',
            estimatedTime: '0',
            isCompleted: false,
            level: ''
        },
        validationSchema: Yup.object(schema),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                await createLesson(values)
                setSuccess(true)
                setShow(true)
                fetchAllLessons()
            } catch (error) {
                console.error("Error adding lesson:", error)
            }
        }
    })

    const fetchAllLessons = async () => {
        try {
            const lessonData = await getLessons()
            setLessons(lessonData.data)
            console.log(lessonData)
        } catch (error) {
            console.error("Error fetching lessons:", error)
        }
    }

    return (
        <Container>
            <Row className='mt-2 g-4'>
                <Col>
                    <Toast show={show} onClose={() => setShow(false)} delay={10000} autohide>
                        <Toast.Body>Lesson added successfully!</Toast.Body>
                    </Toast>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Lesson Title</Form.Label>
                            <Form.Control type="text" name="lessonTitle" placeholder="Name" value={formik.values.lessonTitle}
                                onChange={formik.handleChange} />
                            {formik.errors.lessonTitle && formik.touched.lessonTitle && (
                                <div className="text-danger">{formik.errors.lessonTitle}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" name="lessonImage" placeholder="https://example.com/image.jpg" value={formik.values.lessonImage}
                                onChange={formik.handleChange} />
                            {formik.errors.lessonImage && formik.touched.lessonImage && (
                                <div className="text-danger">{formik.errors.lessonImage}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Estimated Time</Form.Label>
                            <Form.Control type="number" name="estimatedTime" placeholder="EstimatedTime" value={formik.values.estimatedTime}
                                onChange={formik.handleChange} />
                            {formik.errors.estimatedTime && formik.touched.estimatedTime && (
                                <div className="text-danger">{formik.errors.estimatedTime}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>isCompleted</Form.Label>
                            <Form.Control type="text" name="isCompleted" placeholder="true/false" value={formik.values.isCompleted}
                                onChange={formik.handleChange} />
                            {formik.errors.isCompleted && formik.touched.isCompleted && (
                                <div className="text-danger">{formik.errors.isCompleted}</div>
                            )}
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formLevel">
                            <Form.Label>Select Level</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="level"
                                value={formik.values.level}
                                onChange={formik.handleChange}
                            >
                                <option value="">Open this select menu</option>
                                <option value="N1">N1</option>
                                <option value="N2">N2</option>
                                <option value="N3">N3</option>
                                <option value="N4">N4</option>
                                <option value="N5">N5</option>
                            </Form.Select>
                            {formik.errors.level && formik.touched.level && (
                                <div className="text-danger">{formik.errors.level}</div>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Completed"
                                name="isCompleted"
                                checked={formik.values.isCompleted}
                                onChange={e => formik.setFieldValue('isCompleted', e.target.checked)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Lesson
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
