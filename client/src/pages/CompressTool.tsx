import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Settings2, Download, AlertCircle, Loader2 } from 'lucide-react';

export default function CompressTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [format, setFormat] = useState('webp');
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      setSelectedFile(file);
      setError(null);
      
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('format', format);
    formData.append('quality', quality.toString());

    try {
      const response = await fetch('http://localhost:5001/api/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image compression failed');
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `compressed_${selectedFile.name.split('.')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ImageIcon className="h-8 w-8 text-purple-600" />
          Image Compressor
        </h1>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Upload an image to resize, change format, and compress it using server-side Sharp processing.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Upload / Preview Area */}
        <div className="lg:col-span-2">
          {!selectedFile ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 p-12 text-center hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Click or drag image here</h3>
              <p className="text-gray-500 text-sm">Supports JPG, PNG, WEBP (Max 10MB)</p>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm relative group">
              <img src={previewUrl!} alt="Preview" className="w-full h-auto max-h-[600px] object-contain bg-gray-100" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-gray-50"
                >
                  Choose Different Image
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 border border-red-100">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}
        </div>

        {/* Settings Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Output Settings
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <div className="grid grid-cols-3 gap-3">
                {['webp', 'jpeg', 'png'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormat(fmt)}
                    className={`py-2 px-3 border rounded-lg text-sm font-medium capitalize transition-colors ${
                      format === fmt 
                        ? 'border-purple-600 bg-purple-50 text-purple-700' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Quality</label>
                <span className="text-sm text-gray-500">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Smaller File</span>
                <span>Better Quality</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={processImage}
                disabled={!selectedFile || isProcessing}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium shadow-md transition-all ${
                  !selectedFile 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isProcessing
                      ? 'bg-purple-400 text-white cursor-wait'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Compress & Download
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
