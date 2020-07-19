# codeFormatter

A library to morph back-tick wrapped markup in to `<code>`.

https://github.com/ryanpcmcquen/codeFormatter

This used to support language specific syntax highlighting, but unfortunately, all the times I have submitted code that included PrettyPrint to various browser extension repositories, it has been an uphill battle that has many times prevented extensions from being accepted.

For that reason, I've removed all of the PrettyPrint embedded code from here and switched to a smaller, simpler library called Microlight:

https://github.com/asvd/microlight

Microlight also has the advantage of being language and theme agnostic. You now only need to specify if you wish to disable the syntax highlighting.

Single ticks render inline code, triple ticks render multi-line code. If you wish to disable syntax highlighting, suffix the initial triple ticks with `p` or `plain`, for example:

````
    ```p
    ```plain
````

Head here for a demo:

https://ryanpcmcquen.org/codeFormatter/
