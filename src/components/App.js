import "../styles/index.scss";
import "../styles//App.scss";
import dataFromApi from "../services/adalabers_data";
import { useState, useEffect } from "react";

function App() {
  const [adalabers, setAdalabers] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [selectSearch, setSelectSearch] = useState("");
  const [newAdalaber, setNewAdalaber] = useState({
    name: "",
    counselor: "",
    speciality: "",
  });

  useEffect(() => {
    dataFromApi.adalabersApi().then((apiData) => {
      setAdalabers(apiData.results);
    });
  }, []);

  const handleSubmitForm = (ev) => {
    ev.preventDefault();
  };

  const handleChangeSearchName = (ev) => {
    setInputSearch(ev.currentTarget.value);
  };

  const handleChangeSearchCounselor = (ev) => {
    setSelectSearch(ev.target.value);
  };

  const handleChangeInputAdd = (ev) => {
    const prop = ev.currentTarget.id;
    setNewAdalaber({ ...newAdalaber, [prop]: ev.currentTarget.value });
  };

  const setDefaultInput = () => {
    setNewAdalaber({
      name: "",
      counselor: "",
      speciality: "",
    });
  };

  const handleClickAddBtn = () => {
    const addAdalaber = [...adalabers, newAdalaber];
    setAdalabers(addAdalaber);
    setDefaultInput();
  };

  const htmlTable = adalabers
    .filter((eachAdalaber) =>
      eachAdalaber.name.toLowerCase().includes(inputSearch.toLowerCase())
    )
    .filter((eachAdalaber) =>
      selectSearch !== ""
        ? eachAdalaber.counselor === selectSearch
        : eachAdalaber.counselor === "Dayana" || "Iván" || "Yanelis"
    )
    .map((eachAdalaber, index) => {
      return (
        <tr key={index}>
          <th className="table__columns">{eachAdalaber.name}</th>
          <th className="table__columns">{eachAdalaber.counselor}</th>
          <th className="table__columns">{eachAdalaber.speciality}</th>
          {/* <th>
        <i class="fab fa-github-alt" href={eachAdalaber.social_networks[0].url} title={`Link al ${eachAdalaber.social_networks[0].name}`}></i>
        <i class="fab fab fa-linkedin" href={eachAdalaber.social_networks[0].url} title={`Link al ${eachAdalaber.social_networks[0].name}`}></i>
        <i class="fab fab fa-twitter" href={eachAdalaber.social_networks[0].url} title={`Link al ${eachAdalaber.social_networks[0].name}`}></i>
      </th> */}
        </tr>
      );
    });

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Adalabers</h1>
      </header>
      <main>
        <form className="filters" action="" onSubmit={handleSubmitForm}>
          <div className="filters__name">
            <label className="filters__name--label" htmlFor="inputSearch">
              Nombre:
            </label>
            <input
              className="filters__name--input"
              type="text"
              id="inputSearch"
              placeholder="Ej. Mari Carmen"
              value={inputSearch}
              onChange={handleChangeSearchName}
            />
          </div>
          <div className="filters__select">
            <label
              className="filters__select--label"
              htmlFor="counselorsOptions"
            >
              Escoge una tutora:
            </label>
            <select
              className="filters__select--input"
              name="counselorsOptions"
              id="counselor"
              value={adalabers.counselor}
              onChange={handleChangeSearchCounselor}
            >
              <option defaultValue value="">
                Cualquiera
              </option>
              <option value="Dayana">Dayana</option>
              <option value="Iván">Iván</option>
              <option value="Yanelis">Yanelis</option>
            </select>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr className="table__header--row">
              <th className="table__columns">Nombre</th>
              <th className="table__columns">Tutora</th>
              <th className="table__columns">Especialidad</th>
              {/* <th>Redes</th> */}
            </tr>
          </thead>
          <tbody>{htmlTable}</tbody>
        </table>
        <section className="add-adalaber">
          <h2 className="add-adalaber__subtitle">Añadir una Adalaber</h2>
          <form
            className="add-adalaber__form"
            action=""
            onSubmit={handleSubmitForm}
          >
            <div className="add-adalaber__name">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                value={newAdalaber.name}
                onChange={handleChangeInputAdd}
              />
            </div>
            <div className="add-adalaber__counselor">
              <label htmlFor="counselor">Tutora</label>
              <input
                type="text"
                id="counselor"
                value={newAdalaber.counselor}
                onChange={handleChangeInputAdd}
              />
            </div>
            <div className="add-adalaber__speciality">
              <label htmlFor="speciality">Especialidad</label>
              <input
                type="text"
                id="speciality"
                value={newAdalaber.speciality}
                onChange={handleChangeInputAdd}
              />
            </div>
            <input
              className="add-adalaber__btn"
              type="submit"
              value="Añadir una nueva Adalaber"
              onClick={handleClickAddBtn}
            />
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
