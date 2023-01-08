- yarn add @babel/core @babel/cli @babel/preset-react
- masukan script `"build": "babel src --out-dir lib"` di package.json
- buat file .babelrc
- masukan `{ "presets": ["@babel/preset-react"] }` di .babelrc
- jalankan command `yarn build`
- install depedency `yarn add lite-server` untuk menjalankan server local
- masukan script `"start": "lite-server --baseDir public"` di package.json
- jalankan command `yarn start`
- `"build": "babel src --out-dir public -w"` -w ini berfungsi untuk otomatis compile ketika ada perubahan di src, jadi ngecompile ulang si javascriptnya tanpa harus menjalankan command `yarn build` lagi, cukup sekali aja

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

const className = "box";
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

## Component Lifecycle (React.useEffect) (1)

```js
const root = document.querySelector("#root");

/*
Component Lifecycle : memungkinkan kita bisa mengeksekusi sebuah function dimana waktu eksekusinya itu pada saat 
component tersebut di render. Jadi pas component itu di render oleh browser, nah disitulah kita bisa melakukan sesuatu
dengan menggunakan function javascript 
*/

function App() {
  const [diklik, setDiklik] = React.useState(false);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    // jadi kalo ada perubahan pada state dan di render ulang, maka function ini akan dijalankan
    console.log(document.getElementById("judul"));
  }, [count]);
  // Parameter Kedua adalah state yg ingin kita pantau, jadi ketika ada perubahan pada state tersebut, functionnya
  // akan di eksekusi, kalo ada state lain selain si state 'count' ini, maka functionnya gk akan di eksekusi
  return (
    <>
      <h1 id="judul">Hello Ini Judul</h1>
      <button
        onClick={function () {
          setDiklik(true);
        }}
      >
        Klik aku
      </button>
      <button
        onClick={function () {
          setCount(count + 1);
        }}
      >
        Tambah
      </button>
      <p>Nilai Saat ini : {count}</p>
    </>
  );
}

setTimeout(() => {
  ReactDOM.render(<App />, root);
}, 1000);
```

### Component Lifecycle React.useEffect (2)

```js
// Jadi hanya menjalankan function ini ketika pertama kali di render. Kalo ada state yg berubah, functionnya gk
// bakalan di eksekusi, karena parameter keduanya empty array.
React.useEffect(() => {
  // jadi kalo ada perubahan pada state dan di render ulang, maka function ini akan dijalankan
  console.log(document.getElementById("judul"));
}, []);
```

Jika ada component terus di render ke DOM Tree untuk pertama kali, istilahnya adalah mount

- component did mount (pake empty array)
- component did update (gk pake empty array atau parameter keduanya kosong)

## Clean up / Unmount

```js
const root = document.querySelector("#root");

function App() {
  const [diklik, setDiklik] = React.useState(false);
  const [count, setCount] = React.useState(0);

  // Clean up untuk menghapus function ini ketika pindah halaman tanpa reload/refresh
  React.useEffect(() => {
    console.log("init carousel");

    // Ketika kita meng-init sesuatu, contoh meng-init library atau sesuatu yg lain di component tersebut, ketika
    // si component nya itu mau dihapus, kita harus clean up, kita harus hapus si instance nya dari initialize sebelumnya
    // supaya bersih memorinya
    return function () {
      // ini istilahnya component unmount, jadi ketika component tersebut di hapus dari DOM Tree
      console.log("destroy carousel");
    };
  });
  return (
    <>
      <h1 id="judul">Hello Ini Judul</h1>
      <button
        onClick={function () {
          setDiklik(true);
        }}
      >
        Klik aku
      </button>
      <button
        onClick={function () {
          setCount(count + 1);
        }}
      >
        Tambah
      </button>
      <p>Nilai Saat ini : {count}</p>
    </>
  );
}

setTimeout(() => {
  ReactDOM.render(<App />, root);
}, 1000);
```

## Conditional Rendering

```js
const root = document.querySelector("#root");

function App() {
  const [login, setLogin] = React.useState(false);

  if (login) {
    return (
      <>
        <h1>Udah login bang</h1>
        <button
          onClick={() => {
            setLogin(false);
          }}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <h1>Login dulu bang</h1>
      <button
        onClick={() => {
          setLogin(true);
        }}
      >
        Login
      </button>
    </>
  );
}

ReactDOM.render(<App />, root);
```

## Conditional Rendering

```js
const root = document.querySelector("#root");

const root = document.querySelector("#root");

function App() {
  const [login, setLogin] = React.useState(false);

  return (
    <>
      <h1>Application</h1>
      <p>{login ? <b>Kamu Sudah Login</b> : <i>Kamu belum login</i>}</p>
      // <p>{login === true && <b>Kamu Sudah Login</b>}</p>
      <button
        onClick={() => {
          setLogin(true);
        }}
      >
        Login
      </button>
    </>
  );
}

ReactDOM.render(<App />, root);

```

## Manipulasi DOM
untuk manipulasi DOM di react, kita perlu eksekusi code nya itu pada saat component itu di render, jangan di luar itu
karena kita gk tau component itu di render atau gk. Kalo gk nanti hasilnya jadi null lagi.
```js
const root = document.querySelector("#root");

function App() {
  const [login, setLogin] = React.useState(false);

    React.useEffect(() => {
        const judul = document.getElementById('judul')
        setTimeout(() => {
            judul.textContent = 'Aplikasi'
        }, 1000);
    },[])

  return (
    <>
      <h1 id='judul'>Application</h1>
    </>
  );
}

ReactDOM.render(<App />, root);
```
```js
const root = document.querySelector("#root");

function App() {
  const [login, setLogin] = React.useState(false);
  const judulRef = React.useRef(null);
  console.log(judulRef);

  React.useEffect(() => {
    // const judul = document.getElementById("judul");
    setTimeout(() => {
      judulRef.current.textContent = "Aplikasi";
    }, 1000);
  }, []);

  return (
    <>
      <h1 ref={judulRef}>Application</h1>
    </>
  );
}

ReactDOM.render(<App />, root);
```

## React List
```js
const root = document.querySelector("#root");

function App() {
  const fruits = ["Apple", "Orange", "Grape", "Lengkeng"];

  return (
    <ul>
      {/* Pake .map karena dia support return */}
      {fruits.map((fruit) => {
        // key ini value nya harus unique, jadi gk boleh ada key yg value nya itu sama
        return <li key={fruit}>{fruit}</li>
      })}
    </ul>
  );
}

ReactDOM.render(<App />, root);
```

## Bikin Form di react (uncontrolled)
```js
const root = document.querySelector("#root");

function App() {
  const namaRef = React.useRef(null);

  const ketikaSubmit = (event) => {
    event.preventDefault(); // mencegah si form itu dari prevent default nya yaitu navigate ke satu halaman lain
    const nama = namaRef.current.value; // uncrontroled element/component di react. jadi semua ini tergantung pada DOM node
    console.log("nama : ", nama);
  };

  return (
    <form onSubmit={ketikaSubmit}>
      <div>
        <label>Nama : </label>
        <input type="text" name="nama" ref={namaRef} />
      </div>
      <button type="submit">Kirim</button>
    </form>
  );
}

ReactDOM.render(<App />, root);
```

## Bikin Form di react (controlled component -> bergantung ke state)
```js
const root = document.querySelector("#root");

function App() {
  const [nama, setNama] = React.useState("yazid");

  const ketikaSubmit = (event) => {
    event.preventDefault();

    console.log('Nama : ', nama)
  };

  return (
    <form onSubmit={ketikaSubmit}>
      <div>
        <label>Nama : </label>
        <input
          type="text"
          name="nama"
          value={nama}
          onChange={(event) => {
            setNama(event.target.value);
          }}
        />
      </div>
      <button type="submit">Kirim</button>
    </form>
  );
}

ReactDOM.render(<App />, root);
```

## Data Fetch / ngambil data dari server