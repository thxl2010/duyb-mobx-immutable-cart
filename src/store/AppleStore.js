/*
 * 创建苹果状态
 * @Author: Duyb
 * @Date: 2022-03-09 17:50:06
 * @Last Modified by: Duyb
 * @Last Modified time: 2022-03-09 18:11:03
 */
import { makeAutoObservable } from 'mobx';

export default class AppleStore {
  constructor(apple) {
    this.id = apple.id;
    this.name = apple.name;
    this.weight = apple.weight;
    this.isEaten = apple.isEaten;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  eat() {
    this.isEaten = true;
  }
}
