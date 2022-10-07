import { useState, useEffect, useRef } from 'react';
import './App.css';

import ContentTab from './Components/ContentTab/ContentTab';
import Colorbutton from './Components/ColorButton/Colorbutton';
import BGbutton from './Components/BGButton/BGbutton';
import TabView from './Components/TabView/TabView';

function App() {

  const [BGs, setBGs] = useState([
    {name: 'lava', price: 50, state: 'locked', link: '/res/BGs/lava.png', preview_link: '/res/BGs/preview/lava.png', key: 1},
    {name: 'melon', price: 150, state: 'purchased', link: '/res/BGs/melons.png', preview_link: '/res/BGs/preview/melons.png', key: 2},
    {name: 'spheres', price: 250, state: 'locked', link: '/res/BGs/spheres.png', preview_link: '/res/BGs/preview/spheres.png', key: 3},
    {name: 'stars', price: 500, state: 'locked', link: '/res/BGs/stars.png', preview_link: '/res/BGs/preview/stars.png', key: 4},
    {name: 'water', price: 1250, state: 'purchased', link: '/res/BGs/water.png', preview_link: '/res/BGs/preview/water.png', key: 5},
    {name: 'vines', price: 1250, state: 'purchased', link: '/res/BGs/vines.png', preview_link: '/res/BGs/preview/vines.png', key: 7},
    {name: 'alien', price: 1250, state: 'purchased', link: '/res/BGs/alien.png', preview_link: '/res/BGs/preview/alien.png', key: 8},
    {name: 'winter', price: 5500, state: 'locked', link: '/res/BGs/winter.png', preview_link: '/res/BGs/preview/winter.png', key: 9},
    {name: 'leaks', price: 50, state: 'locked', link: '/res/BGs/leaks.png', preview_link: '/res/BGs/preview/leaks.png', key: 10}]);

  const [colors, setColors] = useState([
    {name: 'black', price: 50, state: 'purchased', color: '#000', key: 1},
    {name: 'lime', price: 50, state: 'locked', color: '#B8FF44', key: 2},
    {name: 'yellow', price: 50, state: 'purchased', color: '#FFE600', key: 3},
    {name: 'skin', price: 50, state: 'locked', color: '#FFAE94', key: 4},
    {name: 'blue', price: 50, state: 'locked', color: '#2145FF', key: 5},
    {name: 'pink', price: 50, state: 'locked', color: '#FF00A8', key: 6}]);


  const [user, setUser] = useState("Test User🐬")
  const [balance, setBalance] = useState(9999)
  const [currentBase, setCurrentBase] = useState(0)
  const [currentColor, setCurrentColor] = useState(0)
  const [currentHat, setCurrentHat] = useState(0)
  const [currentBG, setCurrentBG] = useState(BGs[0])
  const [currentFX, setCurrentFX] = useState(0)

  const c_width = 500;
  const c_height = 280;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const sparkParticle = new Image();
  sparkParticle.src = "res/fx/spark.png";
  const [BG, setBG] = useState(new Image());
  BG.src = currentBG.link;

  class ParticleSystem{
    constructor(){
        this.particles = [];
        this.emmision = 50;
        this.patricleTimer = 0;
    }
    update(deltatime){

      this.particles = this.particles.filter(obj => !obj.checkedForDeletion);

      if(this.patricleTimer > this.emmision){
        this.#addNewParticle();
        this.patricleTimer = 0;
      }else{
        this.patricleTimer += deltatime;
      }
        this.particles.forEach(obj => obj.update(deltatime));
    }
    draw(){
        this.particles.forEach(obj => obj.draw());
    }

    #addNewParticle(){
        this.particles.push(new Spark());
    }
}

class Particle{
    constructor(){
        this.angle = 0;
        this.anglespeed = Math.random() * 1;
        this.checkedForDeletion = false;
        this.rotation=Math.PI/8;
        this.direction = Math.random()/50;
    }
    update(deltatime){
      if (this.y < 0 - this.height) this.checkedForDeletion = true;
        this.y-=2;
        this.x=50 * Math.sin(this.angle * Math.PI/180) + c_width/2;
        this.angle+= this.anglespeed;

        this.rotation+= this.direction;

        if (this.width>0) {
          this.width-=0.5;
        }
    }
    draw(){
      contextRef.current.save();
      contextRef.current.rotate(this.rotation);
      contextRef.current.drawImage(this.image, this.x, this.y, this.width, this.width);
      contextRef.current.restore();
    }
}

class Spark extends Particle{
  constructor(){
    super();
    this.x = Math.random() * c_width;
    this.y = c_height/4;
    this.width = 50;
    this.image = sparkParticle;
  }
}

class Dick{
  constructor(color, base, hat){
    this.height=200;
    this.width=100;
    this.x = c_width/2;
    this.y = c_height;
    this.color = color;
    this.base = base;
    this.hat = hat;
  }

  draw(){
    contextRef.current.save();
    contextRef.current.drawImage(this.base[0], this.x, this.y, this.width, this.height);
    contextRef.current.drawImage(this.base[1], this.x, this.y, this.width, this.height);
    contextRef.current.drawImage(this.hat, this.x, this.y, this.width, this.height);
    contextRef.current.restore();
  }
}

  let lastTime = 0;
  const particlesystem = new ParticleSystem();
  const dick = new Dick(currentColor, currentBase, currentHat);
  function animate(timeStamp){
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const deltatime = timeStamp - lastTime;
    lastTime = timeStamp;
    //BG
    contextRef.current.drawImage(BG,0,0,c_width,c_height);
    //Particles and effects
    contextRef.current.globalCompositeOperation = "hard-light";
    particlesystem.update(deltatime);
    particlesystem.draw();
    //Dick
    dick.draw();

    requestAnimationFrame(animate);
};

useEffect(() => {
  const canvas =canvasRef.current;
  canvas.width = c_width * 2;
  canvas.height = c_height * 2;
  canvas.style.width = `${c_width}px`;
  canvas.style.height = `${c_height}px`;

  const context = canvas.getContext("2d");
  context.scale(2,2);
  contextRef.current = context;
  
  requestAnimationFrame(animate);
  
}, []);

  const handlePurchase = (id) => {
    const currentBG = BGs.filter(bg => bg.key === id);
    if (currentBG[0].price <= balance && currentBG[0].state === 'locked') {
      //set bg state to purchased
      setBalance(balance-currentBG[0].price);
    }
  }

  const handleSelect = (id) => {
    setCurrentBG(BGs.filter(bg => bg.key === id)[0]);
  }

  return (
    <div id='container'>

      <div className="logoOverlay">
          <canvas id="canvas" ref={canvasRef}></canvas>

        <div className='userInfo'>
          <p>{user}</p>
          <p>{balance}cm</p>
        </div>
      </div>

      

      <TabView
      tabs={[
        {icon:<svg className="icon-svg" width="96" height="96" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 17.8935C14 12.5994 18.9997 8.06546 24.382 8C29.986 8 35 12.5291 35 17.8935V41C35 42.6569 33.6569 44 32 44H17C15.3431 44 14 42.6569 14 41V17.8935Z"/>
        </svg>, 
        content:
        <p>Shapes</p>},
        {icon:<svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 19.007c0-3.167-1.409-6.771-2.835-9.301l-.006-.01-.014-.026c-.732-1.392-1.914-3.052-3.619-4.757-2.976-2.976-5.476-3.912-6.785-3.913-.413 0-.708.094-.859.245l-.654.654c-1.898-.236-3.42.105-4.294.982-.876.875-1.164 2.159-.792 3.524.242.893.807 1.891 1.752 2.836.867.867 2.062 1.684 3.615 2.327.488-.839 1.654-1.019 2.359-.315.586.586.584 1.533-.002 2.119s-1.533.589-2.121 0c-.229-.229-.366-.515-.416-.812-1.646-.657-3.066-1.534-4.144-2.612-.728-.728-1.289-1.528-1.664-2.349l-2.835 2.832c-.445.447-.685 1.064-.686 1.82.001 1.635 1.122 3.915 3.714 6.506 2.764 2.764 5.58 4.243 7.431 4.243.649 0 1.181-.195 1.548-.562l8.086-8.079c.911.875-.777 3.541-.777 4.65 0 1.104.896 1.999 2 1.998 1.104 0 1.998-.895 1.998-2zm-18.912-12.974c-.236-.978-.05-1.845.554-2.444.526-.53 1.471-.791 2.656-.761l-3.21 3.205zm9.138 2.341l-.03-.029c-1.29-1.291-3.802-4.354-3.095-5.062.715-.715 3.488 1.521 5.062 3.095.862.863 2.088 2.248 2.938 3.459-1.718-1.073-3.493-1.469-4.875-1.463zm-3.875 12.348c-.547-.082-1.5-.547-1.9-.928l7.086-7.086c.351.37 1.264.931 1.753 1.075l-6.939 6.939z"/></svg>, 
        content:
        <ContentTab identifier ={"BGtab"}>
          {colors.map((color) => (
            <Colorbutton color={color.color} buttonstate = {color.state}/>
          ))}
        </ContentTab>},
        {icon:<svg className="icon-svg" width="96" height="96" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.66 0C11.5215 0 7.40488 1.72388 5.4119 2.74853C4.60273 3.16447 4.22609 4.07379 4.40941 4.96552L7.45198 19.7679C7.58227 20.4018 8.22188 20.7994 8.85407 20.6635C10.3924 20.3328 13.306 19.8234 16.66 19.8234C20.0644 19.8234 23.02 20.3367 24.5706 20.6673C25.2009 20.8017 25.8377 20.4058 25.969 19.7744L29.0444 4.97649C29.2309 4.07931 28.8501 3.164 28.0338 2.74887C26.0189 1.72429 21.8562 0 16.66 0Z"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M28.2037 20.9499C25.2544 22.0933 20.8636 23.453 16.66 23.453C12.4774 23.453 8.10933 22.0591 5.16191 20.8796C3.46334 20.1998 1.60573 21.3652 2.07326 23.1353C3.11884 27.0937 6.41089 32.6667 16.66 32.6667C26.9338 32.6667 30.2203 27.1306 31.2598 23.2121C31.7251 21.4582 29.8945 20.2944 28.2037 20.9499ZM16.66 30.433C21.4363 30.433 25.3082 28.7663 25.3082 27.5328C25.3082 26.2992 21.4363 25.9658 16.66 25.9658C11.8837 25.9658 8.01177 26.2992 8.01177 27.5328C8.01177 28.7663 11.8837 30.433 16.66 30.433Z"/>
        </svg>, 
        content:
        <p>Hats</p>},
        {icon:<svg className="icon-svg" width="96" height="96" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30.1198 30.8642C30.8839 30.8642 31.6165 30.5609 32.1565 30.0208C32.6966 29.4807 32.9999 28.7481 32.9999 27.9841V4.33593C32.9999 3.57188 32.6966 2.83929 32.1565 2.29921C31.6165 1.75915 30.8839 1.45581 30.1198 1.45581H2.88012C2.11607 1.45581 1.38348 1.75916 0.843402 2.29921C0.303339 2.83928 0 3.57188 0 4.33593V27.9841C0 28.7481 0.303348 29.4807 0.843402 30.0208C1.38346 30.5609 2.11607 30.8642 2.88012 30.8642H30.1198ZM3.00012 4.45609H29.9998V19.6402L26.2499 14.7803L26.1524 14.6678C25.6007 14.0728 24.8316 13.7269 24.0207 13.7086C23.2094 13.6902 22.4256 14.0012 21.8474 14.5704L20.25 16.198L26.4749 24.1027C26.7745 24.5256 26.8348 25.073 26.6346 25.5509C26.434 26.0286 26.0011 26.3692 25.4896 26.4515C24.9779 26.5339 24.46 26.3464 24.1199 25.9553L15.9225 15.5377L14.1527 13.3403V13.3399C13.6377 12.7038 12.8854 12.3054 12.0694 12.2374C11.2538 12.1694 10.4456 12.4376 9.83247 12.98L9.69754 13.115L3.00016 20.7274L3.00012 4.45609Z"/>
        <path d="M19.5 5L21.0274 7.97265L24 9.5L21.0274 11.0274L19.5 14L17.9726 11.0274L15 9.5L17.9726 7.97265L19.5 5Z"/>                    
        </svg>, 
        content:
        <ContentTab identifier ={"BGtab"}>
          {BGs.map((bg) => (
            <BGbutton BG={bg} handleSelect={handleSelect} handlePurchase={handlePurchase}/>
          ))}
        </ContentTab>},
        {icon:<svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm7 7c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm-6 5.501c1.198.365 2.135 1.303 2.499 2.5.366-1.198 1.304-2.135 2.501-2.5-1.197-.366-2.134-1.302-2.501-2.5-.364 1.197-1.301 2.134-2.499 2.5zm-6-8.272c.522.658 1.118 1.253 1.775 1.775-.657.522-1.252 1.117-1.773 1.774-.522-.658-1.118-1.253-1.776-1.776.658-.521 1.252-1.116 1.774-1.773zm-.001-4.228c-.875 2.873-3.128 5.125-5.999 6.001 2.876.88 5.124 3.128 6.004 6.004.875-2.874 3.128-5.124 5.996-6.004-2.868-.874-5.121-3.127-6.001-6.001z"/></svg>, 
        content:
        <p>Extras</p>}
      ]}
      />


    </div>
  );
}


export default App;
