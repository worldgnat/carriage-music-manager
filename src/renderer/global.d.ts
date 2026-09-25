interface Window {
  fileHandling: {
    getMusicSources: () => Promise<string[]>;
    addMusicSource: () => Promise<void>;
    removeMusicSource: (sourceDirectory: string) => Promise<void>;
  };
  musicCollection: {
    scanCollection: () => Promise<unknown>;
    getCollection: () => Promise<Record<string, any>>;
    convertCollection: () => Promise<void>;
    onCollectionUpdate: (callback: (collection: Record<string, any>) => void) => void;
  };
}
