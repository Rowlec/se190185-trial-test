import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../component/NavigationBar';
import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import AllLesson from '../pages/AllLesson';
import AddLesson from '../pages/AddLesson';
import EditLesson from '../pages/EditLesson';

function App() {
  return (
    <>
        <NavigationBar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/se190185/lessons/:id" element={<Detail/>}/>
            <Route path="/all-lessons" element={<AllLesson/>}/>
            <Route path="/add-lesson" element={<AddLesson/>}/>
            <Route path="/se190185/lessons/edit/:id" element={<EditLesson/>}/>
        </Routes>
    </>
  )
}

export default App
