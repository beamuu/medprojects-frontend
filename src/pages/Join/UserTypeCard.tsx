import styled from "styled-components";

const Container = styled.div`
    heigth: 100px;
    width: 100%;
    border: 1px solid #000;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    padding: 20px 0;
`

interface IUserTypeCard {
    title: string;
    desc: string;
    color?: string;
}

export default function UserTypeCard({ title, desc, color }: IUserTypeCard) {
    return (
        <Container>
            <div className="text-center">
                <h4 style={{ color: color }}>{title}</h4>
                <p>{desc}</p>
            </div>
        </Container>
    )
}