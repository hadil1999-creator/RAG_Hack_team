import { useState ,useEffect} from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <>
     <div className="">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
    </>
  )
}

export default App
