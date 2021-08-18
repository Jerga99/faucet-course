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
}

// const instance = await Faucet.deployed()

// Block info
// Nonce - a hash that when combined with the minHash proofs that
// the block has gone through proof of work(POW)
// 8 bytes => 64 bits
