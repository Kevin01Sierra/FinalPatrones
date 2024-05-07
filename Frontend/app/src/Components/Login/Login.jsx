function Login() {

  const URL_POST = 'http://localhost:3241/login'; // Endpoint para confirmar datos
  const URL_USER = '/user'; // Endpoint del perfil de usuario
  const URL_REGISTRO = 'registro'; // Endpoint para registro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [UserDataName, setUserDataName] = useState('')
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //ir A User
  const irAOtraRuta = () => {
    navigate('/user/${userId}', { state: { key: userId } });
  };
  //muchas funciones para el login que luego tienen que separarse
  function login(event) {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor complete todos los campos.');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "usuario": username,
      "contrasena": password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    //primer post para usuario y contraseña
    fetch(URL_POST, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json(); // Procesamos la respuesta JSON si es exitosa
        } else {
          console.log(response);
          alert(response);
          throw new Error('Failed to fetch data'); // Manejamos errores en caso de fallo en la petición

        }
      })
      .then(data => {
        if (data && data.data) {
          const id = data.data.id;      // Guardar el id
          const nombre = data.data.nombre; // Guardar el nombre
          setUserId(id)
          //console.log("ID:", id);       // Muestra el ID en consola
          //console.log("Nombre:", nombre); // Muestra el Nombre en consola
          // Aquí puedes hacer lo que necesites con `id` y `nombre`
          // Por ejemplo, guardarlos en el localStorage:
          localStorage.setItem('userId', id);
          localStorage.setItem('userName', nombre);
          promptForAccessCode(userId);
        }
      })
      .catch(error => {
        console.error(error);
        alert('Usuario no válido. Intente nuevamente.'); // Show alert on failed login
      });
      //segundo post para el codigo
    function promptForAccessCode(userId) {
      const code = prompt("Escriba el código de acceso:"); 
      fetch(URL_POST, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json(); // Procesamos la respuesta JSON si es exitosa
        } else {
          console.log(response);
          alert(response);
          throw new Error('Failed to fetch data'); // Manejamos errores en caso de fallo en la petición
        }
      })
      .then(data => {
        if (data && data.data) {
          const id = data.data.id;      // Guardar el id
          const nombre = data.data.nombre; // Guardar el nombre
          const cod_verificacion = data.data.cod_verificacion;
          if (code==cod_verificacion){
            irAOtraRuta(); // Redireccionar al usuario, modificar según tu necesidad
          }
          else{
            alert('codigo incorrecto');
          }
        }
      })
      .catch(error => {
        console.error(error);
        alert('Usuario no válido. Intente nuevamente.'); // Show alert on failed login
      });
      
    }
  }


  return (
    <>
      <div id='container'>
        <div id='backgroundContainer'>
          <img src={backgroundLogin} alt="Background"></img>
        </div>
        <div id='contentContainer'>
          <img id='logo' src={Logo} alt="Logo"></img>
          <h2>Bienvenido!</h2>
          <label>Bienvenido de nuevo, que placer tenerte acá </label>
          <form>
            <div id='username'>
              <label>Usuario</label>
              <input type='text' id='inputUsername' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div id='password'>
              <label>Contraseña</label>
              <input type='password' id='inputPassword' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div id='cod'>
              <label>cod</label>
              <input type='cod' id='inputPassword' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button type='button' id='btnIngresar' onClick={login}>Ingresar</button>
          </form>
          <p>Aún no tienes una cuenta? <a href={URL_REGISTRO}>Registrate</a></p>
        </div>
      </div>
    </>
  )
}