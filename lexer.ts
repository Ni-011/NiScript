// a lexer reads a string and tokenizes every character and creates an array of tokens

// declare enums and interfaces of different possible tokens, each token type.....
// a tokenizer function that converts every chaarcer of the line to a token and adds it to the array
// for multi character tokens

export enum tokenType {
  Number,
  Identifier,
  Let,
  BinaryOperation,
  openBrack,
  closeBrack,
  equals,
}

export interface token {
  value: string;
  type: tokenType;
}

// for alphabets, the uppercase and lowercase of characters should not be same
const isAlphabet = (src: string) => {
  return src.toLowerCase() !== src.toUpperCase();
};

// the utf unicode of character should be between unicode of 0-9 for integer
const isInt = (src: string) => {
  const FirstCharUnicode = src.charCodeAt(0);

  return (
    FirstCharUnicode >= "0".charCodeAt(0) &&
    FirstCharUnicode <= "9".charCodeAt(0)
  );
};

// create a token of the given values
const createToken = (value: string = "", type: tokenType) => {
  return { value, type };
};

// main function to convert code to tokens
export function tokenizer(sourceCode: string): token[] {
  let tokenArray: token[] = new Array<token>();
  let sourceCodeArray: string[] = sourceCode.split("");

  // identify the character type, convert it into a token and add to array
  while (sourceCodeArray.length > 0) {
    if (sourceCodeArray[0] === "(") {
      tokenArray.push(
        createToken(sourceCodeArray.shift(), tokenType.openBrack)
      );
    } else if (sourceCodeArray[0] === ")") {
      tokenArray.push(
        createToken(sourceCodeArray.shift(), tokenType.openBrack)
      );
    } else if (sourceCodeArray[0] === "=") {
      tokenArray.push(
        createToken(sourceCodeArray.shift(), tokenType.openBrack)
      );
    } else if (
      sourceCodeArray[0] === "+" ||
      sourceCodeArray[0] === "-" ||
      sourceCodeArray[0] === "*" ||
      sourceCodeArray[0] === "/"
    ) {
      tokenArray.push(
        createToken(sourceCodeArray.shift(), tokenType.openBrack)
      );
    } else {
      // multi character tokens

      // if first character integer, go through sourcearray, add all integers to num, create token of num and add to array
      if (isInt(sourceCodeArray[0])) {
        let num = "";
        while (sourceCodeArray.length > 0 && isInt(sourceCodeArray[0])) {
          num += sourceCodeArray.shift();
        }
        tokenArray.push(createToken(num, tokenType.Number));
      }
      // else if character is alphab, go through sourcearray, add all integers to identifier, create token of identife and add to array
      else if (isAlphabet(sourceCodeArray[0])) {
        let identifier = "";

        while (sourceCodeArray.length > 0 && isAlphabet(sourceCodeArray[0])) {
          identifier += sourceCodeArray.shift();
        }

        tokenArray.push(createToken(identifier, tokenType.Identifier));
      }
    }
  }
  return tokenArray;
}
