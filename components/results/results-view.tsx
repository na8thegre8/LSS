"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, MapPin, List, X, ChevronDown, Building2 } from "lucide-react"
import ResultsMap from "./results-map"
import ListingCard from "./listing-card"
import FiltersPanel from "./filters-panel"
import { mockListings } from "@/lib/mock-data"
import type { Listing } from "@/lib/types"

type SearchParams = {
  zip: string
  type: string
  size: number
  budget: number
  timeline: string
  features: string[]
}

export default function ResultsView({ searchParams }: { searchParams: SearchParams }) {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [view, setView] = useState<"map" | "list">("map")
  const [selectedListing, setSelectedListing] = useState<string | null>(null)

  // Simulate loading listings
  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(mockListings)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen flex flex-col">
      {/* Header with search summary and filters */}
      <header className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold flex items-center">
              <Building2 className="mr-2 h-5 w-5 text-[#ED4337]" />
              {listings.length} spaces in {searchParams.zip || "Denver"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
              <span>{searchParams.type || "All types"}</span>
              <span>•</span>
              <span>{searchParams.size.toLocaleString()} sq ft</span>
              {searchParams.budget > 0 && (
                <>
                  <span>•</span>
                  <span>Up to ${searchParams.budget.toLocaleString()}/mo</span>
                </>
              )}
              {searchParams.features.length > 0 && (
                <>
                  <span>•</span>
                  <span>{searchParams.features.length} features</span>
                </>
              )}
              <Button variant="ghost" size="sm" className="text-[#ED4337]" onClick={() => setShowFilters(!showFilters)}>
                Edit
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Tabs defaultValue={view} onValueChange={(value) => setView(value as "map" | "list")}>
                <TabsList>
                  <TabsTrigger value="map" className={view === "map" ? "bg-[#ED4337] text-white" : ""}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Map
                  </TabsTrigger>
                  <TabsTrigger value="list" className={view === "list" ? "bg-[#ED4337] text-white" : ""}>
                    <List className="mr-2 h-4 w-4" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:ml-2">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {showFilters ? <X className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Filters panel */}
      {showFilters && <FiltersPanel searchParams={searchParams} onClose={() => setShowFilters(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Map view (desktop) or List view (mobile) */}
        <div className={`${view === "map" ? "flex-1" : "hidden md:block md:w-1/2 lg:w-3/5"} relative`}>
          <ResultsMap
            listings={listings}
            selectedId={selectedListing}
            onSelectListing={(id) => setSelectedListing(id)}
          />
        </div>

        {/* Listings sidebar */}
        <div
          className={`${
            view === "list" ? "flex-1" : "hidden md:block md:w-1/2 lg:w-2/5"
          } bg-white border-l overflow-y-auto`}
        >
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ED4337] mx-auto"></div>
              <p className="mt-4 text-gray-600">Finding the best spaces for you...</p>
            </div>
          ) : (
            <div className="divide-y">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  isSelected={selectedListing === listing.id}
                  onSelect={() => setSelectedListing(listing.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile view switcher */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex">
        <Button
          variant={view === "map" ? "default" : "outline"}
          className={`flex-1 ${view === "map" ? "bg-[#ED4337]" : ""}`}
          onClick={() => setView("map")}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Map
        </Button>
        <Button
          variant={view === "list" ? "default" : "outline"}
          className={`flex-1 ${view === "list" ? "bg-[#ED4337]" : ""}`}
          onClick={() => setView("list")}
        >
          <List className="mr-2 h-4 w-4" />
          List
        </Button>
      </div>
    </div>
  )
}
