export class Lib {

    public static dateToString(date: Date): string {
        return date.toLocaleDateString().replace('/', '-').replace('/', '-').split('-').reverse().join('-');
    }

    public static maskBR(datestr: string) {
        return datestr.replace('-', '/').replace('-', '/').split('/').reverse().join('/');
    }

}
