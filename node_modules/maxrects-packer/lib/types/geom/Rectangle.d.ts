export interface IRectangle {
    width: number;
    height: number;
    x: number;
    y: number;
    [propName: string]: any;
}
export declare class Rectangle implements IRectangle {
    /**
     * Oversized tag on rectangle which is bigger than packer itself.
     *
     * @type {boolean}
     * @memberof Rectangle
     */
    oversized: boolean;
    /**
     * Creates an instance of Rectangle.
     *
     * @param {number} [width=0]
     * @param {number} [height=0]
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {boolean} [rot=false]
     * @param {boolean} [allowRotation=false]
     * @memberof Rectangle
     */
    constructor(width?: number, height?: number, x?: number, y?: number, rot?: boolean, allowRotation?: boolean | undefined);
    /**
     * Test if two given rectangle collide each other
     *
     * @static
     * @param {IRectangle} first
     * @param {IRectangle} second
     * @returns
     * @memberof Rectangle
     */
    static Collide(first: IRectangle, second: IRectangle): any;
    /**
     * Test if the first rectangle contains the second one
     *
     * @static
     * @param {IRectangle} first
     * @param {IRectangle} second
     * @returns
     * @memberof Rectangle
     */
    static Contain(first: IRectangle, second: IRectangle): any;
    /**
     * Get the area (w * h) of the rectangle
     *
     * @returns {number}
     * @memberof Rectangle
     */
    area(): number;
    /**
     * Test if the given rectangle collide with this rectangle.
     *
     * @param {IRectangle} rect
     * @returns {boolean}
     * @memberof Rectangle
     */
    collide(rect: IRectangle): boolean;
    /**
     * Test if this rectangle contains the given rectangle.
     *
     * @param {IRectangle} rect
     * @returns {boolean}
     * @memberof Rectangle
     */
    contain(rect: IRectangle): boolean;
    protected _width: number;
    get width(): number;
    set width(value: number);
    protected _height: number;
    get height(): number;
    set height(value: number);
    protected _x: number;
    get x(): number;
    set x(value: number);
    protected _y: number;
    get y(): number;
    set y(value: number);
    protected _rot: boolean;
    /**
     * If the rectangle is rotated
     *
     * @type {boolean}
     * @memberof Rectangle
     */
    get rot(): boolean;
    /**
     * Set the rotate tag of the rectangle.
     *
     * note: after `rot` is set, `width/height` of this rectangle is swaped.
     *
     * @memberof Rectangle
     */
    set rot(value: boolean);
    protected _allowRotation: boolean | undefined;
    /**
     * If the rectangle allow rotation
     *
     * @type {boolean}
     * @memberof Rectangle
     */
    get allowRotation(): boolean | undefined;
    /**
     * Set the allowRotation tag of the rectangle.
     *
     * @memberof Rectangle
     */
    set allowRotation(value: boolean | undefined);
    protected _data: any;
    get data(): any;
    set data(value: any);
    protected _dirty: number;
    get dirty(): boolean;
    setDirty(value?: boolean): void;
}
