import EventBoosterInterface from './EventBooster.interface';
declare class EventBooster {
    _events: string[];
    _config: any;
    constructor(config: EventBoosterInterface);
    private withoutRelatedEvents;
    private initializeEvents;
    getAllStorage(): any;
}
export default EventBooster;
