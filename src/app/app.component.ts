import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TicTacToe';
  public currentPlayer: 'X' | 'O' = 'X';
  public winnerFound: boolean = false;
  public matchEnd: boolean = false;
  public gridArray: string[] = [];
  public matchDraw: boolean = false;
  public count: number = 0;
  public winPos: number[] = [];

  private winningPositions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor() {
    this.gridArray = Array(9).fill('');
  }

  public onClick(index: number): void {
    if (!this.matchEnd && this.gridArray[index]== '') {
      this.count++;
      this.gridArray[index] = this.currentPlayer;
      this._findWinner();
      if (!this.matchEnd) {
        this.currentPlayer = this.currentPlayer == 'X' ? 'O' : 'X';
      }
    }
    if (this.count == 9 && !this.winnerFound) {
      this.matchDraw = true;
      this.matchEnd = true;
    }
  }

  public reset(): void{
    this.gridArray = Array(9).fill('');
    this.currentPlayer= 'X';
    this.winnerFound  = false;
    this.matchEnd  = false;
    this.matchDraw = false;
    this.count = 0;
    this.winPos =[];
  }

  public setColor(index: number): boolean {
    return this.winPos.includes(index) ? true : false;
  }

  private _findWinner(): void {
    this.winningPositions.forEach((element) => {
      if (
        this.gridArray[element[0]] &&
        this.gridArray[element[0]] == this.gridArray[element[1]] &&
        this.gridArray[element[1]] == this.gridArray[element[2]]
      ) {
        this.winnerFound = true;
        this.matchEnd = true;
        this.winPos = element;
      }
    });
  }
}

//https://getcssscan.com/css-box-shadow-examples
