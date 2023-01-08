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
