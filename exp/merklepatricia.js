const Trie = require("merkle-patricia-tree").SecureTrie; // We import the library required to create a basic Merkle Patricia Tree
const { BranchNode } = require("merkle-patricia-tree/dist/trieNode")

const { keccak256 } = require("ethereumjs-util");

var trie = new Trie(); // We create an empty Patricia Merkle Tree

const traverseTrie = (node) => {
  trie.walkTrie(node, (_, node) => {
    if (node) {
      console.log(node)
      console.log(node.hash().toString("hex"))
      if (node instanceof BranchNode) {
        for (let i = 0; i < 16; i++) {
          const buffer = node.getBranch(i)
          if (buffer && buffer.length > 0) {
            traverseTrie(buffer)
          }
        }
      }
    }
  })
}

async function test() {

  await trie.put(
    Buffer.from("32fa7b"),
    // ASCII Text to Hex 31 30
    Buffer.from("10")
  )

  await trie.put(
    Buffer.from("32fa7c"),
    // ASCII Text to Hex 32 30
    Buffer.from("20")
  )

  traverseTrie(trie.root)

  console.log("Root Hash: ", trie.root.toString("hex"))
}

test()

// Keccak256(32fa7c) as a String
// 4 is stored in the Branch Node
// 4 f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// RLP - 20 if number is even, 3 if number is odd
// a0 = 0x80 + 32
// e4 = 0xc0 + 36

// e4a03f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

// keccak256(RLP)
// b7f631fbd6cfb1aeb19411e75fc33769934c7ea2242a47b54ed6895e9627a0fc

// Keccak256(32fa7b) as a String
// 3 is stored in the Branch Node
// 3 3865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1

// RLP - 20 if number is even, 3 if number is odd

// e4a033865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1823130

// keccak256(RLP)
// 2fd2c9e2e74e9d07a920dd1ebf94f1bd7a5aa1764464769c83ce1cbb38137d65


// Branch Node
// RLP

// f851808080a02fd2c9e2e74e9d07a920dd1ebf94f1bd7a5aa1764464769c83ce1cbb38137d65a0b7f631fbd6cfb1aeb19411e75fc33769934c7ea2242a47b54ed6895e9627a0fc808080808080808080808080

// keccak256(RLP)

// 93267434a14288490332f997cb13123bb68609112edbd06f6e8c7c9798fd20c6
