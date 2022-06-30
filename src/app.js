// import { plus } from './plus.js'
import './styles.css';
import tiger from './tiger.png';

// console.log(plus(2, 4));

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `<img src="${tiger}">`;
})

let env;

if (process.env.NODE_ENV === 'development') {
    env = dev;
} else {
    env = pro;
}

console.log(env);