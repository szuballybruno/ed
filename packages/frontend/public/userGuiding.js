console.log('User guiding script included!');

(function (g, u, i, d, e, s) {

    console.log('UserGuiding initializing....');

    g[e] = g[e] || [];
    var f = u.getElementsByTagName(i)[0];
    var k = u.createElement(i);
    k.async = true;
    k.src = 'https://static.userguiding.com/media/user-guiding-' + s + '-embedded.js';
    f.parentNode.insertBefore(k, f);
    if (g[d]) return;
    var ug = g[d] = {
        q: []
    };
    ug.c = function (n) {
        return function () {
            ug.q.push([n, arguments]);
        };
    };
    var m = ['previewGuide', 'finishPreview', 'track', 'identify', 'triggerNps', 'hideChecklist', 'launchChecklist'];
    for (var j = 0; j < m.length; j += 1) {
        ug[m[j]] = ug.c(m[j]);
    }
    console.log('UserGuiding initialized.');
})(window, document, 'script', 'userGuiding', 'userGuidingLayer', '192093940ID');