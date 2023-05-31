import { DataServices } from "mykomap/src/map-app/app/model/data-services";
import { Initiative } from "mykomap/src/map-app/app/model/initiative";
import { PhraseBook } from "mykomap/src/map-app/localisations";

function getPhone(initiative: Initiative) {
  // Not all orgs have a phone number
  if (typeof initiative.tel === 'string') {
    const phone = initiative.tel.replace(/^(\d)(\d{4})\s*(\d{6})/, "$1$2 $3");
    return `<a class="fa fa-at" href="mailto:${phone}" target="_blank" ></a>`;
  }
  return "";
}

function getEmail(initiative: Initiative) {
  // Not all orgs have an email
  if (initiative.email)
    return `<a class="fa fa-at" href="mailto:${initiative.email}" target="_blank" ></a>`;
  return "";
}

function getFacebook(initiative: Initiative) {
  // not all have a facebook
  if (initiative.facebook)
    return `<a class="fab fa-facebook" href="https://facebook.com/${initiative.facebook}" target="_blank" ></a>`;
  return "";
}

function getTwitter(initiative: Initiative) {
  // not all have twitter
  if (initiative.twitter)
    return `<a class="fab fa-twitter" href="https://twitter.com/${initiative.twitter}" target="_blank" ></a>`;
  return '';
}

function getAddress(initiative: Initiative, getTerm: (prop: string) => string, labels: PhraseBook) {
  // We want to add the whole address into a single para
  // Not all orgs have an address
  let address: string = "";
  let street: string;
  if (typeof initiative.street == 'string') {
    let streetArray = initiative.street.split(";");
    for (let partial of streetArray) {
      if (partial === initiative.name) continue;
      if (street) street += "<br/>";
      street = street ? (street += partial) : partial;
    }
    address += street;
  }
  if (initiative.locality) {
    address += (address.length ? "<br/>" : "") + initiative.locality;
  }
  if (initiative.region) {
    address += (address.length ? "<br/>" : "") + initiative.region;
  }
  if (initiative.postcode) {
    address += (address.length ? "<br/>" : "") + initiative.postcode;
  }
  if (initiative.countryId) {
    const countryName = getTerm('countryId');
    address += (address.length ? "<br/>" : "") + (countryName || initiative.countryId);
  }
  if (initiative.nongeo == 1 || !initiative.lat || !initiative.lng) {
    address += (address.length ? "<br/>" : "") + `<i>${labels.noLocation}</i>`;
  }
  if (address.length) {
    address = '<p class="sea-initiative-address">' + address + "</p>";
  }
  return address;
}

function getWWW(initiative: Initiative) {
  // Initiative's website. Note, not all have a website.
  if (initiative.www)
    return `<a class="fa fa-link" href="${initiative.www}" target="_blank" ></a>`
  return '';
}

export function getPopup(initiative: Initiative, dataservices: DataServices) {
  function getTerm(propertyName: string) {
    const propDef = dataservices.getPropertySchema(propertyName);
    const propVal = initiative[propertyName];
    if (propDef.type === 'vocab' && typeof propVal === 'string') {
      const vocabUri = propDef.uri;
      return dataservices.getVocabTerm(vocabUri, propVal);
    }
    throw new Error(`can't get term for non-vocab property ${propertyName}`);
  }

  const labels = dataservices.getFunctionalLabels();
  
  let popupHTML = `
    <div class="sea-initiative-details">
      <h2 class="sea-initiative-name">${initiative.name}</h2>
      <p>${initiative.desc || ''}</p>
    </div>
    
    <div class="sea-initiative-contact">
      <h3>${labels.contact}</h3>
      ${getAddress(initiative, getTerm, labels)}
      ${getPhone(initiative)}
      <div class="sea-initiative-links">
        ${getWWW(initiative)}
        ${getEmail(initiative)}
        ${getFacebook(initiative)}
        ${getTwitter(initiative)}
      </div>
    </div>
  `;

  return popupHTML;
};

