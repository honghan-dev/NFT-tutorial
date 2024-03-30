// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    // uint256 default to zero
    // default to internal
    uint256 favouriteNumber;

    struct People {
        uint256 favouriteNumber;
        string name;
    }

    // Use like an onject
    mapping(string => uint256) public nameToFavouriteNumber;

    People[] public peoples;

    function store(uint256 _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    // calldata(can't be modified), memory(can modify), storage(modify)
    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        peoples.push(People(_favouriteNumber, _name));
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}
