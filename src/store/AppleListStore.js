/*
 * 创建苹果篮子（苹果列表）状态
 * @Author: Duyb
 * @Date: 2022-03-09 17:50:06
 * @Last Modified by: Duyb
 * @Last Modified time: 2022-03-09 23:38:48
 */
import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
import Apple from './AppleStore';

class AppleListStore {
  constructor() {
    this.appleList = [];
    this.loading = true;

    // makeAutoObservable(this);
    makeAutoObservable(this, {}, { autoBind: true });

    this.loadAppleList();
  }

  get applesInCart() {
    return this.appleList.filter((apple) => !apple.isEaten);
  }

  get applesEaten() {
    return this.appleList.filter((apple) => apple.isEaten);
  }

  pick() {
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

  *loadAppleList() {
    const appleList = yield getAppleList();
    appleList.forEach((apple) => {
      this.appleList.push(new Apple(apple));
    });
    this.loading = false;
  }

  *loadApple() {
    this.loading = true;
    const apple = yield getApple(this.appleList);
    this.appleList.push(new Apple(apple));
    this.loading = false;
  }
}

/**
 * 生成 [m, n] 的随机数
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function random(m, n) {
  return Math.round(Math.random() * (n - m) + m);
}

function createId(appleList) {
  if (!appleList.length) {
    return 1;
  }
  return (
    appleList.reduce((id, apple) => (id < apple.id ? apple.id : id), 0) + 1
  );
}

function getAppleList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: '红苹果',
          id: 1,
          weight: random(200, 300),
          isEaten: false,
        },
        {
          name: '红苹果',
          id: 2,
          weight: random(200, 300),
          isEaten: true,
        },
        {
          name: '红苹果',
          id: 3,
          weight: random(200, 300),
          isEaten: false,
        },
      ]);
    }, 1000);
  });
}

function getApple(appleList) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '红苹果',
        id: createId(appleList),
        weight: random(200, 300),
        isEaten: false,
      });
    }, 1000);
  });
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
