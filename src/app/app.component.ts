import { Component, VERSION } from "@angular/core";

const DEFAULT_VALUE = 4;
const MAX_DATA = 1000;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  dataList = [];
  isEnd = false;
  simulateNetworkSpeed = 0;

  constructor() {
    this.initData();
  }

  onLoadMore(event) {
    // console.log('infinity scroll = ', event);
    console.log("load more");
    this.isComplete();
    const currentData = this.getLastData() + 1;
    const addCount = 5;
    const addTotal = this.getLastData() + addCount;
    this.simulateNetworkSpeed = Math.floor(Math.random()* 2000);
    setTimeout(() => {
      for (let i = currentData; i < addTotal; ++i) {
        this.dataList.push(i);
      }
    }, this.simulateNetworkSpeed);
  }

  onAdd() {
    this.dataList.push(this.getLastData() + 1);
  }

  onClear() {
    this.dataList = [];
    this.initData();
    this.isEnd = false;
  }

  trackByIndex(index: number, data?: any): number {
    return index;
  }

  private getLastData(): number {
    return this.dataList[this.dataList.length - 1];
  }

  private isComplete() {
    const currentData = this.getLastData();
    this.isEnd = currentData >= MAX_DATA;
  }

  private initData() {
    for (let i = 0; i < DEFAULT_VALUE; ++i) {
      this.dataList.push(i);
    }
  }
}
