export class Lista {

    public id: number;
    public descricao: string;
    public data: string;
    public vlPrevisto?: number;

    constructor(
        id?: number,
        descricao?: string,
        data?: string,
        vlPrevisto?: number
    ) {
        this.id = id;
        this.descricao = descricao;
        this.data = data;
        this.vlPrevisto = vlPrevisto;
    }

    public dateFromBR() {
        return this.data.replace('-', '/').replace('-', '/').split('/').reverse().join('/');
    }

}
