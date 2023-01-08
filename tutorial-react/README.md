- yarn add @babel/core @babel/cli @babel/preset-react
- masukan script ```"build": "babel src --out-dir lib"``` di package.json
- buat file .babelrc
- masukan ```{ "presets": ["@babel/preset-react"] }``` di .babelrc
- jalankan command ```yarn build```
- install depedency ```yarn add lite-server``` untuk menjalankan server local
- masukan script ```"start": "lite-server --baseDir public"``` di package.json
- jalankan command ```yarn start```
- ```"build": "babel src --out-dir public -w"``` -w ini berfungsi untuk otomatis compile ketika ada perubahan di src, jadi ngecompile ulang si javascriptnya tanpa harus menjalankan command ```yarn build``` lagi, cukup sekali aja

## Inline CSS
```js
const root = document.querySelector("#root");

const element = (
  <div
    style={{
      width: 200,
      height: 200,
      backgroundColor: "blue",
    }}
  ></div>
);

ReactDOM.render(element, root);
```

## Eksternal CSS
- buat file css di folder public
- panggil css nya di index.html
code CSS nya
```css
body {
    background-color: black;
    margin: 0;
}

.box {
    width: 200px;
    height: 200px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
```
code app.js nya
```js
const root = document.querySelector("#root");

const className = 'box';
const element = <div className={className}></div>;

ReactDOM.render(element, root);
```

## Event Handling
```js
const root = document.querySelector("#root");

function padaSaatAkuDiKlik(msg) {
  alert(msg);
}

// cara pertama
// const element = (
//   <button
//     onClick={function () {
//       padaSaatAkuDiKlik("halo");
//     }}
//   >
//     Click me
//   </button>
// );

// cara kedua
const element = (
  <button onClick={padaSaatAkuDiKlik.bind(this, "halo aku di click")}>
    Click me
  </button>
);
// console.log(padaSaatAkuDiKlik.bind(this, "halo aku di click"))
// Jadi .bind ini dia memproduksi function baru.

ReactDOM.render(element, root);
```

## Cara pake React State (1)
```js
const root = document.querySelector("#root");

/*
React State : State adalah data yg ada di dalam react component, data itu terisolasi, jadi gk bisa tuh di akses 
oleh component lain, cuma component itu aja yg bisa akses. Kemudian data nya juga bisa di ubah, jadi datanya ketika di ubah
component tersebut, dia akan di render ulang, jadi misal ada component didalamnya ada state, nah maka component itu akan 
di render ulang ketika data di dalam state itu di ubah.
*/

function App() {
  const state = React.useState(0); // meng init si state pake React.useState
  //   console.log(state)
  const count = state[0];
  const updateCount = state[1];

  return (
    <>
      <button
        onClick={function () {
          updateCount(count - 1);
        }}
      >
        -
      </button>
      <span> {count} </span>
      <button
        onClick={function () {
          updateCount(count + 1);
        }}
      >
        +
      </button>
    </>
  );
}

ReactDOM.render(<App />, root);
```

## Cara pake React State (2)
```js
const root = document.querySelector("#root");

/*
Disctructuring : memecah komponen yang kompleks menjadi komponen yang lebih kecil.
*/

function App() {
  const [count, setCount] = React.useState(0); // contoh Disctructuring

  return (
    <>
      <button
        onClick={function () {
          setCount(count - 1);
        }}
      >
        -
      </button>
      <span> {count} </span>
      <button
        onClick={function () {
          setCount(count + 1);
        }}
      >
        +
      </button>
    </>
  );
}

ReactDOM.render(<App />, root);
```