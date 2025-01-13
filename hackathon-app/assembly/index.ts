// import * as fs from 'fs';
// import * as path from 'path';

export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}
export * from "./quotes";
export * from "./models";
export * from "./process";

/*
  X = [x1,x2,x3,....,xn]    
  RMS(X) = sqrt((x1^2+x2^2+...+xn^2)/n)



*/