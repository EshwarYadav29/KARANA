export const metadata = {
  title: "About Us",
  description: "The story and philosophy behind KARANA Innovation Execution Platform.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About KARANA</h1>
          <p className="text-xl text-muted-foreground">
            We exist to turn your rough ideas into fully engineered realities.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg">
            KARANA is not a typical freelance marketplace, nor is it a traditional portfolio site. We are a managed innovation studio. That means when you bring a project to us, you get a dedicated team of engineers, designers, and builders who execute it from end to end.
          </p>
          <p className="text-lg">
            Our multi-disciplinary approach covers everything from complex 3D CAD modeling and multi-physics simulations, to modern full-stack web applications, custom IoT hardware, and manufacturing logistics.
          </p>
          <p className="text-lg">
            We believe that innovation shouldn't be blocked by execution. Bring us your hardest problems. We'll build the solution.
          </p>
        </div>
      </div>
    </div>
  )
}
