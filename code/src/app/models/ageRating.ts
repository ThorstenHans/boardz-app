import {ISupportsOfflineStorage} from '../interfaces/supportsOfflineStorage';
import {ModelState} from './modelState';

export class AgeRating implements ISupportsOfflineStorage<AgeRating> {

    constructor() {
        this.state = ModelState.Clean;
    }

    public id: string;
    public name: string;
    public colorIndicator: string;
    public state: ModelState;

    public fromRawJson(rawJson: any): AgeRating {
        if (!rawJson) {
            return this;
        }
        this.id = rawJson.id || null;
        this.name = rawJson.name || null;
        this.colorIndicator = rawJson.colorIndicator || null;
        this.state = rawJson.hasOwnProperty('state') ? <ModelState>rawJson.state : ModelState.Clean;
        return this;
    }
}
