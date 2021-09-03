import React from 'react'
import classes from "./examButtons.module.scss"
import next from "./next.svg"

const styles = {
    btn: {
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'absolute',
        bottom: '0',
        margin: '10px 20px 10px 0',
        font: '16px/30px sans-serif',
        color: 'rgba(255,255,255,0.8)'
    },
    left: '0',
    right: '0'
}

export default function Buttons (props: { index: any; total: any; loop: any; prevHandler: any; nextHandler: any }) {
    const { index, total, loop, nextHandler } = props
    return (
        <div className={classes.buttonWrapper}>
            { (loop || index !== total - 1) && (
                <img alt={""} src={next} className={classes.buttonImage} onClick={nextHandler} />
            )}
        </div>
    )
}
