
declare global {
  interface Document {
    documentMode?: any
  }
}
export default class EventStorage {
  private storageBrowserTypeManagement () {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
    {
      return 'Opera';
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1 )
    {
      return 'Chrome';
    }
    else if (navigator.userAgent.indexOf("Safari") != -1)
    {
      return 'Safari';
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
      return 'Firefox';
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!window.document.documentMode == true ))
    {
      return 'IE'; 
    }  
    else 
    {
      return 'Unknown';
    }
  }
  private storageNodeElManagement (node: string, innerText: string) {
    if ( node !== 'HTML' && node !== 'BODY' ) return innerText;
  }
  private storageElAttributeManagement (node: Element, event: string) {
    if ( event !== 'load' && event !== 'scroll' ) {
      const attArr = [];
      for ( let i = 0; i < node.attributes.length; i += 1 ) {
        attArr.push({
          attributeKey: node.attributes[i].nodeName,
          attributeValue: node.attributes[i].nodeValue
        })
      }
      return attArr;
    }
  }
  private initStorage (config: any) {
    const storage: any = localStorage.getItem('EventBooster');
    if ( storage === null ) {
      localStorage.setItem('EventBooster', JSON.stringify({ EventBooster: {
        storageCreatedTime: Date(),
        browserType: config.storagetRootSettings.browserType ? this.storageBrowserTypeManagement() : '',
      } }));
    }
  }
  addStorageItem ({ config, eventType, event, withReturnStorage = false }: { config: any, eventType: string; event: any; withReturnStorage?: Boolean; }) {
    this.initStorage(config);
    const storage: any = JSON.parse(localStorage.getItem('EventBooster') || '{}');
    const eventObj = {
      target: {
        className: event.target.classList,
        id: event.target.id,
        nodeName: event.target.nodeName,
        innerText: config.storageSettings.innerText ? this.storageNodeElManagement(event.target.nodeName, event.target.innerText) : '',
        attributes: config.storageSettings.withAttributes ? this.storageElAttributeManagement(event.target, eventType) : ''
      }
    }
    if ( storage && !storage.activities ) {
      storage.activities = {};
      storage.activities[eventType] = [];
      storage.activities[eventType].push({
        events: eventObj,
        date: Date()
      });
    } else if ( storage && storage.activities && !storage.activities[eventType] ) {
      storage.activities[eventType] = [];
      storage.activities[eventType].push({
        events: eventObj,
        date: Date()
      });
    } else if ( storage && storage.activities && storage.activities[eventType] ) {
      storage.activities[eventType].push({
        events: eventObj,
        date: Date()
      });
    }
    localStorage.setItem('EventBooster', JSON.stringify(storage));
    if ( withReturnStorage ) return storage;
  }
  clearStorage () {
    localStorage.removeItem('EventBooster');
  }
  storageStatus (config: any) {
    if (typeof(Storage) !== "undefined") {
      this.initStorage(config);
    } else {
      console.error('Event Booster: Not working storage, this browser very old!');
    }
  }
}
