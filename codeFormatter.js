/*! codeFormatter v1.0.1 by ryanpcmcquen */
//
// Ryan P. C. McQuen | Everett, WA | ryanpcmcquen@member.fsf.org
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version, with the following exception:
// the text of the GPL license may be omitted.
//
// This program is distributed in the hope that it will be useful, but
// without any warranty; without even the implied warranty of
// merchantability or fitness for a particular purpose. Compiling,
// interpreting, executing or merely reading the text of the program
// may result in lapses of consciousness and/or very being, up to and
// including the end of all existence and the Universe as we know it.
// See the GNU General Public License for more details.
//
// You may have received a copy of the GNU General Public License along
// with this program (most likely, a file named COPYING).  If not, see
// <https://www.gnu.org/licenses/>.
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
