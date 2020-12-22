// Interface
import StorageInterface from './EventStorage.interface';
import EventManager from '../events/eventBooster';

export default class EventStorage {
  _config: Object;
  constructor ( config: StorageInterface ) {
    this._config = config;
    // Initialize
    this.localStorage();
  }
  
  static InitRelatedStorage ( config: any ) {
    const key: any = localStorage.getItem('EventBooster');
    if ( key === null ) {
      localStorage.setItem('EventBooster', JSON.stringify({ EventBooster: {
        storageCreatedTime: Date(),
      } }));
    }
  }
  
  
  localStorage () {
    if (typeof(Storage) !== "undefined") {
      EventStorage.InitRelatedStorage(this._config);
    } else {
      console.error('Event Booster: Not working storage, this browser very old!');
    }
  }
  
}
