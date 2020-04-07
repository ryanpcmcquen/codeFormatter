/*! codeFormatter v1.0.1 by ryanpcmcquen */
//
// Ryan P. C. McQuen | Everett, WA

/*global window*/
/*jslint browser:true*/
(function () {

    "use strict";

    var codeFormatter = function (selector) {
        var replacement = function (matchedText, language) {
            return (
                "<code" +
                    (
                    language
                    ? " class='prettyprint lang-" + (language) + "'>"
                    : ">"
                ) + String(matchedText) + "</code>"
            );
        };
        var contentArray = Array.prototype.slice.call(
            document.querySelectorAll(selector)
        );
        // Multi-line code:
        var tripleTickRegex = new RegExp(/^```{1}[\w\W]*?^```$/gim);
        // Inline code:
        var singleTickRegex = new RegExp(/`[^`]+`/g);
        var codeLanguageRegex = new RegExp(/```{1}.*/);
        contentArray.map(function (i) {
            if (i.hasAttribute("contenteditable")) {
                if (!(/<code/gi).test(i.innerHTML)) {
                    // Match the code language, so we can support
                    // a lot of awesome syntax highlighting.
                    if (
                        i.textContent &&
                        (codeLanguageRegex).test(i.textContent)
                    ) {
                        // This needs a little extra filtering,
                        // but cascading is cool.
                        var codeLanguage = String(i.textContent.match(codeLanguageRegex)).slice(3).split(/(\s+)/)[0].trim();
                        if ((tripleTickRegex).test(i.textContent)) {
                            i.innerHTML = i.innerHTML.replace(
                                tripleTickRegex,
                                replacement("$&", codeLanguage)
                            );
                        }
                    }
                    // Single tick regex only works if it is
                    // outside the triple tick match:
                    if ((singleTickRegex).test(i.textContent)) {
                        i.innerHTML = i.innerHTML.replace(
                            singleTickRegex,
                            replacement("$&")
                        );
                    }
                }
            }
        });
    };

    // Attach globally:
    window.codeFormatter = codeFormatter;

}());
