import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  computerNames: string[];
  propNames: string[];
  compCPU: number[][];
  compGPU: number[][];
  compHDD: number[][];
  compProps: number[][];
  compProp1: number[];
  compProp2: number[];
  compProp3: number[];
  propCoef: number[];
  showResult: boolean;
  resultData: number[];
  constructor() {
  }

  fillArray(array: number[][], rows: number, cols: number) {
    array = new Array(rows);
    const values = [1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < array.length; i++) {
      array[i] = new Array(cols);
      for (let j = 0; j < i + 1; j++) {
        if (i === j) {
          array[i][j] = 1;
        } else {
          array[i][j] = values[Math.floor(Math.random() * values.length)];
        }
      }
    }
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array[i].length; j++) {
        array[i][j] = 1 / array[j][i];
      }
    }
    return array;
  }

  ngOnInit(): void {
    this.computerNames = ['Комп\'ютер1', 'Комп\'ютер2', 'Комп\'ютер3', 'Комп\'ютер4'];
    this.propNames = ['CPU', 'GPU', 'HDD'];

    this.compCPU = this.fillArray(this.compCPU, this.computerNames.length, this.computerNames.length);
    this.compGPU = this.fillArray(this.compGPU, this.computerNames.length, this.computerNames.length);
    this.compHDD = this.fillArray(this.compHDD, this.computerNames.length, this.computerNames.length);
    this.compProps = this.fillArray(this.compProps, this.propNames.length, this.propNames.length);
    this.compProp1 = Array(this.computerNames.length);
    for (let i = 0; i < this.compProp1.length; i++) {
      this.compProp1[i] = 0;
    }
    this.compProp2 = Array(this.computerNames.length);
    for (let i = 0; i < this.compProp2.length; i++) {
      this.compProp2[i] = 0;
    }
    this.compProp3 = Array(this.computerNames.length);
    for (let i = 0; i < this.compProp3.length; i++) {
      this.compProp3[i] = 0;
    }
    this.propCoef = Array(this.propNames.length);
    for (let i = 0; i < this.propCoef.length; i++) {
      this.propCoef[i] = 0;
    }
    this.resultData = Array(this.computerNames.length);
    for (let i = 0; i < this.resultData.length; i++) {
      this.resultData[i] = 0;
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  applyChanges(array: number[][], i: number, j: number): void {
    array[j][i] = 1 / array[i][j];
  }

  calculate() {
    let sum = 0;
    for (let i = 0; i < this.compProp1.length; i++) {
      this.compProp1[i] = 0;
    }
    for (let i = 0; i < this.compCPU.length; i++) {
      for (let j = 0; j < this.compCPU[i].length; j++) {
        this.compProp1[i] += this.compCPU[i][j];
        sum += this.compCPU[i][j];
      }
    }
    for (let i = 0; i < this.compProp1.length; i++) {
      this.compProp1[i] /= sum;
    }

    sum = 0;
    for (let i = 0; i < this.compProp2.length; i++) {
      this.compProp2[i] = 0;
    }
    for (let i = 0; i < this.compGPU.length; i++) {
      for (let j = 0; j < this.compGPU[i].length; j++) {
        this.compProp2[i] += this.compGPU[i][j];
        sum += this.compGPU[i][j];
      }
    }
    for (let i = 0; i < this.compProp2.length; i++) {
      this.compProp2[i] /= sum;
    }

    sum = 0;
    for (let i = 0; i < this.compProp3.length; i++) {
      this.compProp3[i] = 0;
    }
    for (let i = 0; i < this.compHDD.length; i++) {
      for (let j = 0; j < this.compHDD[i].length; j++) {
        this.compProp3[i] += this.compHDD[i][j];
        sum += this.compHDD[i][j];
      }
    }
    for (let i = 0; i < this.compProp3.length; i++) {
      this.compProp3[i] /= sum;
    }

    sum = 0;
    for (let i = 0; i < this.propCoef.length; i++) {
      this.propCoef[i] = 0;
    }
    for (let i = 0; i < this.compProps.length; i++) {
      for (let j = 0; j < this.compProps[i].length; j++) {
        this.propCoef[i] += this.compProps[i][j];
        sum += this.compProps[i][j];
      }
    }
    for (let i = 0; i < this.propCoef.length; i++) {
      this.propCoef[i] /= sum;
    }

    for (let i = 0; i < this.resultData.length; i++) {
      this.resultData[i] = 0;
    }
    for (let i = 0; i < this.resultData.length; i++) {
      this.resultData[i] += this.compProp1[i] * this.propCoef[0];
      this.resultData[i] += this.compProp2[i] * this.propCoef[1];
      this.resultData[i] += this.compProp3[i] * this.propCoef[2];
    }
    console.log(this.compProp1, this.compProp2, this.compProp3, this.propCoef, this.resultData);
    this.showResult = true;
  }
}

