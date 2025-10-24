"use client"

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="space-grotesk text-2xl font-black mb-2">ONCHAIN</h3>
            <p className="text-sm text-gray-400">
              Decentralized UGC marketplace
              <br />
              Built on Base
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    License Agreement
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-gray-800 pt-8">
          <p className="text-sm text-gray-400 text-center">© 2025 ONCHAIN - Built with ❤️ for Web3 creators</p>
        </div>
      </div>
    </footer>
  )
}
