/*! codeFormatter v4.0.0 by ryanpcmcquen */
//
// Ryan McQuen

/*jslint browser*/

(function () {
    "use strict";

    var replacement = function (matchedText, language) {
        var codeBlock = document.createElement("pre");
        var textNode = document.createTextNode(String(matchedText));
        if (language) {
            codeBlock.classList.add("prettyprint", "lang-" + language);
        }
        codeBlock.appendChild(textNode);

        return codeBlock;
    };

    var cleanReplace = function (i, regex, language) {
        var codeMatch = i.textContent.match(regex);
        while (i.firstChild) {
            i.removeChild(i.firstChild);
        }
        return i.appendChild(
            replacement(codeMatch, language)
        );
    };

    var codeFormatter = function (selector) {
        var contentArray = Array.prototype.slice.call(
            document.querySelectorAll(selector)
        );

        // Multi-line code:
        var tripleTickRegex = new RegExp(/```{1}[\w\W]*?```$/gim);
        // Inline code:
        var singleTickRegex = new RegExp(/`[^`]+`/g);
        var codeLanguageRegex = new RegExp(/```{1}.*/);
        contentArray.map(function (i) {
            if (!(/<code/gi).test(i.innerHTML)) {
                // Match the code language, so we can support
                // a lot of awesome syntax highlighting.
                if (i.textContent && codeLanguageRegex.test(i.textContent)) {
                    // This needs a little extra filtering,
                    // but cascading is cool.
                    var codeLanguage = String(
                        i.textContent.match(codeLanguageRegex)
                    ).slice(3).split(/(\s+)/)[0].trim();

                    if (tripleTickRegex.test(i.textContent)) {
                        cleanReplace(
                            i,
                            tripleTickRegex,
                            codeLanguage
                        );
                    }
                } else if (singleTickRegex.test(i.textContent)) {
                    // Single tick regex only works if it is
                    // outside the triple tick match:
                    cleanReplace(i, singleTickRegex);
                }
            }
        });
    };

    // Attach globally:
    window.codeFormatter = codeFormatter;
}());
