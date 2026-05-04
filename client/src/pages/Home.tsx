import { ArrowRight, MapPin, Image as ImageIcon, CheckCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-28 sm:pt-28 sm:pb-36">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
            The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tool Suite</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            One platform, multiple utilities. From precise food delivery map pinning to lightning-fast image compression. Build better, faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/map" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Try Map Tool <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/compress" className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
              Try Image Compressor
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Premium Tools</h2>
            <p className="text-lg text-gray-600">Everything you need, separated and focused for maximum efficiency.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Tool Card 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Location Map Tool</h3>
              <p className="text-gray-600 mb-6">
                Perfect for e-hailing and food delivery platforms. Pin precise locations via OpenStreetMap directly in the browser.
              </p>
              <ul className="space-y-3 mb-8">
                {['Interactive OpenStreetMap', 'Precise Coordinates', 'No Database Required', 'Real-time Draggable Pins'].map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/map" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                Launch Map Tool <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Tool Card 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <ImageIcon className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Image Compressor</h3>
              <p className="text-gray-600 mb-6">
                High-performance image resizing, format conversion, and compression powered by sharp. Keep your app lightning fast.
              </p>
              <ul className="space-y-3 mb-8">
                {['Server-side Processing', 'Convert to WebP, JPEG, PNG', 'Custom Quality Control', 'Instant Download'].map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/compress" className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700">
                Launch Compressor <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose a Tool', desc: 'Select from our suite of specialized utilities from the navbar.' },
              { step: '2', title: 'Perform Action', desc: 'Interact with the tool—pin a location or upload an image.' },
              { step: '3', title: 'Get Results', desc: 'Instantly get your coordinates or download your compressed file.' }
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg shadow-blue-200 z-10">
                  {item.step}
                </div>
                {idx !== 2 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200"></div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: 'Is there a database required?', a: 'No, this suite operates entirely in-memory and client-side. No database setup is needed.' },
              { q: 'Are my images stored on the server?', a: 'No, images are processed in-memory using buffer streams and are never saved to disk.' },
              { q: 'What map provider is used?', a: 'We use OpenStreetMap, an open-source and free-to-use map provider perfect for ride-hailing and delivery apps.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h4 className="flex items-center text-lg font-bold text-gray-900 mb-2">
                  <HelpCircle className="h-5 w-5 text-blue-600 mr-2" /> {faq.q}
                </h4>
                <p className="text-gray-600 ml-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to streamline your workflow?</h2>
          <p className="text-blue-100 text-xl mb-8">Start using our suite of modular tools today.</p>
          <Link to="/map" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors shadow-xl">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
