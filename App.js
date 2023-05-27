//import logo from './logo.svg';
import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const getCloud = () =>
  `The Indian Army is the land-based branch and the largest component of the Indian Armed Forces. The President of India is the Supreme Commander of the Indian Army,[3] and its professional head is the Chief of Army Staff (COAS), who is a four-star general. Two officers have been conferred with the rank of field marshal, a five-star rank, which is a ceremonial position of great honour. The Indian Army was formed in 1895 alongside the long established presidency armies of the East India Company, which too were absorbed into it in 1903. The princely states had their own armies, which were merged into the national army after independence. The units and regiments of the Indian Army have diverse histories and have participated in several battles and campaigns around the world, earning many battle and theatre honours before and after Independence.`.split(
    " "
  );
// .sort(() => Math.random() > 0.5 ? 1 : -1)

function Word(props) {
  const { text, active, correct, incorrect } = props

  const rerender = useRef(0)

  useEffect(() =>{
    rerender.current += 1
  })

  if (correct === true) {
    return <span className="correct">{text} </span>;
  }

  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }
  if (active) {
    return <span className="active">{text} </span>;
    
  }

  return <span style={{ fontWeight: active ? "bold" : "normal" }}>{text}</span>;
}


Word = React.memo(Word)



function Timer(props){
  const {correctWords, startCounting} = props
  const [timeElapsed,setTimeElapsed] = useState(0)

  useEffect(()=>{
    let id
    if(startCounting){
      id = setInterval(()=>{
        setTimeElapsed(oldTime => oldTime + 1)

         
      },1000)
    }
    return () =>{
      clearInterval(id)
    }
  },[startCounting])

  const minutes = timeElapsed/60

  return <div>
          <p> <bold>TIME : </bold>
  {timeElapsed} </p>
          <p>SPEED : {((correctWords/minutes)  || 0).toFixed(2)} WPM</p>

          

  </div> 
}

function App() {
  const [userInput, setUserInput] = useState('');
  const cloud = useRef(getCloud());

const [startCounting,setStartCounting] = useState(false)

  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const[correctWordArray, setCorrectWordArray] = useState([])

  function processInput(value) {
     if(!startCounting){
      setStartCounting(true)

     }
   
    if (value.endsWith(' ')) {

      if(activeWordIndex === cloud.current.length -1){
        setStartCounting(false)
         setUserInput('Your time completed')
         return 
      }
      setActiveWordIndex((index) => index + 1);
      setUserInput('');



  setCorrectWordArray(data =>{
    const word = value.trim()
    const newResult= [...data]
    newResult[activeWordIndex] =  word === cloud.current[activeWordIndex]
    return newResult
  })


    } else {
      setUserInput(value);
    }
  }
  return (
    <div>
      <h1>Start Typing</h1>
      <Timer
       startCounting={startCounting}
       correctWords={correctWordArray.filter(Boolean).length}
       
       />

      <p>
        
        {cloud.current.map((word, index) => {
          return <Word
              text={word}
              active= {index === activeWordIndex}
              correct= {correctWordArray[index]}
             
             />
        })}
      </p>

      <input
      placeholder="Start Typing....."
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
      />
    </div>
  );
}

export default App;
