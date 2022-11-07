
const sizes = [
    '5',
    '10',
    '15'
];

const genCssClass = (main, postName, posts, size) => {

    return (
        `
    .${main}${postName ? '-' + postName : ''}-${size} {
        ${posts
            ? posts
                .map(post => `${main}-${post}: ${size}px`)
                .join("\n\t")
            : `${main}: ${size}px`}
    }
`
    );
}

const mains = [
    {
        mainName: 'margin',
        sizes: sizes,
        config: [
            { postName: 'left', posts: ['left'] },
            { postName: 'right', posts: ['right'] },
            { postName: 'top', posts: ['top'] },
            { postName: 'bottom', posts: ['bottom'] },
            { postName: 'h', posts: ['left', 'right'] },
            { postName: 'v', posts: ['top', 'bottom'] },
            {}
        ]
    },
    {
        mainName: 'padding',
        sizes: sizes,
        config: [
            { postName: 'left', posts: ['left'] },
            { postName: 'right', posts: ['right'] },
            { postName: 'top', posts: ['top'] },
            { postName: 'bottom', posts: ['bottom'] },
            { postName: 'h', posts: ['left', 'right'] },
            { postName: 'v', posts: ['top', 'bottom'] },
            {}
        ]
    }
];

const strings = mains
    .flatMap(mainData => mainData
            .config
            .flatMap(data => mainData
                .sizes
                .flatMap(size => genCssClass(mainData.mainName, data.postName, data.posts, size))));


console.log(strings.join(""));
