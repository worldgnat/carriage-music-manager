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

function MusicSources() {
  const [musicSources, setMusicSources] = useState([])
  const [selectedSource, setSelectedSource] = useState(-1)

  const createSourceItems = (musicSources) => {
    const items = []
    let index = 0
    for (const source of musicSources) {
      items.push({'id': index, 'source': source})
      index++
    }
    return items
  }
  
  window.fileHandling.getMusicSources()
    .then((musicSources, error) => {
      setMusicSources(createSourceItems(musicSources))
    })

  const addMusicSource = async () => {
    await window.fileHandling.addMusicSource()
    const sources = await window.fileHandling.getMusicSources()
    setMusicSources(createSourceItems(sources))
  }

  const removeMusicSource = async () => {
    await window.fileHandling.removeMusicSource(musicSources[selectedSource].source)
    const sources = await window.fileHandling.getMusicSources()
    setMusicSources(createSourceItems(sources))
  }
  
  return <>
    <Flex vertical>
      <Listy items={musicSources} height={400} rowKey="id" itemRender={item => (
          (item.id === selectedSource) ? (
            <MusicSourceItem selectState={true} item={item} clickHandler={setSelectedSource}/>
          ) : (
            <MusicSourceItem selectState={false} item={item} clickHandler={setSelectedSource}/>
          )
        )} />
      <Flex horizontal>
        <Button type="primary" onClick={addMusicSource}>+</Button>
        <Button type="secondary" onClick={removeMusicSource}>-</Button>
      </Flex>
    </Flex>
  </>
}

function MusicSourceItem({ selectState, item, clickHandler }) {
  const text = selectState ? "(Selected)" + item.source : item.source

  const selectSelf = () => {
    clickHandler(item.id)
  }
  return <>
    <Flex horizontal onClick={selectSelf}>{text}</Flex>
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
            <MusicSources />
            <Button onClick={scanCollection}>Scan Collection</Button>
          </Flex>
        </div>
      </section>
    </>
  )
}

export default App
