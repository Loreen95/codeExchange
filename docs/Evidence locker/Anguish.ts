enum MATEREAL {
    PLASTIC,
    CARDBOARD,
    MEAT,
    DUST,
}

abstract class Pakagin {
    private _matereal: MATEREAL;

    protected constructor(matereal1: MATEREAL) {
        this._matereal = matereal1;
    }

    protected getMatereal(): MATEREAL {
        return this._matereal;
    }

    protected abstract toString(): string;
}

class Flask extends Pakagin {
    private static _amontOfFlasks: number = 1;
    private _maxVolumeInML: number;
    private _volumeInML: number = 0;

    public constructor(maxVolumeInML1: number) {
        super(MATEREAL.PLASTIC);
        this._maxVolumeInML = maxVolumeInML1;
    }

    public getAmountOfContainers(): number {
        return Flask._amontOfFlasks;
    }

    public fill(milliLiters: number): void {
        if (milliLiters > this._maxVolumeInML) {
            console.log(`${milliLiters - this._maxVolumeInML} Spilled out`);
            this._maxVolumeInML = milliLiters;
            return;
        }
        this._volumeInML += milliLiters;
    }

    public remove(milliLiters: number): void {
        if (this._volumeInML - milliLiters < 0) {
            this._volumeInML = 0;
            console.log(`you only receive ${milliLiters - this._volumeInML} from the flask before it dries up`);
            return;
        }
        this._volumeInML -= milliLiters;
    }

    public toString(): string {
        return `
            Flask info:
            amount of flasks: ${Flask._amontOfFlasks}
            volume of each individual flask: ${this._maxVolumeInML}
            The contents of this flask: ${this._volumeInML}
        `;
    }
}

class MilkFlask extends Pakagin {
    private _maxVolumeInLiters: number;
    private _volumeInLiters: number = 0;

    public constructor(maxVolumeInMiliLiters: number) {
        super(MATEREAL.DUST);
        this._maxVolumeInLiters = (maxVolumeInMiliLiters / 1000);
    }

    public toString(): string {
        return `
            Milkflask class:
            volume of each individual cow flask: ${this._maxVolumeInLiters}
            The contents of this cow flask: ${this._volumeInLiters}
        `;
    }
}

class CrateFlask extends Flask {
    public constructor(maxVolumeInCL: number) {
        super(maxVolumeInCL / 10);
    }
}

class Crate extends Pakagin {
    private _maxAmountOfFlasks: number;
    private _crateContents: CrateFlask[] = [];

    public constructor(amountOfFlasks1: number) {
        super(MATEREAL.CARDBOARD);
        this._maxAmountOfFlasks = amountOfFlasks1;
    }

    /**
     * name
     */
    public addItemToCrte(itemToBeAdded: CrateFlask): boolean {
        if (this._crateContents.length < this._maxAmountOfFlasks) {
            this._crateContents.push(itemToBeAdded);
            console.log(`${itemToBeAdded} has been added to crate`);
            return true;
        }
        else {
            console.log(`${itemToBeAdded} has NOT been added to crate cus it's full!`);
            return false;
        }
    }

    public toString(): string {
        return `
            Crate class;
            Amount of flasks that could be in crate: ${this._maxAmountOfFlasks}
        `;
    }
}

const abern: Flask = new Flask(5000);
console.log(abern.toString());
abern.fill(3);

const nathy: Crate = new Crate(173);
console.log(nathy.toString());

const kanthy: MilkFlask = new MilkFlask(12);
console.log(kanthy.toString());
