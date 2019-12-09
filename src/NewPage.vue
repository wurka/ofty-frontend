<template>
  <div class="Page">
    <site-header></site-header>
    <!--


    <main-site-body></main-site-body>

    <favor-site-body></favor-site-body>

    <unit-page></unit-page>

    <company-card></company-card>
    <company-unit-panel></company-unit-panel>

    <basket-site-body></basket-site-body>
    <site-body @scrollDisable=""></site-body>
    <search-site-body></search-site-body>


    <chat-site-body></chat-site-body>

    -->
    <settings-site-body></settings-site-body>

  </div>
</template>

<script>
    import SiteHeader from "./SiteHeader";
    import SiteBody from "./SiteBody";
    import MainSiteBody from "./MainSiteBody";
    import SearchSiteBody from "./SearchSiteBody";
    import UnitPage from "./UnitPage";
    import CompanyCard from "./CompanyCard";
    import CompanyUnitPanel from "./CompanyUnitPanel";
    import FavorSiteBody from "./FavorSiteBody";
    import ChatSiteBody from "./ChatSiteBody";
    import BasketSiteBody from "./BasketSiteBody";
    import SettingsSiteBody from "./SettingsSiteBody";
    export default {
        name: "NewPage",
        components: {
          SettingsSiteBody,
          BasketSiteBody,
          ChatSiteBody,
          FavorSiteBody,
          CompanyUnitPanel, CompanyCard, UnitPage, SearchSiteBody, MainSiteBody, SiteBody, SiteHeader},
        data:function () {
          return{
            scrollDisabled:false,
          }
        }
    }
</script>

<style lang="sass" scoped>
  .Page
    width: 1140px
    //margin-left: 130px
    margin: auto
    background-color: white
    min-height: 100vh

</style>

<style lang="sass">
  body
    background-color: lightgrey
    margin: 0px
    font-family: philosopher
  .hidden
    display: none
  .btn
    cursor: pointer
  .scrollDisable
    overflow-y: scroll
    //max-height: 100vh
    .Page
      height: 100vh
      overflow-y: hidden



</style>
