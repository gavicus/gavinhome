import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Header } from './components/Header'
import Flashcards from './pages/flashcards'
import { ScoreReport } from './pages/flashcards/ScoreReport'
import Questions from './pages/flashcards/questions'
import { QuestionNew } from './pages/flashcards/questionNew/QuestionNew'
import { QuestionEdit } from './pages/flashcards/QuestionEdit'
import { Test } from './pages/test/Test'
import { TodoList } from './pages/todo/TodoList'
import { TodoEdit } from './pages/todo/TodoEdit'

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
          <Route path='/flashcards/scorereport' element={<ScoreReport />} />
          <Route path='/test' element={<Test />} />
          <Route path='/todo' element={<TodoList />} />
          <Route path='/todoedit/:id' element={<TodoEdit />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
