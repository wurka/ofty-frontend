<template>
    <div class="SiteBody">
      <btn-bar :btns="[{text:'Настройки профиля'},
              {text:'Календарь'},
              {text:'Мои заказы'},
              {text:'Запросы от клиентов'},
              {text:'Мой декор'},
              {text:'Оплата'},
              {text:'Мои коллекции'}]">
      </btn-bar>
      <div id="layout">
        <!--
        <decor-header :showAdd="showAdd" ref="decorHeader"  @decor-search="onDecorSearch" @hide-add-decor="showAdd=false"></decor-header>
<decor-body :filter="decorSearchVal" @add-decor-click="showAdd=true; " @edit-decor="editDecor"></decor-body>
<chat-body></chat-body>
        <account-info></account-info>


        -->

        <chat-header></chat-header>
        <dialogs></dialogs>


      </div>
    </div>
</template>

<script>
    import BtnBar from "./BtnBar";
    import DecorHeader from "./DecorHeader";
    import DecorBody from "./DecorBody";
    import AccountInfo from "./AccountInfo";
    import ChatHeader from "./ChatHeader";
    import ChatBody from "./ChatBody";
    import Dialogs from "./Dialogs";
    export default {
        name: "SiteBody",
        components: {Dialogs, ChatBody, ChatHeader, AccountInfo, DecorBody, DecorHeader, BtnBar},
        data: function () {
            return {
              decorSearchVal:'',
              showAdd: false,
            }
        },
        methods:{
          onDecorSearch:function (val) {
            this.decorSearchVal=val;
          },
          editDecor: function(params){
            //this.editParams = params;
            //this.showAdd=true;
            console.log(params);
            this.$refs.decorHeader.decorAdd.show(params);
            console.log('siteBody');
          }
        }
    }
</script>

<style lang="sass" scoped>
  .SiteBody
    //background-color: lightblue
    .BtnBar
      vertical-align: top
  #layout
    //background-color: aquamarine
    display: inline-block
    padding-left: 15px
    width: 879px



</style>
