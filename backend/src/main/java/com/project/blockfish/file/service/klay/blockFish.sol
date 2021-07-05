pragma solidity ^0.5.6;

contract BlockFish {
    string private userId;
    string private fileHash;

    function setHash(string memory id, string memory hash) public {
        userId = id;
        fileHash = hash;
    }

    function getUserId() public view returns(string memory) {
        return userId;
    }

    function getHash() public view returns(string memory) {
        return fileHash;
    }

}
