import { useHistory } from "react-router";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`
const Chip = styled.div`
    margin: 0 10px;
    padding: 3px 10px;
    background-color: crimson;
    height: 23px;
    color: #fff;
    display: flex;
    justiify-content: center;
    align-items: center;
    font-weight: 500;
    border-radius: 4px;
    font-size: 13px;
`
const Menu = styled.p`
    color: #828ea8;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
        color: #316ee8;
            
    }
`
export default function Navbar() {
    const history = useHistory();
    return (
        <Container>
            <div className="container d-flex align-items-center justify-content-between" style={{ cursor: "pointer" }}>
                <div className="d-flex align-items-center" onClick={() => history.push("/")}>
                    <h5>MEDPROJECTS</h5>
                    <Chip>Testnet</Chip>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <Menu onClick={() => history.push("/medscan")}>MedScan</Menu>
                    </div>
                </div>
            </div>
        </Container>
    )
}