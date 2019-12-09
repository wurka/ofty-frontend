<template>
  <div class="UserBar">
    <span v-if="username" class="username" @click="showOptions=1; myScroll();">{{username}}</span>
    <span v-else >
      <span class="username" @click="$refs.loginBlock.show(0);">Вход/</span>
      <span class="username" @click="$refs.loginBlock.show(1);">Регистрация</span>
    </span>
    <div v-if="showOptions" class="options">
      <div class="bg" @click="showOptions=0"></div>
      <div class="option" @click="logout(); showOptions=0">Выйти</div>
      <div class="option" @click="$refs.loginBlock.show(0); showOptions=0">Сменить пользователя</div>
    </div>
    <img v-if="username" :src="host+'/static/img/shared/basket-32.png'" />
    <img v-if="username" :src="host+'/static/img/shared/star-32.png'"/>
    <login-block ref="loginBlock" ></login-block>
  </div>
</template>

<script>
    import LoginBlock from "./LoginBlock";
    import {ax,host} from './main.js';
    export default {
      name: "UserBar",
      components: {LoginBlock},
      data: function () {
        return {
          username: '',
          showOptions: 0,
          host: host,
        }
      },
      methods: {
        logout: function () {
          ax.get("/shared/get-csrf-token")
          .then(function(data1){
            console.log(data1.data);
            var fd = new FormData;
            fd.append('csrfmiddlewaretoken', data1.data);
            ax.post("/account/logout", fd, {
              headers: {
                'X-CSRFToken': data1.data,
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(function (data) {
                window.location.reload();
                console.log(data.data);
              }
            )
            .catch(function (data) {
                console.warn(data.response.data);
              }
            )
          })
          .catch(function (data) {
              console.warn(data.response.data);
            }
          )
        },
        myScroll:function(){
          let vm = this;
          //console.log('!...!');
          window.onscroll = () => {
            //let bottomOfWindow = Math.abs(document.documentElement.offsetHeight - (document.documentElement.scrollTop + window.innerHeight)) < 1;
            //if (bottomOfWindow) this.loadCards();
            //console.log('!!');
            vm.showOptions=0;
          };
        },

      },

      created: function () {
        let vm = this;
        ax.get(host + '/account/about-me')
          .then(function (data) {
              console.log(data.data);
              if(data.data.username=='anonymous') vm.username = '';
              else vm.username = data.data.username;
              //vm.$forceUpdate();
            }
          )
          .catch(function (data) {
                console.warn(data.response.data);
            }
          );

      },
      mounted:function () {
        this.myScroll();
      }
    }
</script>

<style lang="sass" scoped>
  $shadow: 0px 2px 5px rgba(0, 0, 0, 0.5)
  $lgray: #f6f6f6
  $myblue: #182b93
  .UserBar
    //border: solid red 1px
    //margin: 20px
    //background-color: orangered
    display: inline
    float: right
    margin: 20px 48px 0 0
    .options
      position: fixed
      background-color: white
      box-shadow: $shadow
      font-size: 18px
      margin-left: -100px
      margin-top: 30px
      padding: 10px
      .bg
        height: 100vh
        width: 100vw
        position: fixed
        left: 0
        top: 0
        z-index: -1
      .option
        padding: 5px
        cursor: pointer
        &:hover
          color: $myblue
    img
      height: 32px
      float: right
    .username
      //margin-right: 20px
      //margin-left: 80px
      float: left
      margin-top: 5px
      font-size: 18px
      cursor: pointer
      &:hover
        color: $myblue
</style>
