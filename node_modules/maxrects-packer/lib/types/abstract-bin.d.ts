import { IRectangle } from "./geom/Rectangle";
import { IOption } from "./maxrects-packer";
export interface IBin {
    width: number;
    height: number;
    maxWidth: number;
    maxHeight: number;
    freeRects: IRectangle[];
    rects: IRectangle[];
    options: IOption;
    [propName: string]: any;
}
export declare abstract class Bin<T extends IRectangle> implements IBin {
    width: number;
    height: number;
    maxWidth: number;
    maxHeight: number;
    freeRects: IRectangle[];
    rects: T[];
    options: IOption;
    abstract add(rect: T): T | undefined;
    abstract add(width: number, height: number, data: any): T | undefined;
    abstract reset(deepRest: boolean): void;
    abstract repack(): T[] | undefined;
    data?: any;
    tag?: string;
    protected _dirty: number;
    get dirty(): boolean;
    /**
     * Set bin dirty status
     *
     * @memberof Bin
     */
    setDirty(value?: boolean): void;
    abstract clone(): Bin<T>;
}
