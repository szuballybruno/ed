import { EpistoFont } from "../../controls/EpistoFont";

export const ChipSmall = (props: {
    text: string,
    title?: string,
    color?: string,
    style?: React.CSSProperties
}) => {

    const color = props.color ?? "var(--deepBlue)";

    return (
        <EpistoFont
            classes={["roundBorders"]}
            fontSize="fontSmall"
            title={props.title}
            style={{
                border: "1px solid var(--deepBlue)",
                color: color,
                padding: "0 5px",
                margin: "0 2px",
                fontWeight: 700,
                ...props.style
            }}>

            {props.text}
        </EpistoFont>
    )
}