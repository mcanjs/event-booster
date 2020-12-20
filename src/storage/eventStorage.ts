// Interface
import StorageInterface from './EventStorage.interface';

export default class EventStorage {
  config: any;
  constructor ( config: StorageInterface ) {
    this.config = config;
    this.config.storageType ? this.localStorage() : this.sessionStorage();
  }
  
  static InitRelatedStorage ( storageType: string, config: any ) {
      if ( storageType === 'localStorage' ) {
        const key: any = localStorage.getItem('EventBooster')
        if ( key === null ) {
          localStorage.setItem('EventBooster', JSON.stringify({ EventBooster: {
            storageCreatedTime: Date(),
            storageAccessEvents: config
          } }))
        }
      } else {
        
      }
  }
  
  localStorage () {
    if (typeof(Storage) !== "undefined") {
      EventStorage.InitRelatedStorage('localStorage', this.config);
    } else {
      console.error('Event Booster: Not working storage, this browser very old!');
    }
  }
  
  sessionStorage () {
    
  }
  
}