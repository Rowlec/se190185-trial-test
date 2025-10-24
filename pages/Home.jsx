import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { getLessons } from '../services/lesson.services'

export default function Home() {
    const [lessons, setLessons] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllLessons()
    }, [])
    const fetchAllLessons = async () => {
        try {
            const lessonData = await getLessons()
            setLessons(lessonData.data)
            console.log(lessonData)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <Container>
            <Row className='mt-2 g-4'>
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
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
