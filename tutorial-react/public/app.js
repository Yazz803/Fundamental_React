const root = document.querySelector("#root");

/*
Component Lifecycle : memungkinkan kita bisa mengeksekusi sebuah function dimana waktu eksekusinya itu pada saat 
component tersebut di render. Jadi pas component itu di render oleh browser, nah disitulah kita bisa melakukan sesuatu
dengan menggunakan function javascript 
*/

function App() {
  React.useEffect(() => {
    console.log(document.getElementById('judul'));
  });
  return /*#__PURE__*/React.createElement("h1", {
    id: "judul"
  }, "Hello Ini Judul");
}
setTimeout(() => {
  ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);
}, 1000);