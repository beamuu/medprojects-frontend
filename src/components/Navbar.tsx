import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`
export default function Navbar() {
    return (
        <Container>
            <div className="container">
                <h5>MEDPROJECTS</h5>
            </div>
        </Container>
    )
}