// SPDX-License-Identifier: CC0-1.0
pragma solidity 0.8.23;

/// @notice `StealthRegistryV1` contract to map accounts to their stealth meta-address.
contract StealthRegistryV1 {
  /// @dev `registrant` may be a standard 160-bit address or any other identifier.
  /// @dev `schemeId` is an integer identifier for the stealth address scheme.
  mapping(address registrant => mapping(uint256 schemeId => bytes)) public stealthMetaAddressOf;

  mapping(string registrantId => address) public baseAddressOf;

  /// @notice Emitted when a registrant updates their stealth meta-address.
  /// @param registrant The account that registered the stealth meta-address.
  /// @param schemeId Identifier corresponding to the applied stealth address scheme, e.g. 1 for
  /// secp256k1, as specified in ERC-5564.
  /// @param stealthMetaAddress The stealth meta-address. and specifies them as:
  ///   st:<shortName>:0x<spendingPubKey>:<viewingPubKey>
  /// The chain (`shortName`) is implicit based on the chain the `ERC6538Registry` is deployed on,
  /// therefore this `stealthMetaAddress` is just the compressed `spendingPubKey` and
  /// `viewingPubKey` concatenated.
  event StealthMetaAddressSet(
    address indexed registrant, uint256 indexed schemeId, bytes stealthMetaAddress
  );

  constructor() { 
  
  }

  /// @notice Sets the caller's stealth meta-address for the given scheme ID.
  /// @param schemeId Identifier corresponding to the applied stealth address scheme, e.g. 1 for
  /// secp256k1, as specified in ERC-5564.
  /// @param stealthMetaAddress The stealth meta-address to register.
  function registerKeys(uint256 schemeId, bytes calldata stealthMetaAddress) external {
    stealthMetaAddressOf[msg.sender][schemeId] = stealthMetaAddress;
    emit StealthMetaAddressSet(msg.sender, schemeId, stealthMetaAddress);
  }

  function registerKeysWithId(
    uint256 schemeId, 
    bytes calldata stealthMetaAddress,
    string calldata userId
  ) external {
    baseAddressOf[userId] = msg.sender;
    stealthMetaAddressOf[msg.sender][schemeId] = stealthMetaAddress;
    emit StealthMetaAddressSet(msg.sender, schemeId, stealthMetaAddress);
  }

  function getMetaAddressOf(
    uint256 schemeId,
    string calldata userId
  ) external view returns (bytes memory) {
    string memory registrant = baseAddressOf[userId];
    return stealthMetaAddressOf[registrant][schemeId];
  }
}