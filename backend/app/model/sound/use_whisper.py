from faster_whisper import WhisperModel
import os

class FastWhisper:
    def __init__(self, model_size="large-v2", mode="normal", audio_path="files/input/錄製.m4a"):
        self.model_size = model_size # tiny, base, small, medium, large, large-v2, large-v3
        self.mode = mode # normal 一般, timeline 加入時間軸, subtitle 產生成字幕檔格式
        # Resolve path relative to project root
        self.root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
        self.audio_path = os.path.join(self.root_dir, audio_path) # 設定檔案路徑
        self.write_output_file = False

    async def generate(self):
        # Run on GPU with FP16
        model = WhisperModel(self.model_size, device="cuda", compute_type="float16")
        # Run on CPU with INT8
        # model = WhisperModel(self.model_size, device="cpu", compute_type="int8")

        segments, info = model.transcribe(self.audio_path, beam_size=5, language="en")

        transcription = ""

        # 根據模式選擇輸出格式
        if self.mode == "normal":
            transcription_segments = [segment.text for segment in segments]
            transcription = "，".join(transcription_segments)

        print(transcription)

        if self.write_output_file:
            # 獲取不帶副檔名的檔案名稱
            file_name = os.path.splitext(os.path.basename(self.audio_path))[0]
            output_path = os.path.join(self.root_dir, f"files/output/{file_name}.txt")

            # 將結果保存為txt檔案
            with open(output_path, "w") as file:
                file.write(transcription)

        return transcription




