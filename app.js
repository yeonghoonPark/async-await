"use strict";

// const url = "https://api.coinpaprika.com/v1/tickers";

const user = {
  id: 1,
  name: "Jasper",
};

// const downloadData = () => {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => data[0]);
// };

/* async await 기본 문법 */
/*
const 함수 = async () => {
  const 비동기_처리_함수 = await ~ ~ ~
}
*/

// const fetchItems = () => {
//   return new Promise((resolve, reject) => {
//     const items = [1, 2, 3];
//     setTimeout(() => {
//       resolve(items);
//     }, 3000);
//   });
// };

// const logItems = async () => {
//   const resultItems = await fetchItems();
//   console.log(resultItems);
// };

// logItems();

/* async await 예제 */
const userInfomation = [];

const fetchUser = async () => {
  const url = "https://jsonplaceholder.typicode.com/users/1";
  const response = await fetch(url);
  return await response.json();
};

const fetchTodo = async () => {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await fetch(url);
  return await response.json();
};

const logTodoTitle = async () => {
  try {
    const user = await fetchUser();
    if (user.id === 1) {
      const todo = await fetchTodo();
      console.log(todo.title);
    }
  } catch (error) {
    console.log(error);
  }
};

logTodoTitle();

const fetchCoins = async () => {
  const url = "https://api.coinpaprika.com/v1/tickers";
  const response = await fetch(url);
  const data = await response.json();
  printCoins(data);
};

const printCoins = (parameter) => {
  parameter.forEach((item) => {
    console.log(item.id);
    const li = document.createElement("li");
    const body = document.body;
    body.append(li);
    li.innerText = item.id;
  });
};

fetchCoins();
