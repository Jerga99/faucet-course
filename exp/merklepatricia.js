const Trie = require("merkle-patricia-tree").SecureTrie; // We import the library required to create a basic Merkle Patricia Tree
const { BranchNode } = require("merkle-patricia-tree/dist/trieNode")

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

// Keccak256(key) as a String
// 4f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// add 20 hex prefix if nibbles are even
// 204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// 0x80 + 33 = a1
// 0x80 + 2 = 82
// 0xc0 + 37 = e5
// e5a1204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

// keccak256(RLP)
// 17dee68b36b0276d8db503b497c8335d5d4ace0ed3fef5f6fa62644dcd66f170
