import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Header } from './components/Header'
import Flashcards from './pages/flashcards'
import Questions from './pages/questions'
import { QuestionNew } from './pages/questionNew/QuestionNew'
import { QuestionEdit } from './pages/QuestionEdit'

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/flashcards' element={<Flashcards />} />
          <Route path='/questions' element={<Questions />} />
          <Route path='/questionnew' element={<QuestionNew />} />
          <Route path='/questionedit/:id' element={<QuestionEdit />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
