import { OrbitControls, Center, useMatcapTexture, Text3D, } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useState,useRef } from 'react'

//The Text
//Text3D helper
//we are not going to use Text helper because we want a 3D gemetry 
//We need to use TectGeometry 
//drei provides a helper named Text3D that implements it
//in App.jsx import Text3D from drei
//To use Text3D we need to provide a typeface font 
//one font called helvetiker is provided in the public folder
//you can create your own typeface font with this website
//http://gero3.github.io/facetype.js/
//add the <Text3D> anywhere in the jsx and provide the font path in the font Attribute
//Start with a <meshNormalMaterial/> that we will replace later with a matcap materilal

//Centering
//we can also use the Center  helper from drei
//import Center

//Parameters
//Allparameters that we can use to create the TextGeometry can be set as attributes

//Matcap Material
//We need to load the matcap texture
//going to use a drei helper named useMatcapTexture that will load matcaps automatically from thsi repostiory https://github.com/emmelleppi/matcaps
//Its not recommennded to use this technique in production because we are dependent on teh server that provides the textures

//the 1rt is name the second parameter is teh desired width and we can choose between 64, 128, 256, 512, 1024
//useMatcapTecture returns an array an d only the first value (teh actual texture) matters to us
//Destructure it  to lonly retrieve that first value 

//Replac e the <meshNormalMaterial> with a <meshMatcapMaterial> and use the matcapTexture on the matcap attribute
//in this we are going to stick with bright colors to change from the orginal 3D Text a bit 
//feel free to change the setup, chage the background of the renderer, an d test other matcaps

//Donuts

//create  a <mesh> with a <torusGeometry> in it and duplicate teh <meshMarcapmaterial> that we used for the text


//to tweak it we can sheck the documentation of the TorusGeometry and add the parameters as an 
//array in th eargs attribute

//Multiple donuts
//we could duplicat it and try to positjon them randomly, but it would take ages and would not look very random 
//we need to do a loop and place them randomly
//map method that we saw in a previous lesson 

//Create a tempArra before the return
//although its length is 100, it is  still considered as empty 
//to fix that we can create a new array based on the values of that array with the spread operator

//Add  some randomnes to the positon 
//Add some randomness to the scale

//Optimisation
//Geomerties
//We have many geomerties althougen we should have only two (the donut and the text)
//and re use
//to fix that we are going to do a silly trick
//crate on <totusGeomtry> outside of the donut
//store it by usening useState
//put it back on the <mesh> of the donut from the state 

//Material

//in the Shaders of the performance montinring, there is only one shader 
//b/c three.js automatically re-use shaders when possible 
//we could leave it like that but let's separate teh matrial as we did for the geomerty so that we
//are only using one matrieal for the  text ane the donuts

//Animating the donat


const App = () => {
  
  const donatMatcap = useMatcapTexture('A84337_611D18_3F110F_7C2A22', 256)
  const [matcapTexture] = useMatcapTexture('593E2C_E5D8A9_BC9F79_9F8A68', 256)
  
  // const tempArray=[...Array(100)]
  // tempArray.map(()=>{

  // })
const animaDonat=useRef()
  const [tsowrusGeometry, setTursGeometry]=useState()
  useFrame((state, delta) => {
    if (animaDonat.current && animaDonat.current.children) {
      for (const donat of animaDonat.current.children) {
        donat.rotation.y += delta; // Rotate each child around the y-axis
      }
    }
  });
  useFrame((state, delta)=>{
    for(const donat of animaDonat.current.children)
// animaDonat.current.children.
    donat.rotation.y+=delta;
  })
  
  return <>
    <Perf position="top-left" />

    <OrbitControls makeDefault />
    <torusGeometry ref={setTursGeometry} args={[1, 0.6, 16, 32]}/>
    {/* <mesh scale={1.5}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh> */}
    <Center>
      <Text3D
        font="./fonts/helvetiker_regular.typeface.json"
        size={0.75}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
       
        bevelSegments={5}
      >
        
         I'm full stack developer
        <meshMatcapMaterial matcap={matcapTexture} />
      </Text3D>
    </Center>
    <group ref={animaDonat}>
    {
       [...Array(100)].map(()=>
        <mesh
       geometry={tsowrusGeometry} 
        position={[
          (Math.random()-0.5)*10,
          (Math.random()-0.5)*10,
          (Math.random()-0.5)*10,
        ]} 
        scale={0.2+Math.random()*0.002}
        rotation={[
          (Math.random()-0.5)*10,
          (Math.random()-0.5)*10,
         0
        ]}
        >
       
        <meshMatcapMaterial matcap={donatMatcap[0]}  />
      </mesh>
       )
    }
    </group>
   
  </>
}
export default App;
