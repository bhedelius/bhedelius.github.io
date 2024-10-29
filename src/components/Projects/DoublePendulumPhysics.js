class DoublePendulumPhysics {
    constructor(m1, m2, l1, l2, g) {
        this.m1 = m1;
        this.m2 = m2;
        this.l1 = l1;
        this.l2 = l2;
        this.g = g;
        this.theta1 = Math.PI / 2; // initial angle of the first pendulum
        this.theta2 = Math.PI / 4; // initial angle of the second pendulum
        this.p1 = 0; // initial angular momentum of the first pendulum
        this.p2 = 0; // initial angular momentum of the second pendulum
        this.dt = 0.01; // time step
    }

    computeAccelerations() {
        const { theta1, theta2, p1, p2, m1, m2, l1, l2, g } = this;

        const num1 = -g * (2 * m1 + m2) * Math.sin(theta1);
        const num2 = -m2 * g * Math.sin(theta1 - 2 * theta2);
        const num3 = -2 * Math.sin(theta1 - theta2) * m2 * (p2 * p2 * l2 + p1 * p1 * l1 * Math.cos(theta1 - theta2));
        const denom = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2));
        
        const a1 = (num1 + num2 + num3) / denom;

        const num4 = 2 * Math.sin(theta1 - theta2);
        const num5 = (p1 * p1 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1));
        const num6 = p2 * p2 * l2 * m2 * Math.cos(theta1 - theta2);
        const denom2 = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2));

        const a2 = (num4 * (num5 + num6)) / denom2;

        return [a1, a2];
    }

    update() {
        const [a1, a2] = this.computeAccelerations();
        
        // Update positions
        this.theta1 += this.p1 * this.dt + 0.5 * a1 * this.dt * this.dt;
        this.theta2 += this.p2 * this.dt + 0.5 * a2 * this.dt * this.dt;

        // Update momenta
        this.p1 += a1 * this.dt;
        this.p2 += a2 * this.dt;
    }

    getPositions() {
        const x1 = this.l1 * Math.sin(this.theta1);
        const y1 = -this.l1 * Math.cos(this.theta1);
        const x2 = x1 + this.l2 * Math.sin(this.theta2);
        const y2 = y1 - this.l2 * Math.cos(this.theta2);
        return { x1, y1, x2, y2 };
    }

    getAngularVelocities() {
        const angularVelocity1 = this.p1 / (this.m1 * this.l1 ** 2); // Angular velocity for the first pendulum
        const angularVelocity2 = this.p2 / (this.m2 * this.l2 ** 2); // Angular velocity for the second pendulum
        return { angularVelocity1, angularVelocity2 };
    }
}

export default DoublePendulumPhysics;
