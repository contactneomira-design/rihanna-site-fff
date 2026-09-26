'use client'

import Image from 'next/image'

// Logos in the exact order provided. File order preserved intentionally.
const BRANDS = [
  { src: '/brands/porsche.png', alt: 'Porsche' },
  { src: '/brands/peugeot.png', alt: 'Peugeot' },
  { src: '/brands/volkswagen.png', alt: 'Volkswagen' },
  { src: '/brands/range-rover.png', alt: 'Range Rover' },
  { src: '/brands/hyundai.png', alt: 'Hyundai' },
  { src: '/brands/dacia.png', alt: 'Dacia' },
  { src: '/brands/renault.png', alt: 'Renault' },
]

// Infinite CSS marquee of partner brand logos, placed just above the footer.
// Pure CSS animation (no JS timers) for a smooth, cheap, continuous loop.
// Track is duplicated once so the loop seams perfectly at -50%.
export default function BrandsMarquee() {
  const track = [...BRANDS, ...BRANDS]

  return (
    <section
      aria-label="Marques partenaires"
      className="relative bg-night border-t border-night-line py-10 sm:py-14 overflow-hidden"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="brands-marquee-track flex items-center w-max">
          {track.map((brand, i) => (
            <div
              key={`${brand.alt}-${i}`}
              className="flex items-center justify-center mx-8 sm:mx-12 shrink-0 h-10 sm:h-14"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={140}
                height={56}
                className="h-full w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brands-marquee-track {
          animation: brands-marquee 38s linear infinite;
        }
        @media (hover: hover) {
          section:hover .brands-marquee-track {
            animation-play-state: paused;
          }
        }
        @keyframes brands-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (max-width: 640px) {
          .brands-marquee-track {
            animation-duration: 24s;
          }
        }
      `}</style>
    </section>
  )
}
