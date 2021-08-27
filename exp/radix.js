function bufferToNibbles(key) {
  const bkey = Buffer.from(key);
  const nibbles = [];
  for (let i = 0; i < bkey.length; i++) {
      let q = i * 2;
      nibbles[q] = bkey[i] >> 4;
      ++q;
      nibbles[q] = bkey[i] % 16;
  }
  return nibbles;
}

class Node {
  constructor() {
    // <nibble, Node>
    this.children = {}
    this.endOfWord = false
    this.value = null
  }

  insert(value) {
    this.value = value
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  put(key, value) {
    let current = this.root
    const nibbles = bufferToNibbles(key)

    for (let i = 0; i < nibbles.length; i++) {
      const nibble = nibbles[i];
      let node = current.children[nibble]

      if (!node) {
        node = new Node()
        current.children[nibble] = node
      }

      console.log("inserting nibble", nibble)
      current = node
    }

    current.endOfWord = true
    current.insert(value)
    console.log("value inserted", value)
  }

  search(key) {
    let current = this.root;
    const nibbles = bufferToNibbles(key)
    for (let i = 0; i < nibbles.length; i++) {
      let nibble = nibbles[i];
      let node = current.children[nibble];
      //if node does not exist for given char then return false
      if (node == null) {
        return false;
      }
      current = node;
    }
    // return true of current's endOfWord is true else return false.
    return current;
  }
}

const trie = new Trie()

// normaly you also hash key of node
trie.put(Buffer.from("32fa7c"), Buffer.from("20"))
trie.put(Buffer.from("32fa7b"), Buffer.from("10"))
trie.put(Buffer.from("437b"), Buffer.from("5"))

const value = trie.search("32fa7c").value
const value2 = trie.search("32fa7b").value
const value3 = trie.search("437b").value

console.log(value.toString("ascii"))
console.log(value2.toString("ascii"))
console.log(value3.toString("ascii"))
