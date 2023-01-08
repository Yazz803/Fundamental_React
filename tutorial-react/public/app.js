const root = document.querySelector("#root");
function App() {
  const [nama, setNama] = React.useState("yazid");
  const ketikaSubmit = event => {
    event.preventDefault();
    console.log('Nama : ', nama);
  };
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: ketikaSubmit
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Nama : "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "nama",
    value: nama,
    onChange: event => {
      setNama(event.target.value);
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Kirim"));
}
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);