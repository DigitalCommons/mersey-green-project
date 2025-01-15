// Re-export of ConfigData in mykomap/index above seems not to work,
// so import it directly from here:
import { ConfigData } from  "mykomap/app/model/config-schema";
import type {
  PropDef
} from "mykomap/app/model/data-services";
import * as versions from "./version.json";

import about from "./about.html";
import { getPopup } from './popup';

type Dictionary<T> = Partial<Record<string, T>>;
type FieldsDef = Dictionary<PropDef | 'value' >;
const fields: FieldsDef = {
  desc: 'value',
  www: 'value',
  street: 'value',
  locality: 'value',
  postcode: 'value',
  tel: 'value',
  email: 'value',
  twitter: 'value',
  facebook: 'value',
  primaryActivity: {
    type: 'vocab',
    uri: 'am:',
  },
  secondaryActivities: {
    type: 'multi',
    of: {
      type: 'vocab',
      uri: 'am:',
    },
  },
  orgStructure: {
    type: 'multi',
    of: {
      type: 'vocab',
      uri: 'os:',
    },
  },
};


export const config: ConfigData = new ConfigData({
  namedDatasets: ['mersey-green'],
  htmlTitle: 'Mersey Green',
  fields: fields,
  filterableFields: [
    'primaryActivity','secondaryActivities','orgStructure'
  ],
  searchedFields: [
    'name', 'street', 'locality', 'postcode', 'description'
  ],
  languages: ['EN'],
  language: 'EN',
  vocabularies: [
    {
      id: 'essglobal-vocab',
      type: 'hostSparql',
      label: 'essglobal',
      endpoint: 'http://dev.data.digitalcommons.coop:8890/sparql',
	    defaultGraphUri: 'https://dev.lod.coop/sea-lod/mersey-green',
      uris: {
        'https://dev.lod.coop/essglobal/V2a/standard/activities-modified/': 'am',
        'https://dev.lod.coop/essglobal/V2a/standard/organisational-structure/': 'os',
      },
    },
  ],
  dataSources: [
    {
      id: 'mersey-green',
      label: 'Mersey Green',
      type: 'hostSparql',
    },
  ],
  defaultLatLng: [ 53.3918, -2.9725 ],
  doesDirectoryHaveColours: true,
  maxZoomOnGroup:12,
  maxZoomOnOne: 14,
  maxZoomOnSearch: 12,
  showDatasetsPanel: false,
  customPopup: getPopup,
  aboutHtml: about,
  ...versions,
});
