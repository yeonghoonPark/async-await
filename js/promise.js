"use strict";

/**
 * https://sangminem.tistory.com/284
 * https://sangminem.tistory.com/479
 * https://velog.io/@minsangk/2019-09-06-0209-작성됨-eik06xy8mm
 */

// const getMessage = (name) => {
//   return new Promise((resolve) => {
//     resolve(`Hello, ${name}`);
//   });
// };

// const printMessage1 = () => {
//   getMessage(".then().catch()").then((message) => console.log(message));
// };
// printMessage1();

// const printMessage2 = async () => {
//   const message = await getMessage("async-await");
//   console.log(message);
// };
// printMessage2();

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

const getIntroMessage = (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`이름: ${user.name}, 나이: ${user.age}`);
    }, 2000);
  });
};

const getMessage = async () => {
  const message = userInfomation.map(async (user) => {
    return await getIntroMessage(user);
  });
  console.log(message);
};
// getMessage();

let id = Date.now();
const getCreatedNewId = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id++);
    }, 3000);
  });
};

const changeUserId = async () => {
  const newUserInfomation = await Promise.all(
    userInfomation.map(async (item) => {
      item.id = await getCreatedNewId();
      return item;
    }),
  );
  console.log(newUserInfomation, "후");
};
changeUserId();
