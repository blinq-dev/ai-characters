export class BaseService {
    callbacks: { callback: Function, event: string }[] = [];
    
    on(event: string, callback: Function) {
        this.callbacks.push({ callback, event });
    }

    off(event: string, callback?: Function) {
        this.callbacks = this.callbacks.filter(cb => cb.event !== event || (callback && cb.callback !== callback));
    }

    once(event: string, callback: Function) {
        const cb = (data: any) => {
            callback(data);
            this.off(event, cb);
        }

        this.on(event, cb);

        return cb;
    }

    trigger(event: string, data: any) {
        this.callbacks.filter(callback => callback.event === event).forEach(callback => callback.callback(data));
    }
}