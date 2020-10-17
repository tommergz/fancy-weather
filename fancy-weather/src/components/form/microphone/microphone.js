import React from "react";
import './microphone.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

class Speech extends React.Component {

//   constructor() {
//     super()
//     this.state = {
//       listening: false,
//       speach: ''
//     }

//     this.toggleListen = this.toggleListen.bind(this)

//     this.recognition = new SpeechRecognition();
//     this.recognition.continous = true;
//     this.recognition.interimResults = true;
//     this.recognition.lang = 'en-US';
//   }

//   finalResult = '';

//   toggleListen() {

//     const lang = this.props.lang;
//     this.recognition.lang = lang;

//     const micBtn = document.getElementById('microphone-btn');
//     const mic = document.getElementById('mic');
//     if (micBtn.disabled) {
//       return;
//     }
//     micBtn.disabled = true; 
//     mic.classList.add('mic-animation');
    
//     this.recognition.start()
//       this.recognition.onend = () => {
//         console.log("...listening...")
//         this.recognition.start()
//       }

//     let finalTranscript = ''
//     this.recognition.onresult = event => {

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript;
//           this.finalResult = finalTranscript;

//           console.log(finalTranscript);
//             this.setState({
//               speach: finalTranscript
//             })

//           const word = this.state.speach;
//           console.log(this.state.speach);
//           const {voiceSearch = () => {}} = this.props;
//           voiceSearch(word)
//           micBtn.disabled = false;
//           mic.classList.remove('mic-animation');
            
//           this.recognition.stop()
//           this.recognition.onend = () => {
//             console.log("Stopped listening")
//           }

//           return finalTranscript;
//         }
//       }
//     }
    
//     this.recognition.onerror = event => {
//       console.log("Error occurred in recognition: " + event.error)
//     }
//   }

//   render() {
//     return (
//       <div >
//         <button id='microphone-btn' onClick={this.toggleListen}>
//           <FontAwesomeIcon icon={faMicrophone} id="mic" className="btn" /> 
//         </button>
//       </div>
//     )
//   }
// }

export default Speech