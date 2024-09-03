import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <LogInIcon className="w-8 h-8" />
          <nav className="flex gap-4">
            <a href="#" className="text-sm" prefetch={false}>
              Pricing
            </a>
            <a href="#" className="text-sm" prefetch={false}>
              Solutions
            </a>
            <a href="#" className="text-sm" prefetch={false}>
              Community
            </a>
            <a href="#" className="text-sm" prefetch={false}>
              Resources
            </a>
            <a href="#" className="text-sm" prefetch={false}>
              Pricing
            </a>
            <a href="#" className="text-sm" prefetch={false}>
              Contact
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Sign in</Button>
          <Button>Register</Button>
        </div>
      </header>
      <main className="flex flex-1 p-4 gap-4">
        <aside className="w-64 p-4 border rounded-md">
          <div className="space-y-4">
            <div>
              <Label className="block mb-2">Keywords</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Spring</Badge>
                <Badge variant="secondary">Smart</Badge>
                <Badge variant="secondary">Modern</Badge>
              </div>
            </div>
            <div>
              <Label className="block mb-2">Label</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="label1" />
                  <label htmlFor="label1" className="text-sm">
                    Label
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="label2" />
                  <label htmlFor="label2" className="text-sm">
                    Description
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="label3" />
                  <label htmlFor="label3" className="text-sm">
                    Label
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="label4" />
                  <label htmlFor="label4" className="text-sm">
                    Description
                  </label>
                </div>
              </div>
            </div>
            <div>
              <Label className="block mb-2">Price</Label>
              <Input type="range" min="0" max="100" />
            </div>
            <div>
              <Label className="block mb-2">Color</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="color1" />
                  <label htmlFor="color1" className="text-sm">
                    Label
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="color2" />
                  <label htmlFor="color2" className="text-sm">
                    Label
                  </label>
                </div>
              </div>
            </div>
            <div>
              <Label className="block mb-2">Size</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="size1" />
                  <label htmlFor="size1" className="text-sm">
                    Label
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size2" />
                  <label htmlFor="size2" className="text-sm">
                    Label
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Input type="search" placeholder="Search" className="pl-8" />
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="default">New</Button>
              <Button variant="outline">Price ascending</Button>
              <Button variant="outline">Price descending</Button>
              <Button variant="outline">Rating</Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Card key={idx} className="flex flex-col items-center p-4">
                <div className="w-full h-32 bg-gray-200 rounded-md mb-4" />
                <div className="text-center">
                  <p className="text-sm">Text</p>
                  <p className="text-sm">$0</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="p-4 border-t">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <LogInIcon className="w-8 h-8" />
            <div className="flex gap-2">
              <FacebookIcon className="w-6 h-6" />
              <TwitterIcon className="w-6 h-6" />
              <aedinIcon className="w-6 h-6" />
              <InstagramIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="flex gap-8">
            <div>
              <h4 className="font-bold mb-2">Use cases</h4>
              <ul className="space-y-1 text-sm">
                <li>UI design</li>
                <li>UX design</li>
                <li>Wireframing</li>
                <li>Diagramming</li>
                <li>Brainstorming</li>
                <li>Online whiteboard</li>
                <li>Team collaboration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Explore</h4>
              <ul className="space-y-1 text-sm">
                <li>Design</li>
                <li>Prototyping</li>
                <li>Development features</li>
                <li>Design systems</li>
                <li>Collaboration features</li>
                <li>Design process</li>
                <li>Figma</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Resources</h4>
              <ul className="space-y-1 text-sm">
                <li>Blog</li>
                <li>Best practices</li>
                <li>Colors</li>
                <li>Support</li>
                <li>Developers</li>
                <li>Customer stories</li>
                <li>Resource library</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function aedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function LogInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}