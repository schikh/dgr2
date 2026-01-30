// Type definitions for the DGR application

export interface Company {
  name: string;
  imagePath: string;
}

export interface Good {
  name: string;
  imagePath: string;
}

export interface Exclusion {
  company: string;
  p1: string;
  p2: string;
  text: string;
}

export interface DataFile {
  companies: string[];
  goods: string[];
  exclusions: Exclusion[];
}
