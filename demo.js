document.addEventListener(
    'DOMContentLoaded',
    function () {
        document.querySelector('button').addEventListener(
            'click',
            function () {
                codeFormatter('.content');
                microlight.reset();
            }
        );
    }
);
