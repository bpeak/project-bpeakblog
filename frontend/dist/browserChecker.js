(function () {
    const isChrome = window.chrome
    if(!isChrome){
        const msg = 'bpeak blog 는 현재 구글크롬외의 다른브라우져를 1도 고려하지 않았습니다.\n익스플로러에서는 화면이 아예보이지 않을수있고, 타브라우져에서는 화면이 올바르게표시되지 않거나 제대로 동작하지 않을수 있습니다.'
        alert(msg)
    }
})()