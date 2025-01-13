interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

// Extend the global window object
declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

export {};