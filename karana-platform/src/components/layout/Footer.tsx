import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading font-bold text-xl tracking-wider">KARANA</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              From idea to reality. Engineering, design, and manufacturing all under one roof.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services/cad-design" className="hover:text-indigo-400 transition-colors">CAD Design</Link></li>
              <li><Link href="/services/iot-projects" className="hover:text-indigo-400 transition-colors">IoT Projects</Link></li>
              <li><Link href="/services/app-development" className="hover:text-indigo-400 transition-colors">App Development</Link></li>
              <li><Link href="/services" className="hover:text-indigo-400 transition-colors">All Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link href="/work" className="hover:text-indigo-400 transition-colors">Our Work</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} KARANA Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
