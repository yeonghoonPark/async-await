"use strict";

/**
 * map()과 reduce()에서의 await-async 사용법
 *
 * 참고사이트 및 출처
 * https://velog.io/@minsangk/2019-09-06-0209-작성됨-eik06xy8mm
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */

// object array
const userInfomation = [
  {
    id: 1665409761275,
    name: "Lee Jung-jae",
    age: 49,
    nationality: "South Korea",
  },
  {
    id: 1665409761399,
    name: "Mike Tyson",
    age: 56,
    nationality: "USA",
  },
  {
    id: 1665409950114,
    name: "Jim Carrey",
    age: 60,
    nationality: "Canada",
  },
  {
    id: 1665409953471,
    name: "Tom Cruise",
    age: 60,
    nationality: "USA",
  },
  {
    id: 1665409955990,
    name: "Manny Pacquiao",
    age: 43,
    nationality: "Philippine",
  },
];
console.log(userInfomation, "전");

// setTimeout()을 이용한 비동기처리
let id = Date.now();
const getCreatedNewId = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id++);
    }, 3000);
  });
};

/**
 * forLoop, 배열 method가 아닌 일반 반복문인 forLoop의 경우 await처리를 해줄 수 있다.
 */
const changeUserId1 = async () => {
  const newUserInfomation = [];
  for (let i = 0; i < userInfomation.length; i++) {
    userInfomation[i].id = await getCreatedNewId();
    newUserInfomation[i] = userInfomation[i];
  }
  console.log(newUserInfomation, "후");
};
// changeUserId1();

/**
 * map, 비동기 처리를 해주지 못한 실행되지 않은 Promise배열을 반환 함.
 * 이유, await는 Promise객체를 실행하고 기다려주지만 Promise배열로는 그렇게 할 수 없다.
 */
const changeUserId2 = () => {
  const newUserInfomation = userInfomation.map(async (item) => {
    item.id = await getCreatedNewId();
    return item;
  });
  console.log(newUserInfomation, "후");
};
// changeUserId2();

/**
 * Promise.all(iterable),
 * 1. 모든 Promise가 순행하며 이행하는 것을 기본으로 한다.
 * 2. Promise 각각의 이행 값을 모두 모아놓은 배열로 이행하며, 배열요소의 순서는 지정한 Promise의 순서를 유지한다.
 * 3. 만약 반환하는 Promise가 거부된다면, 반환하는 Promise중 거부 된 첫번째 Promise를 반환하며 거부 된 해당 Promise의 reject()만 실행한다.
 *
 * 즉, 모든 Promise들이 resolve했을 때의 결과를 보장 받고 싶을 때 사용할 수 있다.
 * 만약 reject(), 거부 된 Promise가 있음에도 불구하고 모든 Promise를 순행하고 싶다면 Promise.allSettled()를 사용하면 된다.
 * 만약 resolve()나 reject() 여부에 관계 없이 (조건에 맞는)가장 먼저 수행 된 결과를 받고 싶다면 Promise.race()를 사용하면 된다.
 */
const changeUserId3 = async () => {
  const newUserInfomation = await Promise.all(
    userInfomation.map(async (item) => {
      item.id = await getCreatedNewId();
      return item;
    }),
  );
  console.log(newUserInfomation, "후");
};
// changeUserId3();
