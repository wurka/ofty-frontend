<template>
    <div :class="['DecorBody']">
      <div class="btn minimize" @click="detalized=!detalized">{{btnName}}</div>
      <div v-if="!cardArr" class="text">Это Ваш личный склад, Вы можете <span @click="$emit('add-decor-click')">добавлять</span> сюда предметы.</div>
      <div v-else v-for="card in cardArr" :key="card.id" :class="[(!detalized && card.type=='unit') ? 'inline' : '']">
        <div v-if="card.type=='header1'" class="group">{{card.text}}</div>
        <div v-if="card.type=='header2'" class="subgroup">{{card.text}}</div>
        <decor-card  v-if="card.type=='unit'" @edit-decor="editDecor" :params="card" :class="[detalized ? '' : 'min']"></decor-card>
      </div>

    </div>
</template>

<script>
    import DecorCard from "./DecorCard";
    import {host, ax} from './main'

    export default {
      name: "DecorBody",
      components: {DecorCard},
      props:['filter'],
      data: function () {
            return {
              cardArr:[],
              detalized: 1,
              host:host,
              unitsParams: {'offset': 0,'size': 3,'filter': '', 'last-group-id':-1},
              showEdit:false,
              editParams: {},
              loadReady: true,
          }
      },
      computed:{
        btnName: function () {
          if (this.detalized)return'Свернуть';
          else return'Развернуть';
        },
      },
      methods:{
        loadCards:function () {
          if (!this.loadReady){
            console.log('Too fast ajax');
            return;
          }
          this.loadReady = false;
          let vm = this;
          if(vm.cardArr.length>0)vm.unitsParams['last-group-id']=vm.cardArr[vm.cardArr.length-1].group;
          else vm.unitsParams['last-group-id']= 0;
          ax.get(host+'/units/get-my-units',{'params':vm.unitsParams})
            .then(function(data){
              //console.log(data.data );
              vm.cardArr = vm.cardArr.concat(data.data);
              vm.unitsParams.offset += vm.unitsParams.size;
              vm.$forceUpdate();
              vm.loadReady = true;
            }
            )
            .catch(function (data) {
                console.warn(data.response.data);
              }
            );
        },
        myScroll: function () {
          window.onscroll = () => {
            let bottomOfWindow = Math.abs(document.documentElement.offsetHeight - (document.documentElement.scrollTop + window.innerHeight)) < 1;
            if (bottomOfWindow) this.loadCards();
            //console.log(document.documentElement.scrollTop + window.innerHeight);
          };
        },
        editDecor: function (params) {
          //console.log(params);
          //this.showEdit=true;
          //this.editParams=params;
          this.$emit('edit-decor', params);
        }
      },
      mounted:function(){
        this.myScroll();
      },
      created: function () {
        //console.log('Arrr')
        this.loadCards();
      },
      watch:{
        filter:function () {
          this.unitsParams.filter=this.filter.toString();
          this.unitsParams.offset=0;
          this.cardArr=[];
          this.loadCards();
        }
      }
    }
</script>

<style lang="sass" scoped>
    $lgray: #f6f6f6
    $shadow: 0px 2px 5px rgba(0, 0, 0, 0.5)
    $myblue: #182b93
    .DecorBody
      //background-color: lightseagreen
      //padding-left: 20px
      //margin-top: 15px
      .text
        font-size: 24px
        line-height: 27px
        text-align: center
        width: 400px
        height: 54px
        display: inline-block
        margin-top: 100px
        margin-left: 135px
        span
          cursor: pointer
          color: $myblue
      .btn
        background-color: white
        padding: 10px 0 10px 0
        height: 17px
        width: 143px
        font-size: 15.5px
        text-align: center
        box-shadow: $shadow
      .minimize
        float: right
        margin-right: 48px
        display: inline-block
      .more
        margin: auto
        margin-bottom: 20px
      .group
        font-size: 32px
        padding: 15px 0 10px 0
      .subgroup
        font-size: 24px
        padding: 10px 0 10px 0
      .inline
        display: inline-block
      .unshown
        opacity: 0
</style>
