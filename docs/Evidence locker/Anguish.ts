enum MATEREAL {
    PLASTIC,
    CARDBOARD,
    MEAT,
    DUST,
}

abstract class Pakagin {
    private matereal: MATEREAL;

    protected constructor(matereal1: MATEREAL) {
        this.matereal = matereal1;
    }

    protected getMatereal(): MATEREAL {
        return this.matereal;
    }

    protected abstract toString(): string;
}

class Flask extends Pakagin {
    private amontOfFlasks: number;
    private maxvolumeInCubicTons: number;
    private volumeInCubicTons: number = 0;

    public constructor(maxvolumeInCubicTons1: number, amontOfFlasks1: number) {
        super(MATEREAL.PLASTIC);
        this.maxvolumeInCubicTons = maxvolumeInCubicTons1;
        this.amontOfFlasks = amontOfFlasks1;
    }

    public getAmountOfContainers(): number {
        return this.amontOfFlasks;
    }

    public fill(cubicTons: number): void {
        if (cubicTons > this.maxvolumeInCubicTons) {
            console.log(`${cubicTons - this.maxvolumeInCubicTons} Spilled out`);
            cubicTons = this.maxvolumeInCubicTons;
            return;
        }
        this.volumeInCubicTons += cubicTons;
    }

    public remove(cubicTons: number): void {
        if (this.volumeInCubicTons - cubicTons < 0) {
            this.volumeInCubicTons = 0;
            console.log(`you only receive ${cubicTons - this.volumeInCubicTons} from the flask before it dries up`);
            return;
        }
        this.volumeInCubicTons -= cubicTons;
    }

    public toString(): string {
        return `
            Flask info:
            amount of flasks: ${this.amontOfFlasks}
            volume of each individual flask: ${this.maxvolumeInCubicTons}
            The contents of this flask: ${this.volumeInCubicTons}

        `;
    }
}

class cowFlask extends Pakagin {
    private maxvolumeInCubicTons: number;
    private volumeInCubicTons: number = 0;

    public constructor(maxvolumeInCubicTons1: number) {
        super(MATEREAL.DUST);
        this.maxvolumeInCubicTons = maxvolumeInCubicTons1;
    }

    public toString(): string {
        return `
            Cowflask class:
            volume of each individual cow flask: ${this.maxvolumeInCubicTons}
            The contents of this cow flask: ${this.volumeInCubicTons}
        `;
    }
}

class Crate extends Pakagin {
    private amountOfFlasks: number;

    public constructor(amountOfFlasks1: number) {
        super(MATEREAL.CARDBOARD);
        this.amountOfFlasks = amountOfFlasks1;
    }

    public toString(): string {
        return `
            Crate class;
            Amount of flasks in crate: ${this.amountOfFlasks}
        `;
    }
}

const abern: Flask = new Flask(5000, 3);
console.log(abern.toString());
abern.fill(3);

const nathy: Crate = new Crate(173);
console.log(nathy.toString());

const kanthy: cowFlask = new cowFlask(12);
console.log(kanthy.toString());
