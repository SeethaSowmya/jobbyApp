import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm/Login'
import Home from './components/Home/home'
import ProtectedRoute from './components/ProtectedRoute/protectedRoute'
import NotFound from './components/NotFound/NotFound'
import Jobs from './components/Jobs/jobs'
// These are the lists used in the application. You can move them to any component needed.

//
//
// ]

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <Route path="/NotFound" component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
