import Program from 'commander';
import { readFile } from 'fs';
import { promisify } from 'util';
import { Tokenizer } from './lexer';
import { Parser } from './parser';
import { Compiler } from './compiler';
import { Compiler as CompilerJs } from './compiler-js';
import { VM, valueToString } from './vm';

Program
  .command('ast [input]')
  .description('Output the AST of the provided program')
  .action(async inputFile => {
    const input = await promisify(readFile)(inputFile, { encoding: 'utf-8' });

    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    console.log(JSON.stringify(parser.parse(), null, 2));
  });

Program
  .command('js [input]')
  .description('Compile the provided program to javascript')
  .option('-r, --run', 'If provided, the compiled javascript will be executed')
  .action(async (inputFile, { run }) => {
    const input = await promisify(readFile)(inputFile, { encoding: 'utf-8' });

    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const compiler = new CompilerJs(parser);
    const js = compiler.compile();

    if (run) {
      return eval(js);
    }
    console.log(js);
  });

Program
  .command('run [input]')
  .description('Compile & runs the provided program on the bytecode VM')
  .action(async inputFile => {
    const input = await promisify(readFile)(inputFile, { encoding: 'utf-8' });

    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const compiler = new Compiler(parser);
    const module = compiler.compile();

    const vm = new VM(module);
    const result = vm.run();
    if (result.type !== 'nil') {
      console.log(valueToString(result));
    }
  });

Program.parse(process.argv);
