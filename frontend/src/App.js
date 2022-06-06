import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dashboard } from './pages/dashboard/Dashboard'
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
import { TodoCreate } from './pages/todo/TodoCreate'
import { Illum } from './pages/illum/Illum'
import { FrankMain } from './pages/franklabs/frankmain'
import { Friday } from './pages/franklabs/friday'
import { Dots } from './pages/franklabs/dots'
import { Hex } from './pages/hex/hex'
import { Character } from './pages/dndchar/Character'

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header />
        <div className='pageContent'>
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
          <Route path='/todocreate' element={<TodoCreate />} />
          <Route path='/illum' element={<Illum />} />
          <Route path='/frankmain' element={<FrankMain />} />
          <Route path='/friday' element={<Friday />} />
          <Route path='/dots' element={<Dots />} />
          <Route path='/hex' element={<Hex />} />
          <Route path='/character' element={<Character />} />
          <Route path='/character/:id' element={<Character />} />
        </Routes>
        </div>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
