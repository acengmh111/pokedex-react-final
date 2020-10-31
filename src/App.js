import './App.css';
import Home from './components/Home';
import List from './components/List';
import Detail from './components/Detail';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/list' component={List} />
          <Route path='/detail/:id' component={Detail} />
          <Route path='*' exact={true} component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
