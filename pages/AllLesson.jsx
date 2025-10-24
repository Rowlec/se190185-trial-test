import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button, Toast } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { getLessons, deleteLesson } from '../services/lesson.services'

export default function AllLesson() {
    const [lessons, setLessons] = useState([])
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false) //chưa làm thì mặc định là false
    const [show, setShow] = useState(false)

    useEffect(() => {
        fetchAllLessons()
    }, [success]) //khi success thay đổi thì gọi lại useEffect
    const fetchAllLessons = async () => {
        try {
            const lessonData = await getLessons()
            setLessons(lessonData.data)
            console.log(lessonData)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteLesson(id)
            setShow(true)
            setSuccess(true) 
            fetchAllLessons()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container>
            <Row className='mt-2 g-4'>
                <Toast className="position-fixed bottom-0 mx-3 end-0" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Body>Lesson deleted successfully!</Toast.Body>
                </Toast>
                {lessons.map(lesson => (
                    <Col key={lesson.id} md={3}>
                        <Card className='h-100' onClick={() => navigate(`/se190185/lessons/${lesson.id}`)} style={{ cursor: 'pointer' }}>
                            <Card.Img variant="top" src={lesson.lessonImage} style={{ height: 200, objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{lesson.Title}</Card.Title>
                                <Card.Text>
                                    Time: {lesson.estimatedTime}
                                </Card.Text>
                            </Card.Body>
                            {/* Delete button */}
                            <Button variant="danger" onClick={(e) => {
                                e.stopPropagation()
                                if (window.confirm(`Are you sure you want to delete ${lesson.lessonTitle}?`)) {
                                    handleDelete(lesson.id)
                                }
                            }}>
                                Delete
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
