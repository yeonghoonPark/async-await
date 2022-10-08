"use strict";

/**
 * Synchronous: '동시에 일어나는'
 * - 동기는 요청과 결과가 동시에 일어난다.
 *   - 동기함수의 경우, 요청을 받음과 동시에 요청에 대한 결과를 처리해야지만 다음 작업의 요청을 받고 진행할 수 있다.
 *
 * Asynchronous: '동시에 일어나지 않는'
 * - 비동기는 요청과 결과가 동시에 일어나지 않는다.
 *   - 비동기함수의 경우, 요청을 받은 후 결과를 처리하지 않고도 다음 작업의 요청을 받고 진행할 수 있다.
 *   - browser가 제공하는 API(ex: setTimeout())의 경우 비동기로 만들어져 있다.
 */

// Synchronous의 경우, 작업이 순차적으로 위에서 아래로 요청에 대한 결과를 처리하고 다음 작업으로 넘어간다.
console.log("일번");
console.log("이번");
console.log("삼번");
console.log("사번");

// Asynchronous의 경우, 작업이 순차적으로 위에서 아래로 진행하지만 요청을 받고 결과를 setTimeout이란 비동기함수로 delay time을 설정했기 때문에 결과를 설정한 delay time에 처리한다.
// setTimeout(() => console.log("1번"), 7000);
// setTimeout(() => console.log("2번"), 5000);
// setTimeout(() => console.log("3번"), 3000);
console.log("4번");
// - 장점: 결과를 바로 주지 않고도 다음 작업에 대한 요청을 받고 다음 요청에 대한 결과를 도출하는 것을 진행할 수 있기에 속도가 동기식에 비해 빠르다.
//        (위의 setTimeout예시의 경우, 만약 비동기함수인 setTimeout 아니라 동기함수였다면 순차적으로 7초, 5초 ,3초 후에 4번째 작업을 진행하기 때문에 4번째 작업까지 도달하는 총 소요시간은 15초가 되겠지만 비동기함수의 경우, 요청에 대한 결과를 주지 않고도 다음 요청을 받을 수 있기 때문에 총 소요시간은 7초이다.)
// - 단점: 만약 임의적으로 비동기식인 setTimeout으로 delay time을 설정할 수 없는 동기식 함수의 경우에서 1번의 결과값이 나와야 2번을 실행할 수 있고 2번의 결과값이 나와야 3번을 실행할 수 있고 3번의 결과값이 나와야 4번을 실행 할 수 있는 상황이라면..?
//        그 상황에서 1번째 함수의 작업량을 100개라고 가정하고 2,3,4번째 작업량을 1개라고 가정한다면 비동기식의 특성상 요청에 대한 결과를 도출하지 않고 다음 작업에 대한 요청을 받기 때문에 1번째 함수가 결과를 도출하는 동안 2,3,4번째도 요청을 받고 결과를 더 빠르게 도출하기 때문에 오류가 발생한다.
//        🎺. 해결책
//        *   1. 비동기적 callback함수 사용
//        *   2. ES6, Promise
//        *   3. ES8, async await

// 1. 비동기적 callback함수
const printWithDelay = (print, time) => {
  setTimeout(print, time);
};
printWithDelay(console.log("Two seconds have passed"), 2000);
// 단점, 콜백지옥이 발생할 수 있다.

// 2. Promise 객체
// 비동기 method에서 마치 동기 method처럼 값을 반환할 수 있다, 다만 최종 결과를 반환하는 것이 아니고, 미래의 어떤 시점에 결과를 제공하겠다는 '약속'을 반환한다.
//  📌. Promise의 3가지 상태(다음 중 1가지의 상태를 가진다.)
//  *   1. pending(대기): fulfilled(이행)도 rejected(거부)도 하지 않은 상태
//  *   2. fulfilled(이행): 요청이 성공적으로 완료되어 응답 받은 상태
//  *   3. rejected(거부): 요청이 실패하여 응답 받는데에 실패한 상태
// then(): Promise를 리턴하고 2개의 callback함수를 parameter로 선언할 수 있다.
// 첫번째 parameter: Promise의 상태가 fulfilled(이행)했을 때의 callback함수
// 두번째 parameter: Promise가 상태가 rejected(거부)했을 때의 callback함수
// 단점, then() 콜백지옥이 발생할 수 있다.

// 📌. Promise와 의 async-await차이점
//     * 에러 핸들링
//       - Promise 사용시, .catch()문 통해 에러 핸들링 가능
//       - async await 사용시, try-catch()문을 통해 에러 핸들링 가능
// 📌. Promise보다 await async가 가지는 장점
//     * 코드 가독성 및 동기식화
//       - Promise의 경우 .then().then().then()... (가독성 저하)
//       - async-await의 경우 비동기코드가 동기코드처럼 읽히게 할 수 있다. (Promise 불가능)

// REST-API url about coin
const url = "https://api.coinpaprika.com/v1/tickers";

// const getCoinData = () => axios.get(url);
// getCoinData().then((response) => response.data);

let promiseCnt = 0;
const testPromise = () => {
  let thisPromiseCnt = ++promiseCnt;
  const div = document.querySelector("#promise-div");
  div.insertAdjacentHTML(
    "beforeend",
    `${thisPromiseCnt}) 시작 (<small> 1.동기적 코드 시작</small> )<br/>`,
  );

  // new Promise생성, Promise의 생성 순서를 전달하겠다는 약속을 함 (3초)
  const promise = new Promise((resolve, reject) => {
    div.insertAdjacentHTML(
      "beforeend",
      `${thisPromiseCnt}) 프로미스 시작 (<small> 2.비동기적 코드 시작</small> )<br/>`,
    );
    setTimeout(() => resolve(thisPromiseCnt), 3000);
  });

  promise
    .then((value) =>
      div.insertAdjacentHTML(
        "beforeend",
        `${value}) 프로미스 이행 (<small> 3.비동기적 코드 3초 후 종료<small> )<br/>`,
      ),
    )
    .catch((reason) => {
      console.log(`여기서 거부 된 프로미스 ${reason}을 처리하세요`);
    });

  div.insertAdjacentHTML(
    "beforeend",
    `${thisPromiseCnt}) 프로미스 생성 (<small> 4.동기적 코드 종료<small> )<br/>`,
  );
};

const btn = document.querySelector("#promise-btn");
btn.addEventListener("click", testPromise);
