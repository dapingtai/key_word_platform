import { Component, createSignal, Show } from "solid-js";
import Modal from '../components/Modal';
import { Portal } from "solid-js/web";
import "../styles/SearchInterface.css";
import "../styles/LoadingAnimation.css";

interface RecordingType {
  url: string;
  timeTag: string;
  timestamp: string;
  isPlaying: boolean;
  audio: HTMLAudioElement | null;
  searchText: string;
  analysisText: string;
}

const SearchInterface: Component = () => {
  const [searchText, setSearchText] = createSignal("");
  const [isRecording, setIsRecording] = createSignal(false);
  const [recordings, setRecordings] = createSignal<
    Array<RecordingType>
  >([]);
  const [modalIsOpen, setModalIsOpen] = createSignal(false);
  const [isUploading, setIsUploading] = createSignal(false);
  const [uploadProgress, setUploadProgress] = createSignal(0);
  const [selectedRecording, setSelectedRecording] = createSignal<RecordingType | null>(null);
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: BlobPart[] = [];

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log("Search submitted:", searchText());
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        const timeTag = new Date().toLocaleTimeString();
        const timestamp = new Date().getTime().toString();
        const audio = new Audio(url);

        audio.onended = () => {
          const updatedRecordings = recordings().map((rec) =>
            rec.url === url ? { ...rec, isPlaying: false } : rec
          );
          setRecordings(updatedRecordings);
        };

        setRecordings([
          ...recordings(),
          {
            url,
            timeTag,
            timestamp,
            isPlaying: false,
            audio,
            searchText: searchText(),
            analysisText: ''
          },
        ]);
        setSearchText("");

        audioChunks = [];
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Error accessing microphone. Please make sure you have granted permission."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const togglePlayback = (url: string) => {
    const recording = recordings().find((rec) => rec.url === url);
    if (!recording?.audio) return;

    const updatedRecordings = recordings().map((rec: any) => {
      if (rec.url === url) {
        if (rec.isPlaying) {
          rec.audio?.pause();
          rec.audio.currentTime = 0;
          return { ...rec, isPlaying: false };
        } else {
          rec.audio?.play();
          return { ...rec, isPlaying: true };
        }
      } else {
        if (rec.isPlaying) {
          rec.audio?.pause();
          rec.audio.currentTime = 0;
          return { ...rec, isPlaying: false };
        }
        return rec;
      }
    });

    setRecordings(updatedRecordings);
  };

  const handleVoiceButtonClick = () => {
    if (isRecording()) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const uploadRecording = async(recording: RecordingType) => {
    try {
      setUploadProgress(1);
      setModalIsOpen(true);
      setIsUploading(true);
      
      const response = await fetch(recording.url);
      const audioBlob = await response.blob();
      
      const formData = new FormData();
      formData.append('audio_file', audioBlob, `${recording.timestamp}.wav`);
      formData.append('searchText', recording.searchText);
      
      const uploadResponse = await fetch('http://localhost:3000/api/v1/audio/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }
      console.log('Upload success');
      setUploadProgress(2)
      analysisRecording(recording)
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Failed to upload recording');
      setIsUploading(false);
    } finally {
      console.log('Upload completed');
    }
  }

  const analysisRecording = async (recording: RecordingType) => {
    try {
      const baseUrl = 'http://localhost:3000/api/v1/audio/analysis'
      const params = {
        filename: `${recording.timestamp}.wav`
      }
      const url = new URL(baseUrl)
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key as keyof typeof params]))
      const analysisResponse = await fetch(url, {
        method: 'GET',
      });

      if (!analysisResponse.ok) {
        throw new Error('Upload failed');
      }

      const resJson = await analysisResponse.json()
      console.log('Analysis success', resJson.message)
      const updatedRecordings = recordings().map((rec) => {
        if (rec.timestamp === recording.timestamp) {
          const updateRec = { ...rec, analysisText: resJson.message };
          setSelectedRecording(updateRec);
          return updateRec;
        } else {
          return rec;
        }
      });
      setRecordings(updatedRecordings);
      setUploadProgress(0)
    } catch (error) {
      console.error('Error analysis:', error);
      alert('Failed to analysis recording');
    } finally {
      setIsUploading(false);
    }
  }

  const removePunctuation = (str: string) => { return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""); };

  const matchTextScore = (templateText: string, text: string) => {
    const templateArray: string[] = removePunctuation(templateText).trimStart().split(' ');
    const textArray: string[] = removePunctuation(text).trimStart().split(' ');
    let matchCount: number = 0;
    templateArray.forEach((word, index) => {
      console.log(word, index, textArray)
      if (textArray[index] === undefined) return;
      if (textArray[index].toLowerCase() === word.toLowerCase()) {
        matchCount += 1;
      }
    })
    console.log(matchCount, templateArray.length)
    return matchCount / templateArray.length
  }

  return (
    <div class="search-container">
      <form onSubmit={handleSubmit}>
        <div class="search-box">
          <input
            type="text"
            value={searchText()}
            onInput={(e) => setSearchText(e.target.value)}
            placeholder="Search your english talk..."
            class="search-input"
          />
          <button
            type="button"
            onClick={handleVoiceButtonClick}
            class={`voice-button ${isRecording() ? "recording" : ""}`}
            title={isRecording() ? "Stop Recording" : "Start Recording"}
          >
            {isRecording() ? "⏹️" : "🎤"}
          </button>
          <button type="submit" class="search-button">
            🔍
          </button>
        </div>
      </form>
      <div class="recordings-list">
        {recordings().map((recording) => (
          <div class="audio-controls">
            <span class="audio-file-name">
              {`Recording ${recording.timeTag} - 題目:"${recording.searchText}"`}
            </span>
            <div class="audio-controls-btn-container">
              <button
                onClick={async () => {
                  if (recording.analysisText) {
                    setSelectedRecording(recording);
                    setModalIsOpen(true);
                  } else {
                    uploadRecording(recording);
                  }
                }}
                class="upload-button"
                title="Upload for comparison"
              >
                📝
              </button>
              <button
                onClick={() => togglePlayback(recording.url)}
                class={`playback-button ${
                  recording.isPlaying ? "playing" : ""
                }`}
                title={recording.isPlaying ? "Stop Playback" : "Play Recording"}
              >
                {recording.isPlaying ? "⏹️" : "▶️"}
              </button>
            </div>
            <Portal>
              <Modal
                isOpen={modalIsOpen()}
                onClose={() => {
                  setModalIsOpen(false);
                  setSelectedRecording(null);
                }}
                title="語音分析"
              >
                <Show when={isUploading()} fallback={
                  <>
                    { uploadProgress() === 0 && '完成分析語音檔案' }
                    <p>分析時間: { selectedRecording()?.timeTag }</p>
                    <p>檔案編號: { selectedRecording()?.timestamp }</p>
                    <p>分析結果: { selectedRecording()?.analysisText }</p>
                    <p>比對內容: { selectedRecording()?.searchText }</p>
                    <p>比對分數: { matchTextScore(selectedRecording()?.searchText || '', selectedRecording()?.analysisText || '') * 100 }%</p>
                  </>
                }>
                  <div class="loading-container">
                    <p>
                      { uploadProgress() === 1 && '正在上傳語音檔案...' }
                      { uploadProgress() === 2 && '正在分析語音檔案...' }
                    </p>
                    <div class="progress-bar">
                      <div class="progress-bar-inner"></div>
                    </div>
                  </div>
                </Show>
              </Modal>
            </Portal>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default SearchInterface;
