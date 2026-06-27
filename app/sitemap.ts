import type { MetadataRoute } from "next";

const SITE_URL = "https://hana-energy.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "vi-VN": `${SITE_URL}/`,
          "en-US": `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/en`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "vi-VN": `${SITE_URL}/`,
          "en-US": `${SITE_URL}/en`,
        },
      },
    },
  ];
}
