const s = (p) => {
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
