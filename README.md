# bbloth-lang

A toy language created for a Policygenius BBLoTh, intended to demonstrate compiler design principles.

If you use this in production you win $1,000,000.

## Getting Started
`npm i` to install dependencies

`npm run build` to compile the typescript to javascript

## Running
You can run the `bbloth` CLI:
- `./bbloth run examples/1.bbl`

You can also run `./bbloth -h` to list all available commands.

## Project Overview
These are the core files, in execution order:
- `src/index.ts`: The entrypoint for the CLI, handles the `ast`, `js`, and `run` commands
- `src/lexer.ts`: The lexer - chunks the source into Tokens
- `src/parser.ts`: The parser - transforms the Token list into an AST
  - `src/ast.ts`: Typescript helper file containing AST `Node` types
- `src/compiler.ts` / `src/compiler-js.ts`: The compiler - generates either bytecode or javascript
  - `src/visitor/ts`: Typescript helper file defining the `Visitor` interface (helping enforce the [Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern))
- `src/vm.ts`: The Virtual Machine capable of running the bytecode generated by `src/compiler.ts`
