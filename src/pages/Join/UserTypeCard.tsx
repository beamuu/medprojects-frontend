import styled from "styled-components";

const Container = styled.div`
    heigth: 100px;
    width: 100%;
    border: 1px solid #c6cbcf;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    padding: 20px 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.07);
    cursor: pointer;
    transition: 400ms ease;
    &:hover {
        transform: scale(1.1);
    }
`

interface IUserTypeCard {
    title: string;
    desc: string;
    color?: string;
    onClick?: () => void
}

export default function UserTypeCard({ title, desc, color, onClick }: IUserTypeCard) {
    return (
        <Container onClick={onClick}>
            <div className="text-center">
                <h4 style={{ color: color }}>{title}</h4>
                <p>{desc}</p>
            </div>
        </Container>
    )
}