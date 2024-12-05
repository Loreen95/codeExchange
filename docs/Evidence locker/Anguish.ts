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
    private  static amontOfFlasks: number = 1;
    private maxVolumeInML: number;
    private volumeInML: number = 0;

    public constructor(maxVolumeInML1: number) {
        super(MATEREAL.PLASTIC);
        this.maxVolumeInML = maxVolumeInML1;
    }

    public getAmountOfContainers(): number {
        return Flask.amontOfFlasks;
    }

    public fill(milliLiters: number): void {
        if (milliLiters > this.maxVolumeInML) {
            console.log(`${milliLiters - this.maxVolumeInML} Spilled out`);
            this.maxVolumeInML = milliLiters;
            return;
        }
        this.volumeInML += milliLiters;
    }

    public remove(milliLiters: number): void {
        if (this.volumeInML - milliLiters < 0) {
            this.volumeInML = 0;
            console.log(`you only receive ${milliLiters - this.volumeInML} from the flask before it dries up`);
            return;
        }
        this.volumeInML -= milliLiters;
    }

    public toString(): string {
        return `
            Flask info:
            amount of flasks: ${this.amontOfFlasks}
            volume of each individual flask: ${this.maxVolumeInML}
            The contents of this flask: ${this.volumeInML}
        `;
    }
}

class MilkFlask extends Pakagin {
    private maxVolumeInLiters: number;
    private volumeInLiters: number = 0;

    public constructor(maxVolumeInMiliLiters: number) {
        super(MATEREAL.DUST);
        this.maxVolumeInLiters = (maxVolumeInMiliLiters / 1000);
    }

    public toString(): string {
        return `
            Milkflask class:
            volume of each individual cow flask: ${this.maxVolumeInLiters}
            The contents of this cow flask: ${this.volumeInLiters}
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

const abern: Flask = new Flask(5000);
console.log(abern.toString());
abern.fill(3);

const nathy: Crate = new Crate(173);
console.log(nathy.toString());

const kanthy: MilkFlask = new MilkFlask(12);
console.log(kanthy.toString());
