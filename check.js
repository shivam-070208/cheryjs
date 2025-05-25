


// import { ImageTransition} from "./src/effects/TransitionEffect/Effect.js";

const img = document.querySelector('.cherry');
const Container = document.querySelector('.container')

let value=0.1;
Cherryglsl.default.ImageTransition(Container,{
  
    radius:0.05,
    speed:0.04,
    strength:0.2,hover:true,
    noise:6
});

// ImageTransition(Container)

