import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Join from './pages/Join';
import Setup from './pages/mp';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from "web3";
function App() {
    function getLibrary(provider: any) {
        return new Web3(provider);
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/mp">
                    <Web3ReactProvider getLibrary={getLibrary}>
                        <Setup />
                    </Web3ReactProvider>
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
