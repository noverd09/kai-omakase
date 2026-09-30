import { chef } from "@/data/chef";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";

/** P2 pull quote with marginalia: the quote takes the wide column, the facts sit in the margin. */
export function ChefSection() {
  return (
    <section className="section pt-0">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <ImageReveal className="lg:col-span-5">
          <figure>
            <Photo
              src={chef.portrait}
              alt={chef.portraitAlt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              aspect="4 / 5"
              position="45% 30%"
            />
            <figcaption className="t-label mt-4 text-ash">Stand-in photograph</figcaption>
          </figure>
        </ImageReveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="t-label text-kin-deep">{chef.title}</p>
            <h2 className="t-h1 mt-4">Chef {chef.name}</h2>
            <p className="measure mt-6 text-ash">{chef.background}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote className="mt-12 border-l border-hair pl-6 sm:pl-8">
              <p className="t-quote">&ldquo;{chef.philosophy}&rdquo;</p>
              <footer className="t-label mt-5 text-ash">Ren Takeda</footer>
            </blockquote>

            <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-hair pt-8 sm:grid-cols-3">
              {chef.facts.map((f) => (
                <div key={f.label}>
                  <dt className="t-label text-ash">{f.label}</dt>
                  <dd className="mt-1 font-serif text-lg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
