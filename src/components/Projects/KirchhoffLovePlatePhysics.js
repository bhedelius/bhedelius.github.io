import * as tf from '@tensorflow/tfjs';

export default class KirchhoffLovePlatePhysics {
    constructor(size = 31, dt = 5e-5) {
        this.size = size;
        this.mid = Math.floor((size - 1) / 2);
        this.dt = dt;
        this.t = 0;
        this.frame = 0;
        this.phase = 0;

        // Physical properties
        this.L = 0.2; // Length of one side of steel
        this.dx = 1 / (size - 1); // Grid spacing
        this.rho = 7700; // Density of steel
        this.h = 1e-3; // 1 mm thick
        this.E = 200 * 10 ** 9; // Young's modulus of steel
        this.nu = 0.3; // Poisson's ratio of steel
        this.D = 2 * this.h ** 3 * this.E / (3 * (1 - this.nu ** 2));
        this.F0 = 1 / this.h ** 2; // 1 Newton spread out over one grid square
        this.damping = tf.scalar(0 * this.dx ** 2); // Random value, no physical backing
        this.denom = 1 / (2 * this.rho * this.h);
        this.k1 = -this.D * this.denom * this.dt / 2;
        this.k2 = this.F0 * this.denom * this.dt / 2;

        // Initialize tensors
        this.u = tf.zeros([this.size, this.size], 'float32');
        this.v = tf.zeros([this.size, this.size], 'float32');
        this.last_a = tf.zeros([this.size, this.size], 'float32');
        this.next_a = tf.zeros([this.size, this.size], 'float32');

        // Precompute the forcing mask
        const forcingMaskData = Array.from({ length: this.size }, (_, i) =>
            Array.from({ length: this.size }, (_, j) => (i === this.mid && j === this.mid) ? 1 : 0)
        );
        this.forcingMask = tf.tensor2d(forcingMaskData, [this.size,this.size], 'float32');

        // Define the Laplacian kernel
        this.laplacianKernel = tf.tensor4d(
            [
                [[[0]], [[1]], [[0]]],
                [[[1]], [[-4]], [[1]]],
                [[[0]], [[1]], [[0]]]
            ],
            [3, 3, 1, 1]
        ).div(tf.scalar(this.dx ** 2)); // Divide the kernel by dx^2
    }

    calcLaplacian(matrix) {
        return tf.tidy(() => {
            const input = matrix.expandDims(0).expandDims(-1); // shape [1, size, size, 1]
            const laplacian = tf.conv2d(input, this.laplacianKernel, [1, 1], 'valid').squeeze();
            return tf.pad(laplacian, [[1, 1], [1, 1]]); // Pad the output with zeros
        })
    }

    calcHalfAdt() {
        return tf.tidy(() => {
            const biharmonic = this.calcLaplacian(this.calcLaplacian(this.u));
            console.log(biharmonic.array)
            let a = biharmonic.mul(this.k1);

            const forcingTerm = this.k2 * Math.sin(this.phase);
            const dampingTerm = this.v.mul(this.damping);

            return  a.add(this.forcingMask.mul(forcingTerm)).sub(dampingTerm);
        })
    }

    step() {
        this.t += this.dt;
        this.phase += this.w * this.dt;

        this.last_a.dispose();
        this.last_a = this.next_a;
        this.v = this.v.add(this.last_a);
        this.u = this.u.add(this.v.mul(this.dt));
        this.next_a = this.calcHalfAdt(this.u);
        this.v = this.v.add(this.next_a);
    }
}