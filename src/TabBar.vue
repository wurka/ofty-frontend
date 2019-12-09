<template>
    <div class="TabBar">
      <city-block :shown="showCities"></city-block>
      <div class="tab">
        <span class="tab_text" >новости</span>
      </div>
      <div class="tab">
        <span class="tab_text" >правила</span>
      </div>
      <div class="tab">
        <span class="tab_text" >коллекции</span>
      </div>
      <div class="tab">
        <span class="tab_text" >сообщения</span>
        <img :src="host+'/static/img/shared/message-24.png'" style="opacity:0.5;"/>
      </div>
      <div class="tab">
        <span class="tab_text" >мой кабинет</span>
        <img :src="host+'/static/img/shared/message-24.png'" style="opacity:0.2;"/>
      </div>
      <div class="tab">
        <span class="tab_text" >{{city}}</span>
        <img :src="host+'/static/img/shared/selection-20.png'" @click="showCities=1-showCities"/>
      </div>
    </div>
</template>

<script>
    import CityBlock from "./CityBlock";
    import {host} from "./main";

    export default {
      name: "TabBar",
      components: {CityBlock},
      data:function(){
        return{
          city: 'Москва',
          showCities: 0,
          host:host,
        }
      },
      methods:{
      }
    }
</script>

<style lang="sass" scoped>
  .TabBar
    //margin-bottom: 30px
    //width: inherit
    margin-left: 67px
    .tab
      display: inline
      margin-right: 24px
      //font-family: cursive
      font-size: 21px
      //margin: 10px
      //background-color: aliceblue
      &:last-child
        //margin-left: 74px
        margin: 0 48px 0 0
        font-size: 18px
        //background-color: orangered
        float: right
      img
        //height: 18px
        vertical-align: text-bottom

</style>
