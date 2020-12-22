// Interface
import EventBoosterInterface from './EventBooster.interface';

class EventBooster {
    _events = [ 'load', 'cut', 'copy', 'paste', 'scroll', 'click', 'dblclick', 'contextmenu' ];
    _config: any;
    constructor ( config: EventBoosterInterface ) {
        this._config = config;
        if ( !this._config.withoutEvents ) {
             // Initialize Related Events
            this.initializeEvents();
        } else {
            // Without Related Events
            this.withoutRelatedEvents();
        }
    }

    withoutRelatedEvents () {
        if ( this._config.withoutEvents.length > 0 ) {
            this._events = this._events.filter( item => this._config.withoutEvents.indexOf(item) === -1 );
        }
        // Initialize Related Events
        this.initializeEvents();
    }

    initializeEvents () {
        this._events.map( ( item: any ) => {
            window.addEventListener( item, e => {
                if ( this._config.withCallbackAction[item] ) this._config.withCallbackAction[item](e);
            }, false );
        });
    }

}

export default EventBooster;
(global as any).EventBooster = EventBooster;
