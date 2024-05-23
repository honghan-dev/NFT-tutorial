// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721} from "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Base64} from "openzeppelin-contracts/contracts/utils/Base64.sol";

contract MoodNft is ERC721 {

    error MoodNft__NotApprovedOrOwner();

    uint256 private s_tokenId;
    string private s_happySvgImageUri;
    string private s_sadSvgImageUri;

    enum Mood {
        HAPPY,
        SAD
    }

    mapping(uint256 => Mood) private s_tokenIdToColor;

    constructor(string memory happySvgImageUri, string memory sadSvgImageUri) ERC721("Moods", "MN") {
        s_tokenId = 0;
        s_happySvgImageUri = happySvgImageUri;
        s_sadSvgImageUri = sadSvgImageUri;
        s_tokenIdToColor[s_tokenId] = Mood.HAPPY;
    }

    function mintNft() public {
        _safeMint(msg.sender, s_tokenId);
        s_tokenId++;
    }

    function changeMood(uint256 tokenId) public {
        if (!_isApprovedOrOwner(msg.sender, tokenId)) {
            revert MoodNft__NotApprovedOrOwner();
        }

        if (s_tokenIdToColor[tokenId] == Mood.HAPPY) {
            s_tokenIdToColor[tokenId] = Mood.SAD;
        } else {
            s_tokenIdToColor[tokenId] = Mood.HAPPY;
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory imageURI;

        if(s_tokenIdToColor[tokenId] == Mood.HAPPY) {
            imageURI = s_happySvgImageUri;
        } else {
            imageURI = s_sadSvgImageUri;
        }
        bytes memory tokenMetadata = 
            bytes(abi.encodePacked(
                '{"name":"',
                name(),
                '", "description":"An NFT that changes with your mood, 100% on Chain", ',
                '"attributes": [{"trait_type": "colorness", "value": 100}], "image":"',
                imageURI,
                '"}'
            ));
        string memory based64EncodedURI = Base64.encode(tokenMetadata);
        string memory finalURI = string(abi.encodePacked(_baseURI(), based64EncodedURI));

        return finalURI;
    }

}