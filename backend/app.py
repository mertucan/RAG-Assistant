import os
import mimetypes
import tempfile
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel('gemini-2.5-flash')

@app.route('/api/upload', methods=['POST'])
def upload():
    try:
        print("Upload endpoint called")
        
        if 'files' not in request.files:
            return jsonify({"error": "No files part in request"}), 400

        files = request.files.getlist('files')
        print(f"Received {len(files)} files")
        
        if not files or all(f.filename == '' for f in files):
            return jsonify({"error": "No files provided"}), 400

        uploaded = []
        for i, f in enumerate(files):
            if f.filename == '':
                continue
                
            print(f"Processing file {i+1}: {f.filename}")
            
            suffix = os.path.splitext(f.filename)[1]
            mime_type = mimetypes.guess_type(f.filename)[0] or 'application/octet-stream'
            print(f"Detected MIME type: {mime_type}")
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
                f.save(tmp.name)
                print(f"Saved to temp file: {tmp.name}")
                
                try:
                    gfile = genai.upload_file(tmp.name, mime_type=mime_type)
                    print(f"Uploaded to Gemini: {gfile.name}")
                    print(f"File URI: {gfile.uri}")
                    
                    uploaded.append({
                        "id": gfile.name,
                        "uri": gfile.uri,
                        "mimeType": getattr(gfile, "mime_type", mime_type),
                        "displayName": f.filename
                    })
                except Exception as upload_error:
                    print(f"Gemini upload error for {f.filename}: {upload_error}")
                    raise upload_error
                finally:
                    try:
                        os.remove(tmp.name)
                    except Exception:
                        pass

        print(f"Successfully uploaded {len(uploaded)} files")
        return jsonify({"files": uploaded})
        
    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message')
        file_uris = data.get('fileUris', [])
        
        print(f"Chat request - Message: {user_message}, File URIs: {file_uris}")

        if not user_message and not file_uris:
            return jsonify({"error": "Message or files required"}), 400

        # Gemini için doğru format - file_uri kullan
        parts = []
        
        # Dosyaları ekle
        for uri in file_uris:
            print(f"Adding file URI to parts: {uri}")
            parts.append({
                "file_data": {
                    "file_uri": uri,
                    "mime_type": "application/pdf"  # Varsayılan, gerçek mime type'ı almak için upload'da saklamalıyız
                }
            })
        
        # Mesajı ekle
        if user_message:
            parts.append(user_message)
        elif file_uris:
            # Sadece dosya varsa varsayılan mesaj
            parts.append("Bu dosyaları analiz et ve içeriklerini özetle.")

        print(f"Generating content with {len(parts)} parts")
        print(f"Parts: {parts}")
        
        response = model.generate_content(parts)
        
        print("Generated response successfully")
        return jsonify({"reply": response.text})
        
    except Exception as e:
        print(f"Chat error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)