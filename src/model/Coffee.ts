import RoastType from './RoastType';

export default interface Coffee {
    readonly name: string;
    readonly color: string;
    readonly darkColor: string;
    readonly roastType: RoastType;
    readonly rating: number;
    readonly description: string;
}
