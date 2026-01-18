/**
 * Points of Interest data for the interactive map
 */

export type LocationCategory =
  | "accommodation"
  | "skiing"
  | "town"
  | "dining"
  | "activity"
  | "attraction";

export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  category: LocationCategory;
  imageId: string;
  icon: string;
}

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: "chalet",
    name: "Alpine Court Chalet",
    description:
      "Your luxury ski-in home base with private squash court, hot tub, and stunning mountain views.",
    lat: 49.46029,
    lng: -115.07936,
    category: "accommodation",
    imageId: "exterior-front",
    icon: "House",
  },
  {
    id: "resort",
    name: "Fernie Alpine Resort",
    description:
      "2,500+ acres of legendary powder skiing with 142 runs and 10 lifts. Just steps from the chalet!",
    lat: 49.4602,
    lng: -115.09695,
    category: "skiing",
    imageId: "mountain-view-2",
    icon: "Mountain",
  },
  {
    id: "downtown",
    name: "Historic Downtown Fernie",
    description:
      "Charming 2nd Avenue with boutique shops, restaurants, cafes, and historic architecture. 10-minute drive.",
    lat: 49.501,
    lng: -115.0631,
    category: "town",
    imageId: "downtown-fernie",
    icon: "Building2",
  },
  {
    id: "brewery",
    name: "Fernie Brewing Company",
    description:
      "Award-winning craft brewery with tasting room. Try the famous 'What The Huck' huckleberry wheat ale!",
    lat: 49.52642,
    lng: -115.04743,
    category: "dining",
    imageId: "fernie-brewing",
    icon: "Beer",
  },
  {
    id: "griz-bar",
    name: "Griz Bar",
    description:
      "Legendary après-ski spot since 1962. World-famous nachos and live music on the Kokanee Deck.",
    lat: 49.46277,
    lng: -115.08668,
    category: "dining",
    imageId: "griz-bar",
    icon: "UtensilsCrossed",
  },
  {
    id: "golf",
    name: "Fernie Golf Club",
    description:
      "Stunning 18-hole championship course with mountain views. Par 70, suitable for all skill levels.",
    lat: 49.51709,
    lng: -115.04842,
    category: "activity",
    imageId: "fernie-golf",
    icon: "Flag",
  },
  {
    id: "museum",
    name: "Fernie Museum",
    description:
      "Discover the fascinating history of Fernie, from coal mining heritage to the legendary Griz.",
    lat: 49.50922,
    lng: -115.06167,
    category: "attraction",
    imageId: "fernie-museum",
    icon: "Landmark",
  },
  {
    id: "mount-fernie",
    name: "Mount Fernie Provincial Park",
    description:
      "Extensive trail network for mountain biking and hiking. Free access with stunning views of the Lizard Range.",
    lat: 49.4894,
    lng: -115.10482,
    category: "activity",
    imageId: "mount-fernie-park",
    icon: "Bike",
  },
  {
    id: "nordic-centre",
    name: "Fernie Nordic Centre",
    description:
      "Groomed cross-country ski trails in winter, walking paths in summer. Operated by Fernie Nordic Society.",
    lat: 49.48639,
    lng: -115.09002,
    category: "activity",
    imageId: "fernie-nordic",
    icon: "Snowflake",
  },
];

export const categoryConfig: Record<
  LocationCategory,
  {
    label: string;
    color: string;
    bgLight: string;
    textDark: string;
  }
> = {
  accommodation: {
    label: "Your Stay",
    color: "#10b981",
    bgLight: "#d1fae5",
    textDark: "#065f46",
  },
  skiing: {
    label: "Skiing",
    color: "#3b82f6",
    bgLight: "#dbeafe",
    textDark: "#1e40af",
  },
  town: {
    label: "Town",
    color: "#8b5cf6",
    bgLight: "#ede9fe",
    textDark: "#5b21b6",
  },
  dining: {
    label: "Food & Drink",
    color: "#f59e0b",
    bgLight: "#fef3c7",
    textDark: "#92400e",
  },
  activity: {
    label: "Activity",
    color: "#06b6d4",
    bgLight: "#cffafe",
    textDark: "#0e7490",
  },
  attraction: {
    label: "Attraction",
    color: "#ec4899",
    bgLight: "#fce7f3",
    textDark: "#9d174d",
  },
};
