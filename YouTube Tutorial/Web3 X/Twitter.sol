// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

contract Twitter {
  address constant owner;
  uint16 public maxTweetLength;

  struct Tweet {
    uint256 id;
    address author;
    string content;
    uint256 timestamp;
    uint256 likes;
  };

  mapping(address => Tweet[]) public tweets;

  event TweetCreated(uint256 indexed id, address author, string content, uint256 timestamp);
  event TweetLiked(uint256 indexed id, address liker, address author, uint256 newLikeCount);
  event TweetUnliked(uint256 indexed id, address unliker, address author, uint256 newLikeCount);

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "You are not the owner")
    _;
  }

  modifier tweetExist(address author, uint256 id) {
    require(tweets[author][id] == id, "Tweet doesn't exist");
    _;
  }

  function changeTweetLength(uint16 _maxTweetLength) external onlyOwner {
    maxTweetLength = _maxTweetLength;
  }

  function createTweet(string memory _tweet) external onlyOwner {
    Tweet memory newTweet = Tweet({
      id: tweets[msg.sender].length,
      author: msg.sender,
      content: _tweet,
      timestamp: block.timestamp,
      likes: 0
    });
    tweets[msg.sender].push(newTweet);

    emit TweetCreated(newTweet.id, newTweet.author, newTweet.conten, newTweet.timestamp);
  }

  function likeTweet(address author, uint256 id) external tweetExist(author, id) {
    tweets[author][id].likes++;

    emit TweetLiked(id,msg.sender, author, tweets[author][id].likes);
  }

  function unlikeTweet(address author, uint256 id) external tweetExist(author, id) {
    require(tweets[author][id].likes > 0, "Can't unlike");
    tweets[author][id].likes--;

    emit TweetUnliked(id, msg.sender, author, tweets[author][id].likes);
  }
}