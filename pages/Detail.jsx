import React, { use, useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button, Image } from 'react-bootstrap'
import { getDetailOfLesson, getLessons } from '../services/lesson.services'
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router';

export default function Detail() {
    const [lessons, setLessons] = useState([])
    const {id} = useParams()// Get the lesson ID from the URL parameters

    useEffect(() => {
        fetchAllLessons()
    }, [])
    const fetchAllLessons = async () => {
        try {
            const lessonData = await getDetailOfLesson(id) // Fetch detail of the specific lesson, 
            // id được truyền vào từ const {id} = useParams();


        
            setLessons(lessonData.data) // Set the fetched lesson detail to state
            //nếu bên service đã .data thì ở đây chỉ cần lessonData

            // console.log(lessonData)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <Container>
            <Row className='mt-2 g-4'>
                <Col md={3}>
                    <Image src={lessons.lessonImage} />
                    <Col md={9}>

                        <ListGroup variant="flush">
                            <ListGroup.Item>{lessons.lessonTitle}</ListGroup.Item>
                            <ListGroup.Item>{lessons.estimatedTime ? lessons.estimatedTime.toLocaleString() : 'Not Available'}</ListGroup.Item>
                            <ListGroup.Item>{lessons.level}</ListGroup.Item>
                            <ListGroup.Item>{lessons.isCompleted ? 'Completed' : 'Not Completed'}</ListGroup.Item>
                        </ListGroup>


                    </Col>
                </Col>
            </Row>
        </Container>
    )
}
