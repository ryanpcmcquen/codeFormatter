# codeFormatter

A library to morph back-tick wrapped markup in to `<code>`.

https://github.com/ryanpcmcquen/codeFormatter

There is code in here to support the PrettyPrint library for syntax highlighting, but unfortunately, all the times I have submitted code that included PrettyPrint to various browser extension repositories, it has been an uphill battle that has many times prevented extensions from being accepted.

For that reason, I've removed all of the PrettyPrint embedded code from here and switched to a smaller, simpler library called Microlight:

https://github.com/asvd/microlight


Head here for a demo:
https://ryanpcmcquen.org/codeFormatter/

Single ticks render inline code, triple ticks render multi-line code. If you wish to disable syntax highlighting, suffix the initial triple ticks with `p` or `plain`, for example:

```
    ```p
    ```plain
```
