// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProofOfLocation {
    struct LocationProof {
        bytes32 locationHash; // Hash of the location data
        bytes32 zkProofHash;  // Hash of the zero-knowledge proof
        uint256 timestamp;    // Timestamp when proof was created
        address verifier;     // Address of the verifier
    }
    
    struct Package {
        bytes32 packageId;
        address owner;
        string ipfsMetadataHash;
        uint256 createdAt;
        bool isActive;
    }
    
    mapping(bytes32 => Package) public packages;
    mapping(bytes32 => LocationProof[]) public locationProofs;
    
    event PackageCreated(bytes32 indexed packageId, address indexed owner, string ipfsHash);
    event LocationProofAdded(bytes32 indexed packageId, bytes32 locationHash, uint256 timestamp);
    
    // Create a new package
    function createPackage(bytes32 packageId, string memory ipfsHash) public {
        require(packages[packageId].owner == address(0), "Package already exists");
        
        packages[packageId] = Package({
            packageId: packageId,
            owner: msg.sender,
            ipfsMetadataHash: ipfsHash,
            createdAt: block.timestamp,
            isActive: true
        });
        
        emit PackageCreated(packageId, msg.sender, ipfsHash);
    }
    
    // Add a location proof for a package
    function addLocationProof(
        bytes32 packageId,
        bytes32 locationHash,
        bytes32 zkProofHash
    ) public {
        require(packages[packageId].isActive, "Package does not exist or is inactive");
        
        LocationProof memory proof = LocationProof({
            locationHash: locationHash,
            zkProofHash: zkProofHash,
            timestamp: block.timestamp,
            verifier: msg.sender
        });
        
        locationProofs[packageId].push(proof);
        
        emit LocationProofAdded(packageId, locationHash, block.timestamp);
    }
    
    // Get number of location proofs for a package
    function getLocationProofCount(bytes32 packageId) public view returns (uint256) {
        return locationProofs[packageId].length;
    }
    
    // Get package details
    function getPackage(bytes32 packageId) public view returns (
        address owner,
        string memory ipfsHash,
        uint256 createdAt,
        bool isActive
    ) {
        Package memory package = packages[packageId];
        return (
            package.owner,
            package.ipfsMetadataHash,
            package.createdAt,
            package.isActive
        );
    }
}