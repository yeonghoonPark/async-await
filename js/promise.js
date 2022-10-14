"use strict";

/******************************************************************************************
 *
 * map()과 reduce()에서의 await-async 사용법
 *
 * 참고사이트 및 출처
 * https://velog.io/@minsangk/2019-09-06-0209-작성됨-eik06xy8mm
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
 *
 * ****************************************************************************************/

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
    }, 2000);
  });
};

/*********************************
 *********  map()의 경우  *********
 ********************************/

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
 * map, 비동기 처리를 해주지 못한 실행되지 않은 pending상태의 Promise배열을 반환 함.
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
 * 만약 resolve()나 reject() 여부에 관계 없이 (조건이 있다면 조건에 맞는)가장 먼저 수행 된 결과를 받고 싶다면 Promise.race()를 사용하면 된다.
 * 만약 reject(), 거부 된 Promise가 있음에도 불구하고 모든 Promise를 순행하고 싶다면 Promise.allSettled()를 사용하면 된다.
 */

// Promise.all()
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

// Promise.race()
const changeUserId4 = async () => {
  const newUserInfomation = await Promise.race(
    userInfomation.map(async (item) => {
      item.id = await getCreatedNewId();
      return item;
    }),
  );
  console.log(newUserInfomation, "후");
};
// changeUserId4();

/*********************************
 *******  reduce()의 경우  ********
 ********************************/

/**
 * reduce, await는 실제로 함수가 결과를 줄 때까지 기다리는 것이 아니라 await가 사용 된 시점에서 이미 pending 상태의 Promise를 리턴한 상태이다.
 */
const changeUserId5 = async () => {
  const newUserInfomation = await userInfomation.reduce(async (acc, cur) => {
    console.log("before", acc.id, acc);
    acc[cur.id] = await getCreatedNewId(cur);
    console.log("after", acc.id, acc);
    return acc;
  }, {});
  console.log(newUserInfomation, "후");
};
// changeUserId5();

/**
 * Promise.all()을 이용한 map() + reduce()
 */
const changeUserId6 = async () => {
  const newUserInfomation = (
    await Promise.all(
      userInfomation.map((item) => {
        return getCreatedNewId(item);
      }),
    )
  ).reduce((result, message, index) => {
    const user = userInfomation[index];
    result[user.id] = message;
    return result;
  }, {});
  console.log(newUserInfomation, "후");
};
// changeUserId6();

/**
 * Promise.resolve()를 이용한 방법
 * Promise.resolve()는 넘겨준 값을 그대로 resolve 해주는 Promise를 리턴한다.
 */

// 1. initialValue를 Promise.resolve()로 설정
// 2. iteration 안에서 전달 받은 Promise를 accumulator로 찾아오기 위해 await promise.then()으로 받는다.
// 3. accumulator를 변경한다.
// 4. 다음 iteration 에서는 다시 Promise로 넘기기 위해서 Promise.resolve(result)를 리턴한다.
const changeUserId7 = async () => {
  const newUserInfomation = await userInfomation.reduce(async (acc, cur) => {
    let result = await acc.then();
    result[cur.id] = await getCreatedNewId();
    return Promise.resolve(result);
  }, Promise.resolve({}));
  console.log(newUserInfomation, "후");
};
// changeUserId7();

/**
 * Promise.resolve()를 이용했지만 생략가능하기에 생략한 방법
 * async-await의 동작방식상 async함수의 리턴값은 Promise.resolve로 래핑하지 않아도 Promise로 자동래핑된다.
 */
const changeUserId8 = async () => {
  const newUserInfomation = await userInfomation.reduce(async (acc, cur) => {
    let result = await acc;
    result[cur.id] = await getCreatedNewId(cur);
    return result;
  }, {});

  console.log(newUserInfomation, "후");
};
// changeUserId8();
