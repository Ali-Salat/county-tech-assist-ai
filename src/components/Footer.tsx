
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="hero-gradient text-white mt-auto shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="text-center mb-6">
            <p className="text-lg font-bold mb-2">
              &copy; {currentYear} <span className="font-extrabold">County Government of Wajir</span> ICT Help Desk
            </p>
            <p className="text-sm opacity-90 font-semibold">
              All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
            <div className="text-center">
              <h3 className="font-bold text-white/90 mb-1">Emergency Support</h3>
              <p className="text-sm opacity-80">24/7 Critical Issues</p>
              <p className="text-sm font-semibold">helpdesk@wajir.go.ke</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-white/90 mb-1">Office Hours</h3>
              <p className="text-sm opacity-80">Monday - Friday</p>
              <p className="text-sm font-semibold">8:00 AM - 5:00 PM EAT</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-white/90 mb-1">Location</h3>
              <p className="text-sm opacity-80">County Headquarters</p>
              <p className="text-sm font-semibold">Wajir Town, Kenya</p>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors font-semibold hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors font-semibold hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors font-semibold hover:underline">
                  Contact ICT
                </a>
              </div>
              <div className="text-sm text-white/80 font-semibold">
                Powered by ICT Department
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
