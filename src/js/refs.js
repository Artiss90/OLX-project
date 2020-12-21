export default function getRefs (){
  return {
    openPopupBtnLogout: document.querySelector('[data-popup-open]'),
    openPopupBtnLogoutTablet: document.querySelector('.sidenav__menu-acount-logout'),
    closePopupBtnLogout: document.querySelector('[data-popup-close]'),
    cancelPopupBtnLogout: document.querySelector('[data-popup-cancel]'),
    backdropPopupLogout: document.querySelector('[data-popup]'),
    backdrop: document.querySelector('[data-popup]'),
    myAdsCardRender: document.querySelector('.sidenav__dropdawn-content--text'), 
    myAds: document.querySelector('.cards'),
    showMyAds: document.querySelector("[data-dropdown-ad]"),
    showMyAdsTabMob: document.querySelector("[data-dropdown-ad-tm]"), 
    exitAccount: document.querySelector('[data-exit]'), 
    btnSubmitCreate: document.querySelector('.create-an-ad-modal__submit-btn'),
    mainRef: document.querySelector('.main-js'),
    //Edit-ad
    closeEditAdBtn: document.querySelector('[data-edit-close]'),
    backdropPopupEdit: document.querySelector('[data-edit-popup]'),
    backdropEditAd: document.querySelector('[data-edit-popup]'),
    closeBtnCancel: document.querySelector('[data-edit-ad-cancel]'),
    // Fatch Edit-ad
    editAdForm: document.querySelector('[data-form-edit]'), 
    
  }
}