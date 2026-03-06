import { useState } from "react";
import { Heapq } from "ts-heapq";
import {
  getGridIndexFromRowAndCol,
  getRowAndColFromIndex,
} from "../../../helpers/canvas";
import { FRONTIER_CELL, VISITED_CELL, WALL_CELL } from "../constants/constants";
import { Cell } from "../models/Cell";

type Node = [number, number, number, number];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const usePathfinding = ({
  grid,
  gridSize,
  updateCell,
}: {
  grid: number[];
  gridSize: number;
  updateCell: (index: number, value: number) => void;
}) => {
  const [searchAlgorithm, setSearchAlgorithm] = useState("A*");

  const isCellValid = (row: number, col: number): boolean => {
    return row >= 0 && row < gridSize && col >= 0 && col < gridSize;
  };

  const isUnblocked = (row: number, col: number) => {
    const index = getGridIndexFromRowAndCol(row, col, gridSize);
    return grid[index] !== WALL_CELL;
  };

  const isDiagonalMoveValid = (
    row: number,
    col: number,
    newRow: number,
    newCol: number
  ): boolean => {
    const dr = newRow - row;
    const dc = newCol - col;

    if (Math.abs(dr) === 1 && Math.abs(dc) === 1) {
      return isUnblocked(row + dr, col) && isUnblocked(row, col + dc);
    }

    return true;
  };

  // Manhattan Distance
  // const heuristic = (row: number, col: number, target: number): number => {
  //   const { row: targetRow, col: targetCol } = getRowAndColFromIndex(
  //     gridSize,
  //     target,
  //   );
  //   return Math.abs(targetCol - col) + Math.abs(targetRow - row);
  // };
  // Euclidean Distance
  const heuristic = (row: number, col: number, target: number): number => {
    const { row: targetRow, col: targetCol } = getRowAndColFromIndex(
      gridSize,
      target
    );
    return Math.sqrt((targetCol - col) ** 2 + (targetRow - row) ** 2);
  };

  const searchPath = async (
    origin: number,
    target: number
  ): Promise<Cell | null> => {
    const { row: startRow, col: startCol } = getRowAndColFromIndex(
      gridSize,
      origin
    );
    const { row: targetRow, col: targetCol } = getRowAndColFromIndex(
      gridSize,
      target
    );

    const closedList: boolean[][] = Array.from({ length: gridSize }, () =>
      new Array(gridSize).fill(false)
    );
    // const cellDetails: Cell[][] = Array.from({ length: gridSize }, () =>
    //   Array.from({ length: gridSize }, () => new Cell()),
    // );
    const cellDetails: Cell[][] = Array.from({ length: gridSize }, (_, row) =>
      Array.from(
        { length: gridSize },
        (_, col) => new Cell(getGridIndexFromRowAndCol(row, col, gridSize))
      )
    );

    cellDetails[startRow][startCol].fCost = 0;
    cellDetails[startRow][startCol].gCost = 0;
    cellDetails[startRow][startCol].hCost = 0;
    cellDetails[startRow][startCol].parent = null;

    const openList = new Heapq<Node>([], (a, b) => {
      if (a[0] === b[0]) {
        return a[1] < b[1]; // menor hCost primero
      }
      return a[0] < b[0];
    });
    openList.push([0.0, 0.0, startRow, startCol]);

    while (openList.length() > 0) {
      const [f, h, row, col] = openList.pop();
      const index = getGridIndexFromRowAndCol(row, col, gridSize);
      updateCell(index, VISITED_CELL);

      await sleep(25);

      closedList[row][col] = true;

      const directions: number[][] = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        // [1, 1],
        // [-1, -1],
        // [-1, 1],
        // [1, -1],
      ];

      for (const direction of directions) {
        const newRow = row + direction[0];
        const newCol = col + direction[1];

        if (
          isCellValid(newRow, newCol) &&
          isUnblocked(newRow, newCol) &&
          !closedList[newRow][newCol] &&
          isDiagonalMoveValid(row, col, newRow, newCol)
        ) {
          updateCell(
            getGridIndexFromRowAndCol(newRow, newCol, gridSize),
            FRONTIER_CELL
          );
          sleep(5);
          if (newRow === targetRow && newCol === targetCol) {
            cellDetails[newRow][newCol].parent = cellDetails[row][col];
            return cellDetails[row][col];
          } else {
            const newGCost = cellDetails[row][col].gCost + 1.0;
            const newHCost = heuristic(newRow, newCol, target);
            const newFCost = newGCost + newHCost;

            if (
              cellDetails[newRow][newCol].fCost == Infinity ||
              cellDetails[newRow][newCol].fCost > newFCost
            ) {
              openList.push([newFCost, newHCost, newRow, newCol]);

              cellDetails[newRow][newCol].fCost = newFCost;
              cellDetails[newRow][newCol].gCost = newGCost;
              cellDetails[newRow][newCol].hCost = newHCost;
              cellDetails[newRow][newCol].parent = cellDetails[row][col];
            }
          }
        }
      }
    }

    return null;
  };

  return { searchPath, searchAlgorithm, setSearchAlgorithm };
};
