class Diagram {
    private _listOfDrwaings: DrawObject[] = [];

    public addObject(drawObject: DrawObject): void {
        this._listOfDrwaings.push(drawObject);
    }

    public draw() {
        for (let d: number = 0; d < this._listOfDrwaings.length; d++) {
            this._listOfDrwaings[d].draw();
        }
    }
}

abstract class DrawObject {
    public abstract draw(): void;
}

class Circle extends DrawObject {
    private _radius: number;

    public constructor(circleRadius: number) {
        super();
        this._radius = circleRadius;
    }

    public draw(): void {
        console.log(`Oh wow look a circle that has a radius of: ${this._radius}!`);
    }
}

class Recrangle extends DrawObject  {
    private _length: number;
    private _width: number;

    public constructor(rectangleWidth: number, rectangleLength: number) {
        super();
        this._length = rectangleLength;
        this._width = rectangleWidth;
    }

    public draw(): void {
        console.log(`Oh wow look a rectangle thats ${this._length} long and ${this._width} wide!`);
    }
}
