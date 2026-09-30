import type { MetadataRoute } from "next";
import { site } from "@/data/restaurant";

const routes = ["", "/menu", "/experience", "/private-dining", "/about", "/reservations", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/menu" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/reservations" ? 0.9 : 0.7,
  }));
}
