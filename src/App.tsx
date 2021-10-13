import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Join from './pages/Join';
import Setup from './pages/Setup';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/create">
                    <Setup />
                </Route> 
                <Route exact path="/join">
                    <Join />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
