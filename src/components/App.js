import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  
  const [js, setJs] = useLocalStorage('js')
  const [srcDoc, setSrcDoc] = useState('')

  async function send(fun){
        if(fun.length <= 2){
          fun = 'function hey(){ return "Ni hai bhai kuch type kar udhar"}';
        }
        let res = await fetch('http://3.135.184.153:8000/function/executeFunction', {
                method: 'post',
                headers: {
                        'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({function: fun})
        });
        let json = await res.json();
        setSrcDoc(json.response);      
  }

  async function sendx1000(fun){
    if(fun.length <= 2){
      fun = 'function hey(){ return "Ni hai bhai kuch type kar udhar"}';
    }
    let res = await fetch('http://3.135.184.153:8000/function/executeFunctionx1000', {
            method: 'post',
            headers: {
                    'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({function: fun})
    });
    let json = await res.json();
    setSrcDoc(json.response);      
}

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setSrcDoc(`
  //       <html>
  //         <script>${js}</script>
  //       </html>
  //     `)
  //   }, 250)

  //   return () => clearTimeout(timeout)
  // }, [ js])


  //console.log(document.querySelector('#hey').value)

  return (
    <>
      <div className="editor-title">
        {/* <select id="cars">
        <option value="js">Javascript</option>
        <option value="python">Python</option>
        </select> */}
        <button className='run' onClick={()=>send(js)}>
          Run
        </button>
        <button className='run1000' onClick={()=>sendx1000(js)}>
          Run 1000
        </button>
      </div>
      <div className="pane top-pane " id="hey">
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
