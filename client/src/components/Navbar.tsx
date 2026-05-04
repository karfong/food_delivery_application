import { Link } from 'react-router-dom';
import { Layers, MapPin, Image as ImageIcon, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Layers className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">OmniTools</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
            
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                Products <ChevronDown className="h-4 w-4" />
              </button>
              
              <div 
                className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link to="/map" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Location Pin</div>
                    <div className="text-xs text-gray-500">Food & Ride Map Tool</div>
                  </div>
                </Link>
                <Link to="/compress" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="bg-purple-100 p-2 rounded-md">
                    <ImageIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Image Compress</div>
                    <div className="text-xs text-gray-500">Optimize & resize images</div>
                  </div>
                </Link>
              </div>
            </div>
            
            <a href="#faq" className="text-gray-600 hover:text-blue-600 font-medium">FAQ</a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600">Home</Link>
            <Link to="/map" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600">Map Tool</Link>
            <Link to="/compress" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600">Image Compress</Link>
            <a href="#faq" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600">FAQ</a>
          </div>
        </div>
      )}
    </nav>
  );
}
