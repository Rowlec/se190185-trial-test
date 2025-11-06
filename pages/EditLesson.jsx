import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Toast, Form, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { getDetailOfLesson, updateLesson } from '../services/lesson.services'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function EditLesson() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(true)

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
            estimatedTime: 0,
            isCompleted: false,
            level: ''
        },
        validationSchema: Yup.object(schema),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                await updateLesson(id, values)
                setShow(true)
                setTimeout(() => {
                    navigate('/se123456/lessons')
                }, 1500)
            } catch (error) {
                console.error("Error updating lesson:", error)
            }
        }
    })

    useEffect(() => {
        fetchLessonDetail()
    }, [id])

    const fetchLessonDetail = async () => {
        try {
            setLoading(true)
            const lessonData = await getDetailOfLesson(id)
            const lesson = lessonData.data
            
            formik.setValues({
                lessonTitle: lesson.lessonTitle || '',
                lessonImage: lesson.lessonImage || '',
                estimatedTime: lesson.estimatedTime || 0,
                isCompleted: lesson.isCompleted || false,
                level: lesson.level || ''
            })
            setLoading(false)
        } catch (error) {
            console.error("Error fetching lesson:", error)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <Container>
            <Row className='mt-2 g-4'>
                <Col>
                    <Toast show={show} onClose={() => setShow(false)} delay={3000} autohide className='position-fixed top-0 end-0 mx-3'>
                        <Toast.Body>Lesson updated successfully!</Toast.Body>
                    </Toast>
                    <h2 className="mb-4">Edit Lesson</h2>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="lessonTitle">
                            <Form.Label>Lesson Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="lessonTitle" 
                                placeholder="Enter lesson title" 
                                value={formik.values.lessonTitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.lessonTitle && formik.touched.lessonTitle && (
                                <div className="text-danger">{formik.errors.lessonTitle}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lessonImage">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="lessonImage" 
                                placeholder="https://example.com/image.jpg" 
                                value={formik.values.lessonImage}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.lessonImage && formik.touched.lessonImage && (
                                <div className="text-danger">{formik.errors.lessonImage}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="estimatedTime">
                            <Form.Label>Estimated Time</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="estimatedTime" 
                                placeholder="Enter estimated time" 
                                value={formik.values.estimatedTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.estimatedTime && formik.touched.estimatedTime && (
                                <div className="text-danger">{formik.errors.estimatedTime}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="level">
                            <Form.Label>Select Level</Form.Label>
                            <Form.Select
                                aria-label="Select level"
                                name="level"
                                value={formik.values.level}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select a level</option>
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

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                id="isCompleted"
                                label="Completed"
                                name="isCompleted"
                                checked={formik.values.isCompleted}
                                onChange={e => formik.setFieldValue('isCompleted', e.target.checked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="me-2">
                            Update Lesson
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/se123456/lessons')}>
                            Cancel
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
