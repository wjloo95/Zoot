export class Trie {
  private _trie: any;

  constructor(input?: string[]) {
    this._trie = Trie._create(input);
  }

  private static _create(input?: string[]) {
    // Handle case with no input strings
    if (!input) return {};

    const trie = input.reduce((wordAcc, item) => {
      // First lowercase each word
      item
        .toLowerCase()
        .split('')
        .reduce(
          //Then create trie for each word, with the trie as the accumulator
          (letterAcc: any, letter: string, index: number, array: string[]) => {
            // Pass that same reference for each letter, to loop through and construct trie path
            letterAcc[letter] = letterAcc[letter] || {};
            letterAcc = letterAcc[letter];
            // When we reach the end of a word, add endWord indicator
            if (index === array.length - 1) {
              letterAcc.endWord = true;
            }
            return letterAcc;
          },
          wordAcc
        );
      return wordAcc;
    }, {});
    return trie;
  }

  public getPrefixWords(strPrefix: string) {
    // If the provided prefix does not exist in the trie, return empty array
    if (!Trie._existsInTrie(this._trie, strPrefix).doesExist) {
      return [];
    }

    // Determine the correct branch of the trie to traverse
    const { trieNode } = Trie._existsInTrie(this._trie, strPrefix);

    // Recursively accumulate all the words that start with strPrefix
    return Trie._recurseTrie(trieNode, strPrefix, []);
  }

  private static _recurseTrie(node: any, prefix: string, prefixes: string[]) {
    let word = prefix;

    for (const branch in node) {
      // Traverse until we reach the end of a word and add to list
      if (branch === 'endWord') {
        prefixes.push(word);
        word = '';
      } else {
        Trie._recurseTrie(node[branch], prefix + branch, prefixes);
      }
    }

    return prefixes.sort();
  }

  private static _existsInTrie(trieNode: any, prefix: string) {
    const input: string[] = prefix.toLowerCase().split('');
    const doesExist = input.every((letter) => {
      if (!trieNode[letter]) {
        return false;
      }
      trieNode = trieNode[letter];
      return true;
    });

    return {
      doesExist,
      trieNode,
    };
  }
}
