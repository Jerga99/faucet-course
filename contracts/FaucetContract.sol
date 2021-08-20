// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

  address[] private funders;

  // private -> can be accesible only within the smart contract
  // internal -> can be accesible within smart contract and also derived smart contract

  receive() external payable {}

  function addFunds() external payable {
    funders.push(msg.sender);
  }

  function getAllFunders() public view returns (address[] memory) {
    return funders;
  }

  function getFunderAtIndex(uint8 index) external view returns(address) {
    address[] memory _funders = getAllFunders();
    return _funders[index];
  }
}
