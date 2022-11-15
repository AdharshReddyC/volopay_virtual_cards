import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './components/Header'

import Home from './components/Home'

import NotFound from './components/NotFound'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/All" component={Home} />

      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
