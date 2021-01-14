// Interface
import EventBoosterInterface from './EventBooster.interface';

// Storage Module
import EventStorage from '../storage/eventStorage';
class EventBooster {
    _events = [ 'load', 'cut', 'copy', 'paste', 'scroll', 'click', 'dblclick', 'contextmenu' ];
    _config: any;

    constructor ( config: EventBoosterInterface ) {
        this._config = config;
        // Check Storage
        EventStorage.prototype.storageStatus(this._config);
        if ( !this._config.withoutEvents ) {
             // Initialize Related Events
            this.initializeEvents();
        } else {
            // Without Related Events
            this.withoutRelatedEvents();
        }
    }

    private withoutRelatedEvents () {
        if ( this._config.withoutEvents.length > 0 )
            this._events = this._events.filter( item => this._config.withoutEvents.indexOf(item) === -1 );
        // Initialize Related Events
        this.initializeEvents();
    }

    private initializeEvents () {
        this._events.map( ( item: any ) => {
            window.addEventListener( item, e => {
                const storage = EventStorage.prototype.addStorageItem({ config: this._config, eventType: item, event: e, withReturnStorage: true });
                if ( this._config.withCallbackAction && typeof this._config.withCallbackAction[item] !== undefined ) this._config.withCallbackAction[item](e, storage);
            }, false );
        });
    }

    getAllStorage() {
        return JSON.parse(localStorage.getItem('EventBooster') || '{}');
    }

}

export default EventBooster;
(global as any).EventBooster = EventBooster;
