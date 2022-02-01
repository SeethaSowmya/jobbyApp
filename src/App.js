import './App.css'
import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm/Login'
import Home from './components/Home/home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './components/NotFound/NotFound'
import Jobs from './components/Jobs/jobs'
import JobItemDetails from './components/JabItemDetails/JobItemDetails'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
