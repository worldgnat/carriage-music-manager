import { useState } from 'react'
import './App.css'
import { Button } from 'antd'
import { Input } from 'antd'
import { Flex } from 'antd'
import { Typography } from 'antd'
import { Menu } from 'antd'

const { TextArea } = Input;


function MusicSources() {
  const [musicSources, setMusicSources] = useState([])
  const [selectedSource, setSelectedSource] = useState(0)

  const createSourceItems = (musicSources) => {
    const items = []
    let index = 0
    for (const source of musicSources) {
      items.push({'key': index, 'label': source})
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
    await window.fileHandling.removeMusicSource(musicSources[selectedSource].label)
    const sources = await window.fileHandling.getMusicSources()
    setMusicSources(createSourceItems(sources))
  }
  
  return <>
    <Flex vertical>
      <Menu 
        defaultSelectedKeys={['1']}
        mode="inline"
        items={musicSources} 
        onSelect={({key}) => {
          setSelectedSource(key)}}/>
      <Flex horizontal>
        <Button type="primary" onClick={addMusicSource}>+</Button>
        <Button type="secondary" onClick={removeMusicSource}>-</Button>
      </Flex>
    </Flex>
  </>
}

function MusicSourceItem({ selectState, item, clickHandler }) {
  const selectSelf = () => {
    clickHandler(item.id)
  }
  return <>
    <div onClick={selectSelf} className={selectState ? "selected" : "deselected"}>{item.source}</div>
  </>
}



function MusicCollection() {
  const [collectionJson, setCollectionJson] = useState("")

  function scanCollection() {
    window.musicCollection.scanCollection()
      .then((value) => {
        console.log(JSON.stringify(value))
        setCollectionJson(JSON.stringify(value))
      })
  }
  function convertCollection() {
    window.musicCollection.convertCollection()
  }

  return <>
    <Flex vertical>
      <TextArea rows={4} value={collectionJson} />
      <Button onClick={scanCollection}>Scan Collection</Button>
      <Button type="primary" danger onClick={convertCollection}>ConvertCollection</Button>
    </Flex>
  </>
}


function App() {
  return (
    <>
      <section id="center">
        <Flex horizontal>
          <div>
            <Typography.Title level={2}>Music Sources</Typography.Title>
            <Flex vertical>
              <MusicSources />
            </Flex>
          </div>
          <div>
            <Typography.Title level={2}>Collection</Typography.Title>
            <MusicCollection />
          </div>
        </Flex>
      </section>
    </>
  )
}

export default App
