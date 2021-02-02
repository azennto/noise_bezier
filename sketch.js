const s = (p) => {
	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight);
		p.background(0);
		flock = new Flock();

		let rand_r = p.random(100,255);
		let rand_g = p.random(100,255);
		let rand_b = p.random(100,255);

		for (let i = 0; i < 10; i++) {
			let b = new Line(-10,p.height/2,p.width+10,p.height/2,p.color(p.noise(i*0.1)*rand_r , p.noise(i*0.1+100)*rand_g , p.noise(i*0.1+200)*rand_b),i);
			flock.new_line(b);
		}
	};

	p.draw = () => {
		p.fill(0, 10);
		p.rect(0, 0, p.width, p.height);

		flock.run();
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth,p.windowHeight);
	}

	class Flock {
		constructor() {
			this.lines = [];
		}
		run(){
			for(const v of this.lines){
				v.run(this.lines);
			}
		}
		new_line(l){
			this.lines.push(l);
		}
	}

	class Line {
		constructor(s_x,s_y,g_x,g_y,color,seed){
			this.start_position = p.createVector(s_x,s_y);
			this.end_position = p.createVector(g_x,g_y);

			this.max_position = p.createVector(p.width,p.height*1.5);

			this.current_seed = 0;
			this.variation_speed = 0.001;

			this.color = color;

			this.seed = seed*10;
		}

		run(){
			this.render();
		}

		make_noise(seed,max_position){
			p.noiseSeed(seed);
			let noise_val = p.noise(this.current_seed);
			return noise_val * max_position;
		}

		render(){
			p.noFill();
			p.stroke(this.color);
			p.bezier(
				this.start_position.x,
				this.start_position.y,
				this.make_noise(this.seed + 0,this.max_position.x),
				this.make_noise(this.seed + 1,this.max_position.y),
				this.make_noise(this.seed + 2,this.max_position.x),
				this.make_noise(this.seed + 3,this.max_position.y),
				this.end_position.x,
				this.end_position.y
			);
			this.current_seed += this.variation_speed;
		}
	}
};


let myp5 = new p5(s);
