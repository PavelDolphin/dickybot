/** @type {HTMLCanvasElement} */

document.addEventListener('load', function(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 280;

    class ParticleSystem{
        constructor(){
            this.particles = [];
            this.#addNewParticle();
        }
        update(){
            this.particles.forEach(obj => obj.update());
        }
        draw(){
            this.particles.forEach(obj => obj.draw());
        }

        #addNewParticle(){
            this.particles.push(new Particle());
        }
    }

    class Particle{
        constructor(){
            this.x = 250;
            this.y = 250;
            this.width = 50;
            this.height = 50;

        }
        update(){
            this.y--;
        }
        draw(){
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    let lastTime = 0;
    const particlesystem = new ParticleSystem();

    function animate(timeStamp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltatime = timeStamp - lastTime;
        console.log(deltatime);
        lastTime = timeStamp;

        particlesystem.update();
        particlesystem.draw();

        requestAnimationFrame(animate);
    };
    animate(0);
});