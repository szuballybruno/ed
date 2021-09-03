import React from 'react'


function Dot (props: { selected: boolean }) {
    return (
        <span style={{
            display: 'inline-block',
            height: '8px',
            width: '8px',
            borderRadius: '4px',
            backgroundColor: 'white',
            margin: '7px 5px',
            opacity: props.selected ? '1' : '0.3',
            transitionDuration: '300ms'
        }} />
    )
}

export default function IndicatorDots (props: { total: number; index: number }) {
    if (props.total < 2) {
        // Hide dots when there is only one dot.
        return <div style={{
            position: 'absolute',
            width: '100%',
            zIndex: (100),
            bottom: '8px',
            textAlign: 'center'
        }} />
    } else {
        return (
            <div style={{
                position: 'absolute',
                width: '100%',
                zIndex: (100),
                bottom: '8px',
                textAlign: 'center'
            }}>{
                Array.apply(null, Array(props.total)).map((x, i) => {
                    return <Dot key={i} selected={props.index === i} />
                })
            }</div>
        )
    }
}