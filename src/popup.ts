import { DataServices } from "mykomap/app/model/data-services";
import { Initiative } from "mykomap/app/model/initiative";
import { PopupApi } from "mykomap/popup-api";


export function getPopup(initiative: Initiative, dataServices: DataServices) {
  const api = new PopupApi(initiative, dataServices);

  let popupHTML = `
    <div class="sea-initiative-details">
      <h2 class="sea-initiative-name">${api.escapeHtml(initiative.name)}</h2>
      <p>${api.escapeHtml(initiative.desc)}</p>
    </div>
    
    <div class="sea-initiative-contact">
      <h3>${api.getLabel('contact')}</h3>
      ${api.address()}
      ${api.telLink('.tel')}
      <div class="sea-initiative-links">
        ${api.link('.www', {template: '<a class="fa fa-link" href="%u" target="_blank"></a>'})}
        ${api.mailLink('.email')}
        ${api.facebookLink('.facebook')}
        ${api.twitterLink('.twitter')}
      </div>
    </div>
  `;

  return popupHTML;
};
