export interface FlagData {
  _links:     FlagDataLinks;
  items:      Item[];
  totalCount: number;
}

export interface FlagDataLinks {
  self: Self;
}

export interface Self {
  href: string;
  type: Type;
}

export enum Type {
  ApplicationJSON = "application/json",
  TextHTML = "text/html",
}

export interface Item {
  _links:                 ItemLinks;
  _maintainer:            Maintainer;
  _version:               number;
  archived:               boolean;
  clientSideAvailability: ClientSideAvailability;
  creationDate:           number;
  customProperties:       CustomProperties;
  defaults:               Defaults;
  deprecated:             boolean;
  description:            string;
  environments:           Environments;
  experiments:            Experiments;
  goalIds:                any[];
  includeInSnippet:       boolean;
  key:                    string;
  kind:                   string;
  maintainerId:           string;
  name:                   string;
  tags:                   any[];
  temporary:              boolean;
  variationJsonSchema:    null;
  variations:             VariationElement[];
}

export interface ItemLinks {
  parent: Self;
  self:   Self;
}

export interface Maintainer {
  _id:       string;
  _links:    FlagDataLinks;
  email:     string;
  firstName: string;
  lastName:  string;
  role:      string;
}

export interface ClientSideAvailability {
  usingEnvironmentId: boolean;
  usingMobileKey:     boolean;
}

export interface CustomProperties {
}

export interface Defaults {
  offVariation: number;
  onVariation:  number;
}

export interface Environments {
  development: Development;
  production:  Development;
  test:        Development;
}

export interface Development {
  _environmentName:       EnvironmentName;
  _site:                  Self;
  _summary:               Summary;
  archived:               boolean;
  lastModified:           number;
  on:                     boolean;
  salt:                   string;
  sel:                    string;
  trackEvents:            boolean;
  trackEventsFallthrough: boolean;
  version:                number;
}

export enum EnvironmentName {
  Development = "Development",
  Production = "Production",
  Test = "Test",
}

export interface Summary {
  prerequisites: number;
  variations:    { [key: string]: VariationValue };
}

export interface VariationValue {
  contextTargets: number;
  isFallthrough?: boolean;
  nullRules:      number;
  rules:          number;
  targets:        number;
  isOff?:         boolean;
}

export interface Experiments {
  baselineIdx: number;
  items:       any[];
}

export interface VariationElement {
  _id:   string;
  name:  string;
  value: boolean;
}
