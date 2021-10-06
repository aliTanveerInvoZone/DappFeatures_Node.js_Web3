
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract UniqueAsset is ERC721Enumerable{


    string[] public hashes;
  
    
    mapping(string => bool) public _hashExists;



  constructor() ERC721("UniqueAsset", "UNA") {}



function mint(string memory _hash) public {
        require(!_hashExists[_hash]);
        hashes.push(_hash);
        uint _id = hashes.length  - 1;
        _mint(msg.sender,_id);
        _hashExists[_hash] = true;
}
}