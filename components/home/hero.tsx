"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, CheckCircle, Building, Lightbulb, FileText } from "lucide-react"
import { RealTimeCounter } from "@/components/ui/real-time-counter"
import Link from "next/link"

const properties = [
  {
    id: 1,
    image: "/images/11450-n-cherokee-st-northglenn.jpg",
    alt: "Modern flex space units with ample parking at 11450 N Cherokee St in Northglenn, Colorado",
    title: "1,200 sq ft Flex Space Units",
    location: "Northglenn, Colorado • Available Now",
    price: "$2,850/month",
    available: true,
  },
  {
    id: 2,
    image: "/images/boulder-aerial-facility.jpg",
    alt: "Aerial view of modern flex facility available for lease in Boulder, Colorado",
    title: "4,800 sq ft Flex Facility",
    location: "Boulder, Colorado • Available Now",
    price: "$4,500/month",
    amenities: "12 ft driving door • Heavy power • Kitchenette",
    available: true,
  },
  {
    id: 3,
    image: "/images/lakewood-warehouse.jpg",
    alt: "Industrial warehouse space available for lease in Lakewood, Colorado",
    title: "1,850 sq ft Warehouse",
    location: "Lakewood, Colorado • Available Now",
    price: "$3,000/month",
    amenities: "Driving door • 200 amps 3p power • Outdoor storage",
    available: true,
  },
]

const coloradoCities = [
  "DENVER",
  "WESTMINSTER",
  "LITTLETON",
  "GOLDEN",
  "BOULDER",
  "NORTHGLENN",
  "LAKEWOOD",
  "AURORA",
  "KEN CARYL",
  "ARVADA",
  "BROOMFIELD",
  "CENTENNIAL",
  "COMMERCE CITY",
  "ENGLEWOOD",
  "HIGHLANDS RANCH",
  "PARKER",
  "THORNTON",
]

// Exact space types in order
const spaceTypes = [
  "WAREHOUSE SPACE",
  "RETAIL SPACE",
  "FLEX SPACE",
  "SHOP SPACE",
  "INDUSTRIAL SPACE",
  "STORAGE SPACE",
  "MEDICAL OFFICE",
]

// Group cities into 4 different slots for the train station animation
const cityGroups = [
  ["BOULDER", "WESTMINSTER", "HIGHLANDS RANCH", "LAFAYETTE"],
  ["DENVER", "AURORA", "LAKEWOOD", "THORNTON"],
  ["ARVADA", "CENTENNIAL", "GREELEY", "LONGMONT"],
  ["CASTLE ROCK", "LOVELAND", "BROOMFIELD", "COMMERCE CITY"],
]

export default function Hero() {
  const router = useRouter()
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isScrollPaused, setIsScrollPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayedWord, setDisplayedWord] = useState(spaceTypes[0])
  const [isFlipping, setIsFlipping] = useState(false)

  // State for city flip board animation
  const [cityIndices, setCityIndices] = useState([0, 0, 0, 0])
  const [cityFlipping, setCityFlipping] = useState([false, false, false, false])

  const handleGetStarted = () => {
    router.push("/questionnaire")
  }

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        setCurrentPropertyIndex((prevIndex) => (prevIndex + 1) % properties.length)
      }, 5000)

      return () => clearInterval(intervalId)
    }
  }, [isPaused])

  // Clean flip animation - rebuild the entire word each time
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true)

      setTimeout(() => {
        const nextIndex = (currentWordIndex + 1) % spaceTypes.length
        setCurrentWordIndex(nextIndex)
        setDisplayedWord(spaceTypes[nextIndex])
        setIsFlipping(false)
      }, 300) // Half of the flip animation duration
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [currentWordIndex])

  // City flip board animation
  useEffect(() => {
    // Create separate intervals for each city slot with different timings
    const intervals = cityGroups.map((_, groupIndex) => {
      return setInterval(
        () => {
          setCityFlipping((prev) => {
            const newState = [...prev]
            newState[groupIndex] = true
            return newState
          })

          setTimeout(() => {
            setCityIndices((prev) => {
              const newIndices = [...prev]
              newIndices[groupIndex] = (newIndices[groupIndex] + 1) % cityGroups[groupIndex].length
              return newIndices
            })

            setCityFlipping((prev) => {
              const newState = [...prev]
              newState[groupIndex] = false
              return newState
            })
          }, 300) // Half of the flip animation duration
        },
        3000 + groupIndex * 500,
      ) // Stagger the animations
    })

    return () => {
      intervals.forEach((interval) => clearInterval(interval))
    }
  }, [])

  const currentProperty = properties[currentPropertyIndex]

  const getImagePositioning = (propertyId: number) => {
    switch (propertyId) {
      case 1: // Northglenn - show the building and parking area
        return "center 40%"
      case 2: // Boulder - centralized and higher
        return "center 20%"
      case 3: // Lakewood - show all loading doors above text
        return "center 0%" // Moved to the very top to ensure building is fully visible
      default:
        return "center 25%"
    }
  }

  return (
    <>
      <style jsx>{`
        .flip-board {
          display: inline-flex;
          gap: 2px;
          justify-content: flex-start;
          align-items: center;
        }

        .flip-letter {
          background-color: #29CC61;
          color: #fff;
          width: 24px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          perspective: 600px;
          overflow: hidden;
          font-size: 20px;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .flip-letter.space {
          background-color: transparent;
          box-shadow: none;
          width: 12px;
        }

        .letter-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          transform-origin: center;
          transform-style: preserve-3d;
          transition: transform 0.6s ease-out;
        }

        .letter-inner.flipping {
          animation: flipLetter 0.6s ease-out forwards;
        }

        @keyframes flipLetter {
          0% {
            transform: rotateX(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateX(-90deg);
            opacity: 0.3;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }

        .city-board {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .city-slot {
          color: #374151;
          padding: 8px 16px;
          border-radius: 4px;
          min-width: 180px;
          text-align: center;
          perspective: 600px;
          overflow: hidden;
        }

        .city-text {
          display: block;
          font-weight: bold;
          font-size: 18px;
          transform-origin: center;
          transform-style: preserve-3d;
          transition: transform 0.6s ease-out;
        }

        .city-text.flipping {
          animation: flipCity 0.6s ease-out forwards;
        }

        @keyframes flipCity {
          0% {
            transform: rotateX(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateX(-90deg);
            opacity: 0.3;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .flip-letter {
            width: 20px;
            height: 30px;
            font-size: 16px;
          }
          .flip-letter.space {
            width: 10px;
          }
          .city-slot {
            min-width: 120px;
            padding: 6px 10px;
          }
          .city-text {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .flip-letter {
            width: 18px;
            height: 28px;
            font-size: 14px;
          }
          .flip-letter.space {
            width: 8px;
          }
          .city-board {
            flex-wrap: wrap;
            gap: 8px;
          }
          .city-slot {
            min-width: 45%;
            font-size: 12px;
          }
        }

        .city-flip-board {
          display: inline-flex;
          gap: 2px;
          justify-content: center;
          align-items: center;
        }

        .city-flip-letter {
          background-color: #000;
          color: #fff;
          width: 20px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          perspective: 600px;
          overflow: hidden;
          font-size: 16px;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .city-flip-letter.space {
          background-color: transparent;
          box-shadow: none;
          width: 8px;
        }

        .city-letter-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          transform-origin: center;
          transform-style: preserve-3d;
          transition: transform 0.6s ease-out;
        }

        .city-letter-inner.flipping {
          animation: flipCityLetter 0.6s ease-out forwards;
        }

        @keyframes flipCityLetter {
          0% {
            transform: rotateX(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateX(-90deg);
            opacity: 0.3;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }
      `}</style>

      <section
        className="relative bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              {/* Trust badge */}
              <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="h-4 w-4 mr-2" />
                Colorado's #1 Small Space Specialists
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                FIND YOUR PERFECT
                <span className="text-blue-600 block">SMALL SPACE</span>
                <span className="text-gray-900 text-2xl sm:text-3xl md:text-4xl block mt-2">IN COLORADO</span>
              </h1>

              {/* Animated subheading with clean flip-board effect */}
              <div className="text-xl text-gray-800 mb-8 max-w-lg">
                <div className="font-medium leading-relaxed">
                  <p className="mb-2">Flexible, Affordable, Move-In Ready:</p>
                  <div className="flip-board mb-2" aria-live="polite" aria-label={`Flexible Small ${displayedWord}`}>
                    {displayedWord.split("").map((letter, index) => (
                      <div
                        key={`${currentWordIndex}-${index}`}
                        className={`flip-letter ${letter === " " ? "space" : ""}`}
                      >
                        {letter !== " " && (
                          <div className={`letter-inner ${isFlipping ? "flipping" : ""}`}>{letter}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="font-medium">Specializing in 200–10,000 sq ft.</p>
              </div>

              {/* Key benefits */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">All Colorado</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">1M+ SQFT</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Building className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">200+ Available Units</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Main CTA */}
                <div>
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 h-auto"
                  >
                    Find My Space Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <RealTimeCounter
                  initialCount={12}
                  minCount={8}
                  maxCount={18}
                  className="justify-start text-gray-600"
                  message="spaces available this week"
                />

                {/* Secondary Page Navigation */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">Learn more about our services:</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/why-rent-small-space">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all duration-200 text-sm px-4 py-2 h-auto font-medium group"
                      >
                        <Lightbulb className="mr-2 h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
                        Why Use Lease Small Space
                      </Button>
                    </Link>

                    <Link href="/nnn-lease-guide">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all duration-200 text-sm px-4 py-2 h-auto font-medium group"
                      >
                        <FileText className="mr-2 h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
                        NNN Lease Guide
                      </Button>
                    </Link>
                    {/* Future buttons will go here */}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:pl-12">
              <div className="relative">
                {/* Main property image carousel */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
                  {properties.map((property, index) => (
                    <div
                      key={property.id}
                      className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                        index === currentPropertyIndex
                          ? "translate-x-0"
                          : index < currentPropertyIndex
                            ? "-translate-x-full"
                            : "translate-x-full"
                      }`}
                    >
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.alt}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: getImagePositioning(property.id),
                          imageRendering: "high-quality",
                          backfaceVisibility: "hidden",
                          transform: "translateZ(0)",
                        }}
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                      {/* Property highlight overlay */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{property.title}</h3>
                              <p className="text-gray-600">{property.location}</p>
                              {property.amenities && <p className="text-sm text-gray-700 mt-1">{property.amenities}</p>}
                              <p className="text-blue-600 font-bold text-xl mt-2">{property.price}</p>
                            </div>
                            <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                              Available
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating testimonial - rotates with properties */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden lg:block">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      {currentPropertyIndex === 0 && (
                        <>
                          <p className="text-sm font-medium">"Found our space in 2 days!"</p>
                          <p className="text-xs text-gray-500">- Sarah M., Boulder</p>
                        </>
                      )}
                      {currentPropertyIndex === 1 && (
                        <>
                          <p className="text-sm font-medium">"Easy, convenient, straightforward"</p>
                          <p className="text-xs text-gray-500">- David F., Fort Collins</p>
                        </>
                      )}
                      {currentPropertyIndex === 2 && (
                        <>
                          <p className="text-sm font-medium">"Perfect for our growing business"</p>
                          <p className="text-xs text-gray-500">- Mike R., Colorado Springs</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                  {properties.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                        currentPropertyIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/75"
                      }`}
                      onClick={() => setCurrentPropertyIndex(index)}
                      aria-label={`Go to property ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Train Station Style City Board - Full Width */}
        <div className="relative w-full mt-12 py-6 px-4">
          <div className="city-board">
            {cityGroups.map((cities, groupIndex) => (
              <div key={groupIndex} className="city-slot">
                <div className="city-flip-board" aria-live="polite">
                  {cities[cityIndices[groupIndex]].split("").map((letter, letterIndex) => (
                    <div
                      key={`${groupIndex}-${cityIndices[groupIndex]}-${letterIndex}`}
                      className={`city-flip-letter ${letter === " " ? "space" : ""}`}
                    >
                      {letter !== " " && (
                        <div className={`city-letter-inner ${cityFlipping[groupIndex] ? "flipping" : ""}`}>
                          {letter}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
