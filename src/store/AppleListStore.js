/*
 * 创建苹果篮子（苹果列表）状态
 * @Author: Duyb
 * @Date: 2022-03-09 17:50:06
 * @Last Modified by: Duyb
 * @Last Modified time: 2022-03-09 19:23:37
 */
import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
import Apple from './AppleStore';

class AppleListStore {
  constructor() {
    this.appleList = [];
    // makeAutoObservable(this);
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get applesInCart() {
    return this.appleList.filter((apple) => !apple.isEaten);
  }

  get applesEaten() {
    return this.appleList.filter((apple) => apple.isEaten);
  }

  pick() {
    console.log('push');
    this.appleList.push(
      new Apple({
        name: '红苹果',
        id: this.createId(),
        weight: random(200, 300),
        isEaten: false,
      })
    );
  }

  createId() {
    if (!this.appleList.length) {
      return 1;
    }
    return (
      this.appleList.reduce((id, apple) => (id < apple.id ? apple.id : id), 0) +
      1
    );
  }
}

/**
 * 生成 (m, n] 的随机数
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function random(m, n) {
  return Math.round(Math.random() * (n - m) + m);
}

const appleListStore = new AppleListStore();
const AppleListStoreContext = createContext();

export const AppleListStoreProvider = ({ children }) => {
  return (
    <AppleListStoreContext.Provider value={appleListStore}>
      {children}
    </AppleListStoreContext.Provider>
  );
};

export const useAppleListStore = () => {
  return useContext(AppleListStoreContext);
};
