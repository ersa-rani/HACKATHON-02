import { groq } from "next-sanity"

export const  allproducts = groq `*[_type == "product"]`;
export const firstfour = groq `*[_type == "product"][0..3]`;
export const lastfour = groq `*[_type == "product"][8..11]`;
export const medfour = groq `*[_type == "product"][4..7]`;
export const extra = groq `*[_type == "product"][9..16]`;