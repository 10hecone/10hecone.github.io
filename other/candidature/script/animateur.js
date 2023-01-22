const title = document.getElementById("title");
let _iInterval = 0;

await import('')
function _animateTitle(word) {
    word = word.split("");
    const _IntervalTitle = setInterval(() => {
        if(_iInterval === word.length) {
            title.innerHTML = title.innerHTML;
            return clearInterval(_IntervalTitle);
        };
        title.innerHTML = title.innerHTML + word[_iInterval] ;
        _iInterval++;
    }, 750);
};

_animateTitle("Hecone");