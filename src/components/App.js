import '../styles/index.scss';
import '../styles//App.scss';
import dataFromApi from '../services/adalabers_data'
import {useState, useEffect} from 'react';
 
function App() {

  const [adalabers, setAdalabers] = useState([]);
  const [newAdalaber, setNewAdalaber] = useState({
    name: '',
    counselor: '',
    speciality: '',
  })

  useEffect( () => {
    dataFromApi.adalabersApi()
    .then(apiData => {
      setAdalabers(apiData.results)
    })
  }, []);

  const handleSubmitForm = ev => {
    ev.preventDefault();
  }

  const handleChangeInputAdd = (ev) => {
    const prop = ev.currentTarget.id;
    setNewAdalaber({...newAdalaber,
    [prop]: ev.currentTarget.value,
    });
  }

  const handleClickAddBtn = () => {
    const addAdalaber = [...adalabers, newAdalaber];
    setAdalabers(addAdalaber);
  }

  //Pensar cómo hacerlo con el id para que funcione el key con las que se añaden
  const htmlTable = adalabers.map((eachAdalaber, index) => {
    return <tr key={index}> 
      <th>{eachAdalaber.name}</th>
      <th>{eachAdalaber.counselor}</th>
      <th>{eachAdalaber.speciality}</th>
    </tr>
  });

  return (
    <div className="App">
      <h1>Adalabers</h1>
      {/* <form action="" onSubmit={handleSubmitForm}>
        
      </form> */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {htmlTable}
        </tbody>
        </table>
        <h2>Añadir una Adalaber</h2>
        <form action="" onSubmit={handleSubmitForm}>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" value={newAdalaber.name} onChange={handleChangeInputAdd}/>
          <label htmlFor="counselor">Tutora</label>
          <input type="text" id="counselor" value={newAdalaber.counselor} onChange={handleChangeInputAdd}/>
          <label htmlFor="speciality">Especialidad</label>
          <input type="text" id="speciality" value={newAdalaber.speciality} onChange={handleChangeInputAdd}/>
          <input type="submit" value="Añadir una nueva Adalaber" onClick={handleClickAddBtn}/>
        </form>
    </div>
  );
}

export default App;
