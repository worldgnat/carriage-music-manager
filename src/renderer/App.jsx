import { useState } from 'react'
import './App.css'
import { Button } from 'antd'
import { Input } from 'antd'

const listDirectory = async () => {
  const directoryListing = await window.fileHandling.listDirectory()
  console.log(directoryListing)
}



function Mp3LibraryInput() {
  const [filePath, setFilePath] = useState("Directory")
  window.fileHandling.getMp3Directory()
    .then((mp3Directory, error) => {
      setFilePath(mp3Directory)
    })

  const pickMp3Directory = async () => {
    await window.fileHandling.pickMp3Directory()
    const directory = await window.fileHandling.getMp3Directory()
    setFilePath(directory)
  }

  return <>
    <Input disabled placeholder={filePath}></Input>
    <Button type="primary" onClick={() => {pickMp3Directory()}}>Set</Button>
  </>
}

function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
        </div>
        <div>
          <h1>Music Collection</h1>
          <div>
            <h2>MP3 Library</h2>
            <Mp3LibraryInput></Mp3LibraryInput>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
