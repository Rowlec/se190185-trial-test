import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_APP_URL
export const getLessons = async () => {
    try {
        const response = await axios.get(baseURL)
        return response
    } catch (error) {
        console.log(error)
    }

}

export const getCompletedLessons = async () => {
    try {
        const response = await axios.get(baseURL + '?isCompleted')
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getDetailOfLesson = async (id) => {
    try {
        const response = await axios.get(baseURL +`/${id}`)
        return response
    } catch (error) {
        console.log(error)
    }

}

export const deleteLesson = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}/${id}`)
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createLesson = async (lessonData) => {
    try {
        const response = await axios.post(baseURL, lessonData)
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const updateLesson = async (id, lessonData) => {
    try {
        const response = await axios.put(`${baseURL}/${id}`, lessonData)
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}
