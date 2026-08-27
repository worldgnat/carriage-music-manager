import { useState } from 'react'
import './App.css'
import { Button } from 'antd'
import { Input } from 'antd'
import { Flex } from 'antd'
import { Typography } from 'antd'
import { Listy } from 'antd'

function Mp3LibraryInput() {
  const [mp3FilePath, setMp3FilePath] = useState("Directory")
  window.fileHandling.getMp3Directory()
    .then((mp3Directory, error) => {
      setMp3FilePath(mp3Directory)
    })

  const pickMp3Directory = async () => {
    await window.fileHandling.pickMp3Directory()
    const directory = await window.fileHandling.getMp3Directory()
    setMp3FilePath(directory)
  }

  return <>
    <Typography.Title level={5}>MP3 Library</Typography.Title>
    <DirectoryPicker filePath={mp3FilePath} buttonAction={pickMp3Directory} />
  </>
}

function FlacLibraryInput() {
  const [flacFilePath, setFlacFilePath] = useState("Directory")

  window.fileHandling.getFlacDirectory()
    .then((flacDirectory, error) => {
      setFlacFilePath(flacDirectory)
    })

    const pickFlacDirectory = async () => {
      await window.fileHandling.pickFlacDirectory()
      const directory = await window.fileHandling.getFlacDirectory()
      setFlacFilePath(directory)
    }

    return <>
      <Typography.Title level={5}>FLAC Library</Typography.Title>
      <DirectoryPicker filePath={flacFilePath} buttonAction={pickFlacDirectory} />
    </>
}

function scanCollection() {
  window.musicCollection.scanCollection()
}

function DirectoryPicker({ filePath, buttonAction }) {
  return <>
    <Flex horizontal>
      <Input disabled placeholder={filePath}></Input>
      <Button type="primary" onClick={() => {buttonAction()}}>Set</Button>
    </Flex>
  </>
}


function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
        </div>
        <div>
          <Typography.Title level={2}>Music Collection</Typography.Title>
          <Flex vertical>

            <Mp3LibraryInput />
            <FlacLibraryInput />
            <Button onClick={scanCollection}>Scan Collection</Button>
          </Flex>
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
