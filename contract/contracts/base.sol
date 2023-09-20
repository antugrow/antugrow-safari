// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MilkCollectionContract {
    struct MilkBatch {
        string vid;
        string batchData;
        uint256 timestamp;
        uint256 startDate;
        uint256 endDate;
        string location;
        string cooperativeName;
    }

    mapping(string => MilkBatch[]) public milkCollectionHistory;

    event MilkCollected(
        string indexed vid,
        string batchData,
        uint256 timestamp,
        uint256 startDate,
        uint256 endDate,
        string location,
        string cooperativeName
    );

    function storeMilkCollectionData(
        string memory vid,
        string memory batchData,
        uint256 startDate,
        uint256 endDate,
        string memory location,
        string memory cooperativeName
    ) public {
        milkCollectionHistory[vid].push(
            MilkBatch({
                vid: vid,
                batchData: batchData,
                timestamp: block.timestamp,
                startDate: startDate,
                endDate: endDate,
                location: location,
                cooperativeName: cooperativeName
            })
        );

        emit MilkCollected(
            vid,
            batchData,
            block.timestamp,
            startDate,
            endDate,
            location,
            cooperativeName
        );
    }

    function getMostRecentMilkCollectionData(string memory vid) public view returns (
        string memory,
        string memory,
        uint256,
        uint256,
        uint256,
        string memory,
        string memory
    ) {
        MilkBatch[] storage batches = milkCollectionHistory[vid];
        if (batches.length > 0) {
            MilkBatch storage mostRecentBatch = batches[batches.length - 1];
            return (
                mostRecentBatch.vid,
                mostRecentBatch.batchData,
                mostRecentBatch.timestamp,
                mostRecentBatch.startDate,
                mostRecentBatch.endDate,
                mostRecentBatch.location,
                mostRecentBatch.cooperativeName
            );
        } else {
            return ("", "", 0, 0, 0, "", "");
        }
    }

    function getAllMilkBatches(string memory vid) public view returns (MilkBatch[] memory) {
        return milkCollectionHistory[vid];
    }
}
