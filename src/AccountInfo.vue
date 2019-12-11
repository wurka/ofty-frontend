<template>
    <div class="AccountInfo">
      <div class="waiter" v-if="waiting">
        <img class="spinner" :src="host+'/static/img/shared/spinner.gif'"/>
      </div>
      <div class="addAvatar  block">
        <div class="label1">Добавление аватара</div>
        <img :src="settings.avatar.big" class="big"/>
        <img :src="settings.avatar.small" class="small"/>
        <div class="warning">Размер файла слишком велик, используйте другой файл.</div>
        <div class="btn">Сохранить</div>
      </div>

      <div class="changePswd block">
        <div class="label1">Смена пароля</div>
        <div class="line">
          <div class="label">Новый пароль</div>
          <input type="password" class="text" v-model="passwords[0]"/>
        </div>
        <div class="line">
          <div class="label">Пароль еще раз</div>
          <input type="password" class="text" v-model="passwords[1]"/>
        </div>
        <div class="warning"><span v-if="passwords[0]!=passwords[1]">Пароли не совпадают</span></div>
        <div class="btn" @click="savePassword">Сменить пароль</div>
      </div>

      <div class="alterInfo block">
        <div class="label1">Доп. информация</div>
        <div v-for="i in infoKeys" class="line">
          <div class="label">{{i.label}}</div>
          <textarea v-if="i.label=='О компании'" v-model="alterInfo[i.key]"></textarea>
          <input v-else class="text" v-model="alterInfo[i.key]"/>
        </div>
        <div class="btn" @click="saveInfo">Сохранить</div>
      </div>

      <div class="rent block">
        <div class="label1">Условия аренды</div>
        <div class="line">
          <div class="label">Способ доставки</div>
          <div class="delivery">
            <div v-for="i in rentInfo.delivery" class="line">
              <div class="label">{{i.name}}</div>
              <input placeholder="Стоимость" class="text"  v-model="i.cost"/>
              <div src="" class="rBtn "><img class="minus" :src="host+'/static/img/shared/r_minus.png'"/></div>
            </div>
            <div src="" class="rBtn "><img class="plus" :src="host+'/static/img/shared/r_plus.png'"/></div>
          </div>
        </div>
        <div class="line">
          <div class="label">Адрес склада</div>
          <input class="text" v-model="rentInfo.address"/>
        </div>
        <div class="line">
          <div class="label">Ближайшее метро</div>
          <input class="text" v-model="rentInfo.metro"/>
        </div>
        <div class="line">
          <div class="label">Комментарий</div>
          <textarea  v-model="rentInfo.description"></textarea>
        </div>
        <div class="btn" @click="saveRent">Сохранить</div>
      </div>

      <div class="workTime block">
        <div class="label1">Время работы</div>
        <div v-for="i in days" class="line">
          <div class="label">{{i.name}}</div>
          <div class="midTime" >
            <div v-if="!workTime[i.key]['rest']">
              <span>с</span>
              <div class="time">
                <input class="text" v-model="workTime[i.key]['start-h']"/>
                <span>:</span>
                <input class="text" v-model="workTime[i.key]['start-m']"/>
              </div>
              <span>до</span>
              <div class="time">
                <input class="text" v-model="workTime[i.key]['fin-h']"/>
                <span>:</span>
                <input class="text" v-model="workTime[i.key]['fin-m']"/>
              </div>
            </div>
          </div>
          <input type="checkbox" class="cb" v-model="workTime[i.key]['rest']"/>
          <span>выходной</span>
        </div>
        <div class="btn" @click="saveTime">Сохранить</div>
      </div>

      <div class="notifications block">
        <div class="label1">Оповещения</div>
        <div v-for="i in noteKeys" class="line">
          <input type="checkbox" v-model="noteVals[i.key]"/>
          <div class="label">{{i.text}}</div>
        </div>
        <div class="btn" @click="saveNote">Сохранить</div>
      </div>
    </div>
</template>

<script>
    import {ax, host} from "./main";

    export default {
        name: "AccountInfo",
        data: function () {
            return {
              waiting: false,
              passwords:['',''],
              infoKeys: [{key:"name",label:'Название компании'},{key:"site",label:'Сайт'},{key:"city",label:'Город'},{key:"mail",label:'Почта'},{key:"phone",label:'Телефон'},{key:"phone2",label:'Доп. телефон'},{key:"description",label:'О компании'}],
              days:[{name:'понедельник', key:'mon'},{name:'вторник', key:'tue'},{name:'среда', key:'wed'},{name:'четверг', key:'thu'},{name:'пятница', key:'fri'},{name:'суббота', key:'sat'},{name:'воскресенье', key:'sun'},],
              noteKeys: [ {text:'Показывать мгновенные сообщения', key:'push'}, {text:'Включить звуковое оповещение', key:'sound'}, {text:'Присылать смс о моем заказе', key:'orderSms'}, {text:'Присылать смс об окончании и начале срока аренды', key:'timeSms'},{text:'Присылать сообщение о новом заказе на эл. почту', key:'orderMail'},{text:'Присылать сообщения об окончании и начале срока аренды на эл. почту', key:'timeMail'}],
              //infoLabels: {"name":'Название компании',"site":'Сайт',"city":'Город',"mail":'Почта',"phone":'Телефон',"phone2":'Доп. телефон',"description":'О компании'},
              //alterInfo: {'name':{label:'Название компании', value:''},'site':{label:'Сайт', value:''},'city':{label:'Город', value:''},'mail':{label:'Почта', value:''},'phone':{label:'Телефон', value:''},'phone2':{label:'Доп. телефон', value:''},'description':{label:'О компании', value:''}},
              alterInfo:{},
              workTime: {},
              noteVals:{},
              //deliveryArr:[{'label':'Самовывоз со склада', 'cost': ''},{'label':'Доставка внутри МКАД', 'cost': ''},{'label':'Доставка за МКАД', 'cost': ''}],
              rentInfo:{},
              host: host,
              settings: 0,
            }
        },
        methods:{
          loadSettings: function () {
            let vm = this;
            ax.get(host+'/account/get-settings')
              .then(function(data){
                  console.log(data.data );
                let ans = data.data;
                vm.settings = ans;
                /*for (let i in vm.infoKeys){
                  vm.alterInfo[vm.infoKeys[i]].value =ans.company.info[vm.infoKeys[i]];
                }*/
                vm.alterInfo = ans.company.info;
                vm.workTime = ans.company.workTime;
                vm.noteVals = ans.user.notification;
                vm.rentInfo = ans.company.rent;
                //vm.rentInfo.delivery =[];
                //vm.rentInfo.delivery = [{'name':'Самовывоз со склада', 'cost': ''},{'name':'Доставка внутри МКАД', 'cost': ''},{'name':'Доставка за МКАД', 'cost': ''}];
                vm.$forceUpdate();
              })
              .catch(function (data) {
                  console.log(data);
                  console.warn(data.response.data);
                }
              );
          },
          saveNote: function () {
            var vm = this;
            var fd = new FormData;

            vm.waiting = true;

            for ( let key in vm.noteVals ) {
              fd.set(key, vm.noteVals[key]);
            }
            console.log(fd);
            ax.get("/shared/get-csrf-token")
              .then(function(data1){
                  ax.post("/account/save-notification", fd,{headers:{'X-CSRFToken':data1.data}})
                    .then(function(data){
                        console.log(data.data);
                        vm.waiting = false;
                      }
                    )
                    .catch(function(data){
                        console.warn(data.response.data);
                      }
                    )
                }
              )
              .catch(function(data){
                  console.warn(data.response.data);
                }
              )
          },
          saveTime: function () {
            var vm = this;
            var fd = new FormData;

            vm.waiting = true;

            for ( let key in vm.workTime ) {
              fd.set(key, JSON.stringify(vm.workTime[key]));
            }
            console.log(fd);
            ax.get("/shared/get-csrf-token")
              .then(function(data1){
                  ax.post("/account/save-work-time", fd,{headers:{'X-CSRFToken':data1.data}})
                    .then(function(data){
                        console.log(data.data);
                        vm.waiting = false;
                      }
                    )
                    .catch(function(data){
                        vm.waiting = false;
                        console.warn(data.response.data);
                      }
                    )
                }
              )
              .catch(function(data){
                  vm.waiting = false;
                  if(data.response)
                    console.warn(data.response.data);
                  else
                    console.warn('no connection')

                }
              )
          },
          saveInfo: function () {
            var vm = this;
            var fd = new FormData;
            vm.waiting = true;

            for ( let key in vm.alterInfo ) {
              fd.set(key, vm.alterInfo[key]);
              console.log(vm.alterInfo['description']);
            }
            console.log(fd);
            ax.get("/shared/get-csrf-token")
              .then(function(data1){
                  ax.post("/account/save-info", fd,{headers:{'X-CSRFToken':data1.data}})
                    .then(function(data){
                        console.log(data.data);
                        vm.waiting = false;
                      }
                    )
                    .catch(function(data){
                        vm.waiting = false;
                        console.warn(data.response.data);
                      }
                    )
                }
              )
              .catch(function(data){
                  vm.waiting = false;
                  if(data.response)
                    console.warn(data.response.data);
                  else
                    console.warn('no connection')

                })
          },
          saveRent: function () {
            var vm = this;
            var fd = new FormData;
            vm.waiting = true;

            for ( let key in vm.rentInfo ) {
              if (key=='delivery') fd.set(key, JSON.stringify(vm.rentInfo[key]));
              else fd.set(key, vm.rentInfo[key]);
              /*console.log(key);
              console.log(vm.rentInfo[key]);*/
            }
            console.log(fd);
            ax.get("/shared/get-csrf-token")
              .then(function(data1){
                  ax.post("/account/save-rent", fd,{headers:{'X-CSRFToken':data1.data}})
                    .then(function(data){
                        console.log(data.data);
                        vm.waiting = false;
                      }
                    )
                    .catch(function(data){
                        console.warn(data.response.data);
                      }
                    )
                }
              )
              .catch(function(data){
                  console.warn(data.response.data);
                }
              )
          },
          savePassword: function () {
            var vm = this;
            var fd = new FormData;
            if (vm.passwords[0]!=vm.passwords[1]) return;
            fd.set('password',vm.passwords[0])
            ax.get("/shared/get-csrf-token")
              .then(function(data1){
                  ax.post("/account/password-set", fd,{headers:{'X-CSRFToken':data1.data}})
                    .then(function(data){
                        console.log(data.data);
                      }
                    )
                    .catch(function(data){
                        console.warn(data.response.data);
                      }
                    )
                }
              )
              .catch(function(data){
                  console.warn(data.response.data);
                }
              )
          },
        },


        created:function () {
          this.loadSettings();
        }
    }
</script>

<style lang="sass" scoped>
  $lgray: #f6f6f6
  $myblue: #182b93
  $myred: #CA1612
  $shadow: 0px 2px 5px rgba(0, 0, 0, 0.5)
  .AccountInfo
    background-color: $lgray
    box-shadow: $shadow
    margin-right: 20px
    margin-bottom: 20px
    padding-bottom: 35px
    .waiter
      position: fixed
      top: 0
      left: 0
      background-color: white
      opacity: 0.5
      height: 100vh
      width: 100vw
      .spinner
        text-align: center
        display: block
        //margin: auto
        margin-left: calc(50vw - 16px + 132px)
        margin-top: calc(50vh - 16px)
        vertical-align: middle
    .block
      margin-top: 30px
      display: inline-block
      width: 100%
      font-size: 15.5px
      font-family: Tahoma
      .btn
        text-align: center
        display: block
        padding: 8px 5px 8px 10px
        background-color: white
        box-shadow: $shadow
        width: 150px
        font-family: Philosopher
        margin-left: 300px
        margin-top: 35px
      .line
        margin-bottom: 15px
        .label
          display: inline-block
          width: 400px
          margin-right: 20px
          text-align: right
          vertical-align: top
        input
          width: 165px
          height: 20px
        textarea
          height: 80px
          width: 400px
          resize: none
      .label1
        font-size: 21px
        font-family: Philosopher
        margin-left: 50px
        margin-bottom: 20px
      .warning
        margin-bottom: -30px
        text-align: center
        padding: 8px
        height: 20px
        display: block
        color: $myred
    .addAvatar
      .big
        display: inline-block
        background-color: gray
        height: 170px
        width: 170px
        margin-left: 300px
      .small
        display: inline-block
        vertical-align: top
        background-color: gray
        height: 71px
        width: 71px
        margin-left: 15px
    .rent
      .line

        input
          width: 402px
        .delivery
          display: inline-block
          width: 410px

          .line
            display: inline-block
            margin-top: 10px
            margin-bottom: 0

            &:first-child
              margin-top: 0
          .label
            width: 180px
            text-align: left
            margin-right: 10px
          input
            width: 125px
            padding-left: 15px
            vertical-align: top
          .rBtn
            width: 27px
            height: 27px
            display: inline-block
            cursor: pointer
          .minus
            height: 27px
          .plus
            height: 27px
    .workTime
      .line
        span
          vertical-align: top
        .midTime
          display: inline-block
          width: 224px
        .time
          margin-right: 20px
          margin-left: 10px
          background-color: white
          border: gray 1px solid
          height: 24px
          display: inline-block
          padding-right: 5px
          //span
            margin-right: -15px
        input
          vertical-align: top
          width: 20px
          border: none
          outline: none
          //margin-right: 20px
          //margin-left: 10px
          text-align: right
        .cb
          margin-left: -5px
          margin-right: 15px
          width: 27px
    .notifications
      .line
        input
          width: 27px
          margin-left: 250px
        .label
          margin-left: 30px
          text-align: left






</style>
