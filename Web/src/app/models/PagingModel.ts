
export class PagingModel<T> {
    number = 1;
    size = 6;
    orderBy: string;
    orderDirection = 'DESC';
    totalCount: number;
    maxSize = 10;
    list: Array<T> = new Array<T>();
}
