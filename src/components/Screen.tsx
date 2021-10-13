export default function Screen(props: any) {
    return (
        <div style={{ ...props.style, width: "100vw" }} className={props.className}>
            { props.children }
        </div>
    )
}