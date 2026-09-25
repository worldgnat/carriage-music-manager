import { useState, useEffect } from 'react'
import './App.css'
import { Button, Flex, Typography, Menu } from 'antd'

type MenuItem = { key: number; label: string }

type SongRecord = {
  artist?: string;
  album?: string;
  title?: string;
}

function MusicSources() {
  const [musicSources, setMusicSources] = useState<MenuItem[]>([])
  const [selectedSource, setSelectedSource] = useState<number>(0)

  const createSourceItems = (sources: string[]): MenuItem[] => {
    return sources.map((source, index) => ({ key: index, label: source }))
  }

  useEffect(() => {
    void window.fileHandling.getMusicSources().then((sources) => {
      setMusicSources(createSourceItems(sources))
    })
  }, [])

  const addMusicSource = async () => {
    await window.fileHandling.addMusicSource()
    const sources = await window.fileHandling.getMusicSources()
    setMusicSources(createSourceItems(sources))
  }

  const removeMusicSource = async () => {
    if (musicSources[selectedSource]) {
      await window.fileHandling.removeMusicSource(musicSources[selectedSource].label)
      const sources = await window.fileHandling.getMusicSources()
      setMusicSources(createSourceItems(sources))
    }
  }

  return (
    <Flex vertical>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        items={musicSources}
        onSelect={({ key }) => {
          setSelectedSource(Number(key))
        }}
      />
      <Flex>
        <Button type="primary" onClick={addMusicSource}>+</Button>
        <Button type="default" onClick={removeMusicSource}>-</Button>
      </Flex>
    </Flex>
  )
}

function MusicCollection() {
  const [musicCollection, setCollection] = useState<MenuItem[]>([{ key: 0, label: 'No Songs Loaded' }])

  useEffect(() => {
    window.musicCollection.onCollectionUpdate(updateCollection)
    void window.musicCollection.scanCollection()
  }, [])

  function updateCollection(collection: Record<string, SongRecord>) {
    const menuItems: MenuItem[] = []
    let index = 0
    for (const key in collection) {
      const song = collection[key]
      const item = {
        key: index,
        label: `${song.artist ?? 'Unknown Artist'} - ${song.album ?? 'Unknown Album'}: ${song.title ?? 'Untitled'}`,
      }
      menuItems.push(item)
      index++
    }
    setCollection(menuItems)
  }

  function scanCollection() {
    void window.musicCollection.scanCollection()
  }

  function convertCollection() {
    void window.musicCollection.convertCollection()
  }

  return (
    <Flex vertical>
      <Menu
        className="music-collection"
        defaultSelectedKeys={['0']}
        mode="inline"
        items={musicCollection}
        onSelect={({ key }) => {
          console.log(key)
        }}
      />
      <Button onClick={scanCollection}>Scan Collection</Button>
      <Button type="primary" danger onClick={convertCollection}>Convert Collection</Button>
    </Flex>
  )
}

function App() {
  return (
    <>
      <section id="center">
        <Flex>
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
