import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Join from './pages/Join';
import Setup from './pages/mp';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from "web3";
import Admin from './pages/mh';
import { HostProvider } from './contexts/Host';

function App() {
    function getLibrary(provider: any) {
        return new Web3(provider);
    }
    return (
        <BrowserRouter>
            <Switch>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <Route exact path="/mh">
                        <HostProvider>
                            <Admin />
                        </HostProvider>
                    </Route>
                    <Route exact path="/mp">
                        <Setup />
                    </Route>
                </Web3ReactProvider>
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
