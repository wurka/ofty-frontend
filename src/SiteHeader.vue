<template>
  <div class="SiteHeader">
    <img class="HeaderLogo" :src="host+'/static/img/shared/logo.png'"/>
    <div class="rightPanel">
      <tab-bar></tab-bar>
      <search-bar text="Поиск по сайту"></search-bar>
      <user-bar></user-bar>

    </div>

  </div>
</template>

<script>
    import CityBlock from "./CityBlock";
    import {host} from "./main.js"
    export default {
      name: "SiteHeader",
      components: {CityBlock},
      data: function () {
          return{
            host: host,
          }
        },
    }
</script>

<style lang="sass" scoped>
  $lgray: #f6f6f6
  .SiteHeader
    //background: $lgray
    //text-align: right
    //height: 100px
    padding-left: 18px
    padding-top: 19px
    height: 102px
    .HeaderLogo
      //background: white
      margin-top: 2px
      //float: left
    .rightPanel
      //margin-left: 67px
      display: inline-block
      vertical-align: top
      width: 928px
    .SearchBar
      margin-top: 20px
      margin-left: 308px
</style>
