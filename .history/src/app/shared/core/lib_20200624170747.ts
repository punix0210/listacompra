import { Subject, BehaviorSubject, Observable } from 'rxjs';

export class Lib {

    private static hiddenTabs = new BehaviorSubject(false);

    public static dateToString(date: Date): string {
        return date.toLocaleDateString().replace('/', '-').replace('/', '-').split('-').reverse().join('-');
    }

    public static maskBR(datestr: string) {
        return datestr.replace('-', '/').replace('-', '/').split('/').reverse().join('/');
    }

    public static hiddenTabsAction(): Observable<boolean> {
        return this.hiddenTabs.asObservable();
    }

}
