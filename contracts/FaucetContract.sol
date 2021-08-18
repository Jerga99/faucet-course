// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

  // this is a special function
  // it's called when you make a tx that doesn't specify
  // function name to call

  // External function are part of the contract interface
  // which means they can be called via contracts and other txs

  receive() external payable {}
  function addFunds() external payable {}

  function justTesting() external pure returns(uint) {
    return 2 + 2;
  }

  // pure, view - read-only call, no gas free
  // view - it indicates that the function will not alter the storage state in any way
  // pure - even more strict, indicating that it won't even read the storage state

  // Transactions (can generate state changes) and require gas fee
  // read-only call, no gas free

  // to talk to the node on the network you can make JSON-RPC http calls
}

// const instance = await Faucet.deployed()

// Block info
// Nonce - a hash that when combined with the minHash proofs that
// the block has gone through proof of work(POW)
// 8 bytes => 64 bits
