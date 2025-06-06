import './index.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
    npm install react react-dom
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 4, - 2, 6 ]
        } }
    >
        <App />
    </Canvas>
)
